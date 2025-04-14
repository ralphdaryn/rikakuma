const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
const axios = require("axios"); // Add this if not already at the top

exports.handler = async (event) => {
  const sig = event.headers["stripe-signature"];
  let webhookEvent;

  try {
    webhookEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (webhookEvent.type === "checkout.session.completed") {
    const session = webhookEvent.data.object;
    const customerEmail = session.customer_details.email;
    const customerName = session.customer_details.name;

    try {
      // ✅ Step 1: Create Shipment
      const shipmentRes = await axios.post(
        "https://api.easypost.com/v2/shipments",
        {
          shipment: {
            to_address: {
              name: customerName,
              street1: "525 S Winchester Blvd",
              city: "San Jose",
              state: "CA",
              zip: "95128",
              country: "US",
              email: customerEmail,
            },
            from_address: {
              name: "Rikakuma",
              street1: "417 Montgomery Street",
              city: "San Francisco",
              state: "CA",
              zip: "94104",
              country: "US",
              email: "rikakuma.ca@gmail.com",
            },
            parcel: {
              length: 10,
              width: 8,
              height: 4,
              weight: 16,
            },
          },
        },
        {
          auth: {
            username: process.env.EASYPOST_API_KEY,
          },
        }
      );

      const shipment = shipmentRes.data;

      // ✅ Step 2: Buy shipping label using first available rate
      const buyRes = await axios.post(
        `https://api.easypost.com/v2/shipments/${shipment.id}/buy`,
        {
          rate: { id: shipment.rates[0].id },
        },
        {
          auth: {
            username: process.env.EASYPOST_API_KEY,
          },
        }
      );

      const labelUrl = buyRes.data.postage_label.label_url;

      // ✅ Step 3: Send confirmation email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Rikakuma Shop" <${process.env.EMAIL_USER}>`,
        to: customerEmail,
        subject: "🎉 Order Confirmation - Rikakuma",
        html: `
          <p>Hi ${customerName || "there"},</p>
          <p>Thanks for your order! Your shipment is being prepared.</p>
          <p><strong>Shipping Label:</strong> <a href="${labelUrl}" target="_blank">View your label</a></p>
          <p>Let us know if you have any questions.</p>
          <p>- Rikakuma Team</p>
        `,
      });

      console.log("✅ Shipment + email sent to", customerEmail);
    } catch (err) {
      console.error("❌ Shipment or email error:", err.message);
    }
  }

  return { statusCode: 200, body: "Webhook received" };
};