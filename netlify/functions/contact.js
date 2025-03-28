const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "https://www.rikakuma.ca",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: "",
      };
    }

    const { name, email, phoneNumber, subject, message } = JSON.parse(
      event.body
    );

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error(
        "Missing EMAIL_USER or EMAIL_PASS in environment variables"
      );
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Step By Step Club" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || "rikakuma.ca@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://www.rikakuma.ca",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({ message: "Message sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending email:", error.message);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "https://www.rikakuma.ca",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({
        message: "Failed to send message.",
        error: error.message,
      }),
    };
  }
};