import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const sendMatchEmail = async (to, item, confidence) => {
  const mailOptions = {
    from: `"FoundIt App" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Possible Match Found!",
    text: `
Hi,

Good news! We found an item that closely matches what you reported.

Item Name: ${item.name}
Location: ${item.location}
Date: ${item.date}

Match Confidence: ${Math.round(confidence * 100)}%

Please log in to the app to verify and claim it.

Regards,
FoundIt Team
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendClaimEmailService = async ({
  finderEmail,
  itemName,
  claimerName,
  claimerEmail,
}) => {
  const emailContent = `
Hi,

Someone has requested to claim your found item: "${itemName}"

Claimer Details:
Name: ${claimerName}
Email: ${claimerEmail}

Please contact them to proceed.

— FoundIt Team
`;

  await transporter.sendMail({
    from: `"FoundIt" <${process.env.EMAIL_USER}>`,
    to: finderEmail,
    subject: `Claim request for ${itemName}`,
    text: emailContent,
  });
};