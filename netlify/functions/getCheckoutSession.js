const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sessionId = event.queryStringParameters.session_id;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer_details"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify(session),
    };
  } catch (error) {
    console.error("Error fetching session:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve session" }),
    };
  }
};