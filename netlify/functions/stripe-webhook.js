const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  const sig = event.headers["stripe-signature"];
  let webhookEvent;

  try {
    webhookEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // You’ll get this from Stripe (see notes below)
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (webhookEvent.type === "checkout.session.completed") {
    const session = webhookEvent.data.object;

    const customerEmail = session.customer_details.email;
    const customerName = session.customer_details.name;

    // ✅ Send confirmation email
    try {
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
        text: `Hi ${customerName || "there"},\n\nThank you for your order! We'll be shipping it to you shortly.`,
      });

      console.log("✅ Confirmation email sent to", customerEmail);
    } catch (emailErr) {
      console.error("❌ Error sending confirmation email:", emailErr.message);
    }

    // 📦 You’ll integrate EasyPost here later
  }

  return { statusCode: 200, body: "Webhook received" };
};
