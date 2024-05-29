import fetch from "node-fetch";

const sendWhatsAppMediaMessage = async (fileUrl, message, number, filename) => {
  const apiUrl = "https://app.wabot.my/api/send";
  const payload = {
    number: number,
    type: "media",
    message: message,
    media_url: fileUrl,
    filename: filename,
    instance_id: "662D19546A2F8",
    access_token: "662d18de74f14",
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
  // const files = [
  //   // "https://i.imghippo.com/files/F0qEP1716474159.pdf",
  //   // "https://i.imghippo.com/files/H8RHv1716474206.pdf",
  //   // "https://i.imghippo.com/files/Csopc1716473961.jpg",

  //   {
  //     url: "https://i.imghippo.com/files/F0qEP1716474159.pdf",
  //     filename: "MAH_Kitchen_Business_Profile.pdf",
  //   },
  //   // {
  //   //   url: "https://i.imghippo.com/files/H8RHv1716474206.pdf",
  //   //   filename: "MAH_Deals_Card.pdf",
  //   // },
  //   {
  //     url: "https://i.imghippo.com/files/3ja9o1716812990.jpg",
  //     filename: "Deal_1.jpg",
  //   },
  //   {
  //     url: "https://i.imghippo.com/files/9tlKy1716813009.jpg",
  //     filename: "Deal_2.jpg",
  //   },
  //   {
  //     url: "https://i.imghippo.com/files/Amu3p1716813028.jpg",
  //     filename: "Deal_3.jpg",
  //   },
  //   {
  //     url: "https://i.imghippo.com/files/BTvmn1716813047.jpg",
  //     filename: "Deal_4.jpg",
  //   },
  //   {
  //     url: "https://i.imghippo.com/files/CNfHx1716813068.jpg",
  //     filename: "Deal_5.jpg",
  //   },
  //   {
  //     url: "https://i.imghippo.com/files/x4QVn1716813082.jpg",
  //     filename: "Deal_6.jpg",
  //   },
  //   {
  //     url: "https://i.imghippo.com/files/IQwNY1716813099.jpg",
  //     filename: "Deal_7.jpg",
  //   },
  //   {
  //     url: "https://i.imghippo.com/files/RMDkp1716813114.jpg",
  //     filename: "Deal_8.jpg",
  //   },
  //   {
  //     url: "https://i.imghippo.com/files/1v1GZ1716813135.jpg",
  //     filename: "Deal_9.jpg",
  //   },
  //   {
  //     url: "https://i.imghippo.com/files/Csopc1716473961.jpg",
  //     filename: "Make_Your_Own_MENU.jpg",
  //   },
  // ];

  const files = [
    // "https://i.imghippo.com/files/F0qEP1716474159.pdf",
    // "https://i.imghippo.com/files/H8RHv1716474206.pdf",
    // "https://i.imghippo.com/files/Csopc1716473961.jpg",

    {
      url: "https://www.dropbox.com/scl/fi/yzxzkbuokgddr6nt9v32w/MAH-Kitchen-Business-Profile.pdf?rlkey=ve5q1ju1yx9rkv40y54fzn4z8&st=z3btrvkg&dl=1",
      filename: "MAH_Kitchen_Business_Profile.pdf",
    },
    // {
    //   url: "https://i.imghippo.com/files/H8RHv1716474206.pdf",
    //   filename: "MAH_Deals_Card.pdf",
    // },
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
  ];

  //   const number = "923331233774";
  //   const name = "ashar";
  //   const agent = "anunzio";

  try {
    const results = [];
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
