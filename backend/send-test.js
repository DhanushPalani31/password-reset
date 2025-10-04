import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // must match authenticated Gmail
      to: "dhanushcse47@gmail.com",
      subject: "✅ Gmail Test Email",
      text: "If you see this, Gmail works!",
    });

    console.log("📨 Message sent:", info.messageId);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
};

main();
