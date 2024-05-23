import fetch from "node-fetch";

const sendWhatsAppMediaMessage = async (fileUrl, message, number, filename) => {
  const apiUrl = "https://app.wabot.my/api/send";
  const payload = {
    number: number,
    type: "media",
    message: message,
    media_url: fileUrl,
    filename: filename,
    instance_id: "662D19546A2F8", // Replace with your instance ID
    access_token: "662d18de74f14", // Replace with your access token
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Success: Sent ${fileUrl}`);
    return data;
  } catch (error) {
    console.error(`Error: Failed to send ${fileUrl} - ${error.message}`);
    throw error;
  }
};

const sendMessage = async (number, name, agent) => {
  try {
    function capitalize(at) {
      return at.charAt(0).toUpperCase() + at.slice(1);
    }

    const capName = capitalize(name);
    const capAgenet = capitalize(agent);

    const message = `Assalam o alaiykum ${capName},

${capAgenet} here from *MAH Kitchen & Caterers.*
    
*Our office is located on:*
_Office suite 1, 4th floor, 15-C, Lane 2, Rahat commercial Area phase 6 DHA, Karachi, Pakistan._
    
*Map:*
https://maps.app.goo.gl/NcAiwprtQ85YZxSV8
    
Please find attached:
    - *Business profile* _that provides overview of our views, beliefs, mission, aim & background._
    - *Monthly Food Menu* _(Cost-effective)_
    
I will follow-up with you shortly afterwards. Thank you & it was nice talking to you.`;

    // Check if message and number are provided
    // if (!message || !number) {
    //   res.status(400).json({ error: "Message and number are required" });
    // }

    // WhatsApp API endpoint
    const apiUrl = "https://app.wabot.my/api/send";

    // Data to be sent in the request body
    const payload = {
      number: number,
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

    console.log("Message sent successfully");
    const data = await response.json();
    // console.log(`Success: Sent ${fileUrl}`);
    return data;
  } catch (error) {
    // Error occurred
    console.error("Error:", error.message);
    throw error;
  }
};

const sendAllFiles = async (req, res) => {
    const { name, number, agent } = req.params;
  const files = [
    // "https://i.imghippo.com/files/F0qEP1716474159.pdf",
    // "https://i.imghippo.com/files/H8RHv1716474206.pdf",
    // "https://i.imghippo.com/files/Csopc1716473961.jpg",

    {
      url: "https://i.imghippo.com/files/F0qEP1716474159.pdf",
      filename: "MAH_Kitchen_Business_Profile.pdf",
    },
    {
      url: "https://i.imghippo.com/files/H8RHv1716474206.pdf",
      filename: "MAH_Deals_Card.pdf",
    },
    {
      url: "https://i.imghippo.com/files/Csopc1716473961.jpg",
      filename: "Make_Your_Own_MENU.jpg",
    },
  ];

//   const number = "923331233774";
//   const name = "ashar";
//   const agent = "anunzio";

  try {
    const results = [];
    for (let index = 0; index < files.length; index++) {
      const { url, filename } = files[index];
      let caption;

      if (url === "https://i.imghippo.com/files/F0qEP1716474159.pdf") {
        caption = "*MAH Kitchen Business Profile*";
      } else if (url === "https://i.imghippo.com/files/H8RHv1716474206.pdf") {
        caption = "*MAH Deals Card*";
      } else if (url === "https://i.imghippo.com/files/Csopc1716473961.jpg") {
        caption = "*Make Your Own MENU*";
      }
      await sendWhatsAppMediaMessage(
        url,
        caption,
        number,
        filename // Pass the filename to the function
      );
      //   results.push(result);
    }

    await sendMessage(number, name, agent);
    console.log("All files sent:");
    res.status(200).json({ success: true, message: "All files sent!" });
  } catch (error) {
    console.error(`Failed to send files: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

export default { sendAllFiles };
