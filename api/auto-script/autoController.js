import poolConnection from "../../config/database.js";
import fetch from "node-fetch";

const sendMessage = async (id, contact, name, agent) => {
  try {
    function capitalize(at) {
      return at.charAt(0).toUpperCase() + at.slice(1);
    }

    const capName = capitalize(name);
    const capAgent = capitalize(agent);

    console.log(`Sending message to ${capName} ...`);

    // Fetch all messages from the table
    const messageQuery = `SELECT message FROM follow_up_messages`;
    const messages = await poolConnection.query(messageQuery);

    if (!messages || messages.length === 0) {
      throw new Error("No messages found in the database");
    }

    // Select a random message
    const randomIndex = Math.floor(Math.random() * messages.length);
    const messageRow = messages[randomIndex];

    if (!messageRow || !messageRow.message) {
      throw new Error("Selected message is undefined");
    }

    let message = messageRow.message;

    const greeting = [
        `Hi, *${capName},* \n\n`,
        `Assalam o alaiykum, Dear *${capName},* \n\n`,
        `Hello, *${capName},* \n\n`,
        `Salam, *${capName},* \n\n`,
    ];

    const randomIndexGreeting = Math.floor(Math.random() * 4);
    const randomGreeting = greeting[randomIndexGreeting];

    const footer = `\n\nRegards, \n_${capAgent}_\n_*MAH Kitchen & Caterers*_`;

    // Append greeting
    // message = `Assalam o alaiykum, Dear ${capName}, ` + message;
    message = randomGreeting + message + footer;

    // WhatsApp API endpoint
    const apiUrl = "https://app.wabot.my/api/send";

    // Data to be sent in the request body
    const payload = {
      number: contact,
      type: "text",
      message: message,
      instance_id: "662D19546A2F8",
      access_token: "662d18de74f14",
    };

    // Make POST request to WhatsApp API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();
    if (response.ok) {
      console.log("Message sent successfully:", responseData);

      const updateQuery = `UPDATE follow_up_cust SET sent_status = 'sent' WHERE id = ?`;
      await poolConnection.query(updateQuery, [id]);
    } else {
      console.error("Failed to send message:", responseData);
    }
  } catch (error) {
    console.error("Error sending message:", error.message);
  }
};

const fetchAndSendMessage = async () => {
  try {
    const query = `SELECT * FROM follow_up_cust WHERE sent_status = 'not-sent' ORDER BY id ASC LIMIT 1`;
    const rows = await poolConnection.query(query);

    if (rows.length > 0) {
      const { id, contact, name, agent } = rows[0];
      await sendMessage(id, contact, name, agent);
      console.log("Message sent successfully");
    } else {
      console.log("No contacts found");
    }

    // res.status(200).json({success: true, message: rows });
  } catch (error) {
    console.error(`Failed to load data: ${error.message}`);
    // res.status(500).json({ success: false, error: error.message });
  }
};

const autoScript = async (req, res) => {
  try {
    console.log("Initial call to fetchAndSendMessage...");
    await fetchAndSendMessage();
    // res.status(200).json({
    //   success: true,
    //   message: "Scheduled task to run every 20 minutes.",
    // });
  } catch (error) {
    console.error(`Failed to schedule task: ${error.message}`);
    // res.status(500).json({ success: false, error: error.message });
  }
};

// const interval = 20 * 60 * 1000; // 20 minutes in milliseconds
// setInterval(() => {
//   console.log("Running scheduled task...");
//   fetchAndSendMessage();
// }, interval);

export default {
  autoScript,
};

