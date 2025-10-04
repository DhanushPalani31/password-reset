import crypto from "crypto";
import User from "../models/User.js";
import sendEmail from "../config/sendEmail.js";

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // create token
    const token = crypto.randomBytes(20).toString("hex");
    user.resetToken = token;
    user.resetTokenExp = Date.now() + 15 * 60 * 1000; // 15 min expiry
    await user.save();

    // send email
    const resetLink = `${process.env.CLIENT_URL}/reset/${token}`;
    await sendEmail(
      email,
      "Password Reset Request",
      `
        <h2>Password Reset</h2>
        <p>You requested a password reset. Click below to reset your password:</p>
        <a href="${resetLink}" 
           style="display:inline-block;padding:10px 20px;background:#4f46e5;color:#fff;border-radius:5px;text-decoration:none;">
          Reset Password
        </a>
        <p>This link expires in 15 minutes.</p>
      `
    );

    return res.json({ message: "Password reset email sent ✅. Check your inbox!" });
  } catch (err) {
    console.error("Forgot Password Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExp: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ error: "Invalid or expired token" });

    // update password
    user.password = password; // plain password (hashed by pre save hook)
    user.resetToken = undefined;
    user.resetTokenExp = undefined;
    await user.save();

    res.json({ message: "Password updated successfully ✅" });
  } catch (err) {
    console.error("Reset Password Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
