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

  const validateField = (name: string, value: string) => {
    const errors: { [key: string]: string } = {};

    switch (name) {
      case "first_name":
        if (!value.trim()) errors.first_name = "Ім’я обов’язкове";
        else if (value.length < 2 || value.length > 30) errors.first_name = "Ім’я повинно містити від 2 до 30 символів";
        break;

      case "second_name":
        if (!value.trim()) errors.second_name = "Прізвище обов’язкове";
        else if (value.length < 2 || value.length > 30) errors.second_name = "Прізвище повинно містити від 2 до 30 символів";
        break;

      case "username":
        if (!value.trim()) errors.username = "Ім'я користувача обов’язкове";
        else if (value.length < 3 || value.length > 20) errors.username = "Ім'я користувача повинно містити від 3 до 20 символів";
        break;

      case "email":
        if (!value.trim()) errors.email = "Електронна пошта обов’язкова";
        else if (!/\S+@\S+\.\S+/.test(value)) errors.email = "Некоректна електронна пошта";
        else if (value.length > 50) errors.email = "Електронна пошта повинна містити не більше 50 символів";
        break;

      case "phone":
        if (!/^\+?\d{10,15}$/.test(value)) errors.phone = "Некоректний номер телефону, введіть номер у форматі 10 цифр без знаків.";
        break;

      case "password":
        if (value.length < 6 || value.length > 32) errors.password = "Пароль має містити від 6 до 32 символів";
        break;

      case "confirm":
        if (value !== regformData.password) errors.confirm = "Паролі не співпадають";
        break;

      case "login":
        if (!value.trim()) errors.login = "Логін обов’язковий";
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errors[name] || "",
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (isreg) {
      setregFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setlogFormData(prev => ({ ...prev, [name]: value }));
    }

    validateField(name, value);
  };

  const validateReg = () => {
    const errors: { [key: string]: string } = {};

    if (!regformData.first_name.trim()) {
      errors.first_name = "Ім’я обов’язкове";
    } else if (regformData.first_name.length < 2 || regformData.first_name.length > 30) {
      errors.first_name = "Ім’я повинно містити від 2 до 30 символів";
    }

    if (!regformData.second_name.trim()) {
      errors.second_name = "Прізвище обов’язкове";
    } else if (regformData.second_name.length < 2 || regformData.second_name.length > 30) {
      errors.second_name = "Прізвище повинно містити від 2 до 30 символів";
    }

    if (!regformData.username.trim()) {
      errors.username = "Ім'я користувача обов’язкове";
    } else if (regformData.username.length < 3 || regformData.username.length > 20) {
      errors.username = "Ім'я користувача повинно містити від 3 до 20 символів";
    }

    if (!regformData.email.trim()) {
      errors.email = "Електронна пошта обов’язкова";
    } else if (!/\S+@\S+\.\S+/.test(regformData.email)) {
      errors.email = "Некоректна електронна пошта";
    } else if (regformData.email.length > 50) {
      errors.email = "Електронна пошта повинна містити не більше 50 символів";
    }

    if (!/^\+?\d{10,15}$/.test(regformData.phone)) {
      errors.phone = "Некоректний номер телефону";
    }

    if (regformData.password.length < 6 || regformData.password.length > 32) {
      errors.password = "Пароль має містити від 6 до 32 символів";
    }

    if (regformData.password !== regformData.confirm) {
      errors.confirm = "Паролі не співпадають";
    }

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
          setFormErrors({ login: "Невірний логін або пароль" });
        }
      }
    }
  };

  const renderError = (field: string) => (
    <p className={`text-xs md:text-sm mb-1 min-h-[1.25rem] transition-all duration-300 ${formErrors[field] ? "text-red-500" : "text-transparent"}`}>
      {formErrors[field] || "."}
    </p>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-300 px-2 md:px-4 relative">
      {/* Header link */}
      <a
        href="/home"
        className="fixed absolute top-0 w-full bg-main h-14 text-lg md:text-2xl font-bold text-white flex items-center justify-center"
      >
        Skrynya
      </a>
      <div className="w-full mt-14 max-w-xl bg-white border border-gray-300 shadow-lg p-6 md:p-10 pt-32 flex flex-col justify-center space-y-6 min-h-screen md:min-h-fit">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isreg ? "Створити акаунт" : "Вхід"}
        </h2>
  
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isreg && (
            <>
              <div className="flex gap-4 flex-wrap">
                <div className="w-full md:w-1/2">
                  {renderError("first_name")}
                  <input
                    className={`border-b-1 border-gray-300 ${formErrors.first_name ? "border-red-500" : ""}`}
                    type="text"
                    name="first_name"
                    placeholder="Ім’я"
                    value={regformData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  {renderError("second_name")}
                  <input
                    className={`border-b-1 border-gray-300 ${formErrors.second_name ? "border-red-500" : ""}`}
                    type="text"
                    name="second_name"
                    placeholder="Прізвище"
                    value={regformData.second_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
  
              <div className="flex flex-col gap-4">
                {renderError("username")}
                <input
                  className={`border-b-1 border-gray-300 ${formErrors.username ? "border-red-500" : ""}`}
                  type="text"
                  name="username"
                  placeholder="Ім'я користувача"
                  value={regformData.username}
                  onChange={handleChange}
                  required
                />
  
                {renderError("email")}
                <input
                  className={`border-b-1 border-gray-300 ${formErrors.email ? "border-red-500" : ""}`}
                  type="email"
                  name="email"
                  placeholder="Електронна пошта"
                  value={regformData.email}
                  onChange={handleChange}
                  required
                />
  
                {renderError("phone")}
                <input
                  className={`border-b-1 border-gray-300 ${formErrors.phone ? "border-red-500" : ""}`}
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
              {renderError("login")}
              <input
                className={`border-b-1 border-gray-300 ${formErrors.login ? "border-red-500" : ""}`}
                type="text"
                name="login"
                placeholder="Логін"
                value={logformData.login}
                onChange={handleChange}
                required
              />
            </>
          )}
  
          {renderError("password")}
          <input
            className={`border-b-1 border-gray-300 ${formErrors.password ? "border-red-500" : ""}`}
            type="password"
            name="password"
            placeholder="Пароль"
            value={isreg ? regformData.password : logformData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
  
          {isreg && (
            <>
              {renderError("confirm")}
              <input
                className={`border-b-1 border-gray-300 ${formErrors.confirm ? "border-red-500" : ""}`}
                type="password"
                name="confirm"
                placeholder="Підтвердіть пароль"
                value={regformData.confirm}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </>
          )}
  
          <button
            type="submit"
            className="w-full bg-main cursor-pointer text-white font-semibold py-2 px-4 transition hover:bg-opacity-90 text-sm md:text-base"
          >
            {isreg ? "Зареєструватися" : "Увійти"}
          </button>
  
          <div className="flex justify-center">
            <span
              onClick={() => {
                setReg(!isreg);
                setFormErrors({});
              }}
              className="text-sm text-hiblue hover:underline cursor-pointer"
            >
              {isreg ? "У мене вже є акаунт" : "Зареєструватися"}
            </span>
          </div>
        </form>
      </div>
  
      {/* Custom input styles */}

    </div>
  );
} 