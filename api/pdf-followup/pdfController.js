import fetch from "node-fetch";
import poolConnection from "../../config/database.js";
import dotenv from 'dotenv';
dotenv.config();

const sendWhatsAppMediaMessage = async (fileUrl, message, number, filename) => {
  const apiUrl = process.env.WA_API_URL;
  const payload = {
    number: number,
    type: "media",
    message: message,
    media_url: fileUrl,
    filename: filename,
    instance_id: process.env.INSTANCE_ID,
    access_token: process.env.TOKEN,
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

    const message = `Assalam o alaiykum ${capName}

_${capAgenet}_ here from *MAH Kitchen & Caterers.*

We provide lunch & dinner at a very low starting price of Rs 4600 per month.

Are you interested in our monthly subscription?
    
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
    const apiUrl = process.env.WA_API_URL;

    // Data to be sent in the request body
    const payload = {
      number: number,
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

const assignAgent = async (name, number) => {
  try {
    const query = `SELECT id, assigned_agent FROM follow_up_cust ORDER BY id DESC LIMIT 1`;
    const res = await poolConnection.query(query);

    if (res.length > 0) {
      const { assigned_agent } = res[0];

      let agnetNumber;

      if (assigned_agent == "ifrah" || assigned_agent == "Ifrah") {
        agnetNumber = "923130006121";
      } else if (assigned_agent == "anum" || assigned_agent == "Anum") {
        agnetNumber = "923482058184";
      } else {
        agnetNumber = "923130006121";
      }

      const message = `Hi, ${assigned_agent}\n\nKindly follow up this customer:\n\nName: ${name}\nNumber: ${number}`;

      // WhatsApp API endpoint
      const apiUrl = process.env.WA_API_URL;

      // Data to be sent in the request body
      const payload = {
        number: agnetNumber,
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
        body: JSON.stringify(payload),
      });

      console.log("Message sent successfully to " + assigned_agent);
      const data = await response.json();
      // console.log(`Success: Sent ${fileUrl}`);
      return data;
    }
  } catch (error) {
    // Error occurred
    console.error("Error:", error.message);
    throw error;
  }
};

const sendAllFiles = async (req, res) => {
  // const { name, number, agent } = req.params;

  const files = [
    {
      url: "https://www.dropbox.com/scl/fi/yzxzkbuokgddr6nt9v32w/MAH-Kitchen-Business-Profile.pdf?rlkey=ve5q1ju1yx9rkv40y54fzn4z8&st=z3btrvkg&dl=1",
      filename: "MAH_Kitchen_Business_Profile.pdf",
    },
    {
      url: "https://www.dropbox.com/scl/fi/mbwwd6l0ms8a6qb67yc80/Deal-1.jpeg?rlkey=tcbeup25ecj24tjbafagu5c93&st=h5sqbpa9&dl=1",
      filename: "Deal_1.jpg",
    },
    {
      url: "https://www.dropbox.com/scl/fi/pnvajy6kvvq3gnjtk6fj7/Deal-2.jpeg?rlkey=6nfiaoe3b2jnl1cgboeidqxdq&st=y16k6x4o&dl=1",
      filename: "Deal_2.jpg",
    },
    {
      url: "https://www.dropbox.com/scl/fi/z6cqfufz26yoijzyq9poi/Deal-3.jpeg?rlkey=gevggldzhkip9ogignaq2l4o3&st=3wooutr6&dl=1",
      filename: "Deal_3.jpg",
    },
    {
      url: "https://www.dropbox.com/scl/fi/tj3y0kcpmroj451juv4hu/Deal-4.jpeg?rlkey=0s9zhb74ftnjw9suqwo884i2y&st=pnwxmfsw&dl=1",
      filename: "Deal_4.jpg",
    },
    {
      url: "https://www.dropbox.com/scl/fi/16sp9pqf4oqmpg7oihnah/Deal-5.jpeg?rlkey=hgsge8759xjtkafuo3nxp17bu&st=lbdgbuvd&dl=1",
      filename: "Deal_5.jpg",
    },
    {
      url: "https://www.dropbox.com/scl/fi/srfu4quj4v68sf4t0ypy9/Deal-6.jpeg?rlkey=dx7smr7dlxnp9i6yhz33emmsn&st=4zkhzu38&dl=1",
      filename: "Deal_6.jpg",
    },
    {
      url: "https://www.dropbox.com/scl/fi/gyyahhx6idjk48kvg8ukc/Deal-7.jpeg?rlkey=unmkw1747qmtd3euvfciui4bq&st=etfxv4f4&dl=1",
      filename: "Deal_7.jpg",
    },
    {
      url: "https://www.dropbox.com/scl/fi/s7wvi57zqw7rkyqfk3r4r/Deal-8.jpeg?rlkey=d32bwvw37mszezl298ynjcxq0&st=lrfn14k2&dl=1",
      filename: "Deal_8.jpg",
    },
    {
      url: "https://www.dropbox.com/scl/fi/rrhrpb16zbnitm4cijdf8/Deal-9.jpeg?rlkey=9v9ic2mkq30jefm9ggfzzx3j5&st=or26k52u&dl=1",
      filename: "Deal_9.jpg",
    },
    {
      url: "https://www.dropbox.com/scl/fi/wnqpgh7tsw99m4kia3vje/custom.jpeg?rlkey=ffqqbh7sn52npok4v67saz2kb&st=i03wzpux&dl=1",
      filename: "Make_Your_Own_MENU.jpg",
    },
    {
      url: "https://www.dropbox.com/scl/fi/t5ui9mhgtfvsh2olthgjy/14-days.jpg?rlkey=36dko8hyjwuuq6r60wxs6g6w7&st=zjfj76nr&dl=1",
      filename: "14_days.jpg",
    },
  ];

    // const number = "923331233774";
    // const name = "ashar";
    // const agent = "anunzio";

  try {
    await assignAgent(name, number);
    const results = [];
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let index = 0; index < files.length; index++) {
      const { url, filename } = files[index];
      let caption;

      if (filename === "MAH_Kitchen_Business_Profile.pdf") {
        caption = "*MAH Kitchen Business Profile*";
      } else if (filename === "Deal_1.jpg") {
        caption = "*Deal 1*";
      } else if (filename === "Deal_2.jpg") {
        caption = "*Deal 2*";
      } else if (filename === "Deal_3.jpg") {
        caption = "*Deal 3*";
      } else if (filename === "Deal_4.jpg") {
        caption = "*Deal 4*";
      } else if (filename === "Deal_5.jpg") {
        caption = "*Deal 5*";
      } else if (filename === "Deal_6.jpg") {
        caption = "*Deal 6*";
      } else if (filename === "Deal_7.jpg") {
        caption = "*Deal 7*";
      } else if (filename === "Deal_8.jpg") {
        caption = "*Deal 8*";
      } else if (filename === "Deal_9.jpg") {
        caption = "*Deal 9*";
      } else if (filename === "Make_Your_Own_MENU.jpg") {
        caption = "*Make Your Own MENU*";
      } else if (filename === "14_days.jpg") {
        caption = "*14-Day Menu*";
      }
      await sendWhatsAppMediaMessage(
        url,
        caption,
        number,
        filename // Pass the filename to the function
      );
      //   results.push(result);
      await delay(5000);
    }

    await delay(5000);
    await sendMessage(number, name, agent);
    console.log("All files sent:");
    res.status(200).json({ success: true, message: "All files sent!" });
  } catch (error) {
    console.error(`Failed to send files: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

export default { sendAllFiles };
