'use client';

import React, { useState, useContext } from "react";
import AuthContext from "@/app/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

interface FormDataState {
  first_name: string;
  second_name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
}

interface LogFormData {
  login: string;
  password: string;
}

export default function Registration() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) throw new Error("AuthContext is not provided");
  const { login } = authContext;

  const [regformData, setregFormData] = useState<FormDataState>({
    first_name: "",
    second_name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm: ""
  });

  const [logformData, setlogFormData] = useState<LogFormData>({
    login: "",
    password: ""
  });

  const [isreg, setReg] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isreg) {
      setregFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setlogFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isreg) {
      if (regformData.confirm !== regformData.password) {
        console.log("Passwords do not match!");
        return;
      }

      const formData = new FormData();
      formData.append("first_name", regformData.first_name);
      formData.append("second_name", regformData.second_name);
      formData.append("username", regformData.username);
      formData.append("email", regformData.email);
      formData.append("phone", regformData.phone);
      formData.append("password", regformData.password);

      try {
        const res = await axios.post("http://localhost:8000/auth", formData);
        localStorage.setItem("user", regformData.username);
        console.log("Registration success:", res.data);
        setReg(false); // Optionally switch to login view
      } catch (error: any) {
        console.log("Registration error:", error.response?.data || error.message);
      }

    } else {
      const formData = new FormData();
      formData.append("login", logformData.login);
      formData.append("password", logformData.password);

      try {
        await login(logformData.login, logformData.password);
        localStorage.setItem("user", logformData.login);
        router.push("/post");
      } catch (error: any) {
        console.log("Login error:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-300 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isreg ? "Створити акаунт" : "Вхід"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 p-5">
          {isreg && (
            <>
              <div className="flex gap-2 flex-wrap">
                <input
                  className="flex-1 input-style"
                  type="text"
                  name="first_name"
                  placeholder="Ім’я"
                  value={regformData.first_name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="flex-1 input-style"
                  type="text"
                  name="second_name"
                  placeholder="Прізвище"
                  value={regformData.second_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  className="input-style"
                  type="text"
                  name="username"
                  placeholder="Ім'я користувача"
                  value={regformData.username}
                  onChange={handleChange}
                  required
                />
                <input
                  className="input-style"
                  type="email"
                  name="email"
                  placeholder="Електронна пошта"
                  value={regformData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="input-style"
                  type="text"
                  name="phone"
                  placeholder="Номер телефону"
                  value={regformData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {!isreg && (
            <input
              className="input-style"
              type="text"
              name="login"
              placeholder="Логін"
              value={logformData.login}
              onChange={handleChange}
              required
            />
          )}

          <input
            className="input-style"
            type="password"
            name="password"
            placeholder="Пароль"
            value={isreg ? regformData.password : logformData.password}
            onChange={handleChange}
            required
          />

          {isreg && (
            <input
              className="input-style"
              type="password"
              name="confirm"
              placeholder="Підтвердіть пароль"
              value={regformData.confirm}
              onChange={handleChange}
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-main cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {isreg ? "Зареєструватися" : "Увійти"}
          </button>

          <div className="flex justify-center gap-4">
            <span
              onClick={() => setReg(!isreg)}
              className="text-sm text-hiblue hover:underline cursor-pointer"
            >
              {isreg ? "У мене вже є акаунт" : "Зареєструватися"}
            </span>
            {!isreg && (
              <span className="text-sm text-hiblue hover:underline cursor-pointer">
                Забули пароль?
              </span>
            )}
          </div>
        </form>
      </div>

      <style jsx>{`
        .input-style {
          @apply w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition;
        }
      `}</style>
    </div>
  );
}
