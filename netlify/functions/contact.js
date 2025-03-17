const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {

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
      from: `"Rikakuma" <${process.env.EMAIL_USER}>`,
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

    const info = await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Message sent successfully!",
        emailResponse: info,
      }),
    };
  } catch (error) {
    console.error("Error sending email:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to send message.",
        error: error.message,
      }),
    };
  }
};