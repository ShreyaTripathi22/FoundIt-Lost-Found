import { sendClaimEmailService } from "../services/email.service.js";

export const sendClaimEmail = async (req, res) => {
  try {
    const { finderEmail, itemName, claimerName, claimerEmail } = req.body;

    if (!finderEmail || !itemName || !claimerName || !claimerEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await sendClaimEmailService({
      finderEmail,
      itemName,
      claimerName,
      claimerEmail,
    });

    res.status(200).json({ message: "Claim email sent successfully" });
  } catch (error) {
    console.error("Claim email error:", error);
    res.status(500).json({ message: "Failed to send claim email" });
  }
};
