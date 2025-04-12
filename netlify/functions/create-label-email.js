const axios = require("axios");
const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const { customerEmail, customerName } = JSON.parse(event.body);

    // 1. Create Shipment using EasyPost test-compatible addresses
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
            street2: "5th Floor",
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

    // 2. Check if rates are returned
    if (!shipment.rates || shipment.rates.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No shipping rates found." }),
      };
    }

    // 3. Buy label using the first rate
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

    // 4. Send confirmation email with the label link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Rikakuma" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: "Your Order Confirmation 🎉",
      html: `
        <p>Hey ${customerName},</p>
        <p>Thanks for your order! Your shipment is being prepared.</p>
        <p><strong>Shipping Label:</strong> <a href="${labelUrl}" target="_blank">View your label</a></p>
        <p>Let us know if you have any questions.</p>
        <p>- Rikakuma Team</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ labelUrl }),
    };
  } catch (err) {
    console.error("Error in handler:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};