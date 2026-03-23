import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert("Sai email hoặc mật khẩu");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300">
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96">
        <p className="text-purple-700 text-3xl font-bold text-center mb-6">
          Welcome Back
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition">
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-purple-600 font-semibold">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
