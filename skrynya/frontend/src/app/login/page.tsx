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

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isreg, setReg] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormErrors((prev) => ({ ...prev, [name]: "" }));

    if (isreg) {
      setregFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setlogFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateReg = () => {
    const errors: { [key: string]: string } = {};

    if (!regformData.first_name.trim()) errors.first_name = "Ім’я обов’язкове";
    if (!regformData.second_name.trim()) errors.second_name = "Прізвище обов’язкове";
    if (!regformData.username.trim()) errors.username = "Ім'я користувача обов’язкове";
    if (!/\S+@\S+\.\S+/.test(regformData.email)) errors.email = "Некоректна електронна пошта";
    if (!/^\+?\d{10,15}$/.test(regformData.phone)) errors.phone = "Некоректний номер телефону";
    if (regformData.password.length < 6) errors.password = "Пароль має містити щонайменше 6 символів";
    if (regformData.password !== regformData.confirm) errors.confirm = "Паролі не співпадають";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (isreg) {
      if (!validateReg()) return;
  
      const formData = new FormData();
      Object.entries(regformData).forEach(([key, value]) => {
        if (key !== "confirm") formData.append(key, value);
      });
  
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_RENDER_URL}/auth`, formData);
        localStorage.setItem("user", regformData.username);
        await login(regformData.username, regformData.password);
        router.push("/home");
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          setFormErrors({ username: error.response.data || "Помилка реєстрації" });
        } else {
          setFormErrors({ username: "Помилка реєстрації" });
        }
      }
  
    } else {
        try {
            await login(logformData.login, logformData.password);
            localStorage.setItem("user", logformData.login);
            router.push("/home");
          } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
              const errorMessage = "Невірний логін або пароль";
              setFormErrors({ login: errorMessage });
            }
          }
          
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-300 px-4">
      <a href="/home" className="absolute left-0 top-0 w-full bg-main h-14 text-2xl font-bold text-white flex items-center justify-center">Skrynya</a>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isreg ? "Створити акаунт" : "Вхід"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 p-5">
          {isreg && (
            <>
              <div className="flex gap-2 flex-wrap">
                <div className="w-full md:w-1/2">
                  {formErrors.first_name && <p className="text-red-500 text-sm mb-1">{formErrors.first_name}</p>}
                  <input
                    className={`input-style ${formErrors.first_name ? "border-red-500" : ""}`}
                    type="text"
                    name="first_name"
                    placeholder="Ім’я"
                    value={regformData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  {formErrors.second_name && <p className="text-red-500 text-sm mb-1">{formErrors.second_name}</p>}
                  <input
                    className={`input-style ${formErrors.second_name ? "border-red-500" : ""}`}
                    type="text"
                    name="second_name"
                    placeholder="Прізвище"
                    value={regformData.second_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {formErrors.username && <p className="text-red-500 text-sm mb-1">{formErrors.username}</p>}
                <input
                  className={`input-style ${formErrors.username ? "border-red-500" : ""}`}
                  type="text"
                  name="username"
                  placeholder="Ім'я користувача"
                  value={regformData.username}
                  onChange={handleChange}
                  required
                />
                {formErrors.email && <p className="text-red-500 text-sm mb-1">{formErrors.email}</p>}
                <input
                  className={`input-style ${formErrors.email ? "border-red-500" : ""}`}
                  type="email"
                  name="email"
                  placeholder="Електронна пошта"
                  value={regformData.email}
                  onChange={handleChange}
                  required
                />
                {formErrors.phone && <p className="text-red-500 text-sm mb-1">{formErrors.phone}</p>}
                <input
                  className={`input-style ${formErrors.phone ? "border-red-500" : ""}`}
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
            <>
              {formErrors.login && <p className="text-red-500 text-sm mb-1">{formErrors.login}</p>}
              <input
                className={`input-style ${formErrors.login ? "border-red-500" : ""}`}
                type="text"
                name="login"
                placeholder="Логін"
                value={logformData.login}
                onChange={handleChange}
                required
              />
            </>
          )}

          {formErrors.password && <p className="text-red-500 text-sm mb-1">{formErrors.password}</p>}
          <input
            className={`input-style ${formErrors.password ? "border-red-500" : ""}`}
            type="password"
            name="password"
            placeholder="Пароль"
            value={isreg ? regformData.password : logformData.password}
            onChange={handleChange}
            required
          />

          {isreg && (
            <>
              {formErrors.confirm && <p className="text-red-500 text-sm mb-1">{formErrors.confirm}</p>}
              <input
                className={`input-style ${formErrors.confirm ? "border-red-500" : ""}`}
                type="password"
                name="confirm"
                placeholder="Підтвердіть пароль"
                value={regformData.confirm}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-main cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {isreg ? "Зареєструватися" : "Увійти"}
          </button>

          <div className="flex justify-center gap-4">
            <span
              onClick={() => {
                setReg(!isreg);
                setFormErrors({});
              }}
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
