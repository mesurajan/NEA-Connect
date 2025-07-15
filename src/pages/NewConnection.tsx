import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 shadow-md border rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Login to NEA Connect</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <Input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
