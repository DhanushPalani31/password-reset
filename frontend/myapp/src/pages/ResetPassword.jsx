import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/auth/reset-password/${token}`, { password });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full px-3 py-2 rounded mb-3"
          required
        />
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Reset Password
        </button>
        {msg && <p className="mt-3 text-sm text-center">{msg}</p>}
      </form>
    </div>
  );
}
