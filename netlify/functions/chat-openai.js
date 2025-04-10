const axios = require("axios");

exports.handler = async function (event) {
  const body = JSON.parse(event.body);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini-2024-07-18",
        messages: body.messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    const errorMessage = error?.response?.data?.error?.message || error.message;
    return {
      statusCode: 500,
      body: JSON.stringify({ error: { message: errorMessage } }),
    };
  }
};
