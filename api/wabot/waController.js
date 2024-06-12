import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const sendMessage = async (req, res) => {
  try {
    // Retrieve parameters from the query string
    const { message, number } = req.params;

    // Check if message and number are provided
    if (!message || !number) {
      res.status(400).json({ error: "Message and number are required" });
    }

    // WhatsApp API endpoint
    const apiUrl = process.env.WA_API_URL;

    // Data to be sent in the request body
    const data = {
      number: number,
      type: "text",
      message: message,
      instance_id: process.env.INSTANCE_ID,
      access_token: process.env.TOKEN,
    };

    // Make POST request to WhatsApp API
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.ok) {
      console.log("Message sent successfully:", responseData);
      res
        .status(200)
        .json({ success: true, message: "Message sent successfully" });
    } else {
      console.error("Failed to send message:", responseData);
    }
  } catch (error) {
    // Error occurred
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const sendGroupMessage = async (req, res) => {
  try {
    // Retrieve parameters from the query string
    const { message, id } = req.params;

    // Check if message and number are provided
    if (!message || !id) {
      res.status(400).json({ error: "Message and id are required" });
    }

    // WhatsApp API endpoint
    const apiUrl = process.env.GRP_WA_API_URL;

    // Data to be sent in the request body
    const data = {
      group_id: id,
      type: "text",
      message: message,
      instance_id: process.env.INSTANCE_ID,
      access_token: process.env.TOKEN,
    };

    // Make POST request to WhatsApp API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.ok) {
      console.log("Message sent successfully:", responseData);
      res
        .status(200)
        .json({ success: true, message: "Message sent successfully" });
    } else {
      console.error("Failed to send message:", responseData);
    }
    // Message sent successfully
  } catch (error) {
    // Error occurred
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export default {
  sendMessage,
  sendGroupMessage,
};
