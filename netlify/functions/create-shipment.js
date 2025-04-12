const axios = require("axios");

exports.handler = async (event) => {
  try {
    const response = await axios.post(
      "https://api.easypost.com/v2/shipments",
      {
        shipment: {
          to_address: {
            name: "Customer Name",
            street1: "123 Test St",
            city: "Toronto",
            state: "ON",
            zip: "M1N1N1",
            country: "CA",
            email: "test@example.com",
          },
          from_address: {
            name: "Your Name",
            street1: "456 Sender St",
            city: "Pickering",
            state: "ON",
            zip: "L1V7H9",
            country: "CA",
            email: "your@email.com",
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

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};