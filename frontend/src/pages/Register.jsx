import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      alert("Đăng ký thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300">
      
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96">
        
        <p className="text-3xl font-bold text-center text-purple-700 mb-6">
          Create Account
        </p>

        <form onSubmit={handleSubmit}>
          
          <input
            placeholder="Name"
            className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-purple-400"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-purple-400"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border rounded-lg focus:ring-2 focus:ring-purple-400"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition">
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-purple-600 font-semibold">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}