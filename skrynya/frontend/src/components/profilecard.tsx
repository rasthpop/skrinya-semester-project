"use client";
import React, { useState } from "react";

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [originalData, setOriginalData] = useState({
    firstName: "Ім'я",
    lastName: "Прізвище",
    status: "Active",
    email: "user@example.com",
    phone: "+380 99 123 4567",
    registrationDate: "2024-01-01",
  });

  const [formData, setFormData] = useState({ ...originalData });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ім'я обов'язкове";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Прізвище обов'язкове";
    }

    if (!formData.status.trim()) {
      newErrors.status = "Статус обов'язковий";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Електронна пошта обов'язкова";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Невірний формат пошти";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обов'язковий";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Невірний номер телефону";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOriginalData({ ...formData });
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      console.error("Помилка збереження профілю:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
    setErrors({});
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex gap-4 items-center mx-4">
      <div className="h-[180px] w-[180px] 2xl:h-[208px] 2xl:w-[208px] rounded-full bg-fallgray"></div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          {isEditing ? (
            <>
              <input
                className={`text-xl border-b ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } outline-none`}
                placeholder="Ім’я"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">{errors.firstName}</span>
              )}
            </>
          ) : (
            <span className="text-2xl font-semibold">
              {formData.firstName}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          {isEditing ? (
            <>
              <input
                className={`text-xl border-b ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } outline-none`}
                placeholder="Прізвище"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">{errors.lastName}</span>
              )}
            </>
          ) : (
            <span className="text-2xl">{formData.lastName}</span>
          )}
        </div>

        <div className="flex flex-col">
          {isEditing ? (
            <>
              <input
                className={`text-xl border-b ${
                  errors.status ? "border-red-500" : "border-gray-300"
                } outline-none`}
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
              />
              {errors.status && (
                <span className="text-red-500 text-sm">{errors.status}</span>
              )}
            </>
          ) : (
            <div className="text-xl">{formData.status}</div>
          )}
        </div>
      </div>

      <div className="w-[2px] h-[161px] bg-[#D9D9D9]"></div>

      <div className="flex flex-col gap-2">
        <div className="text-textgray">
          Електронна Пошта:{" "}
          {isEditing ? (
            <div className="flex flex-col">
              <input
                className={`border-b ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } outline-none`}
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
          ) : (
            <span>{formData.email}</span>
          )}
        </div>
        <div className="text-textgray">
          Номер Телефону:{" "}
          {isEditing ? (
            <div className="flex flex-col">
              <input
                className={`border-b ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } outline-none`}
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}

            </div>
          ) : (
            <span>{formData.phone}</span>
          )}
        </div>
        <div className="text-textgray">
          Дата Реєстрації: <span>{formData.registrationDate}</span>
        </div>
      </div>

      <div className="flex gap-2 ml-auto">
        {isEditing ? (
          <>
            <button
              className="cursor-pointer flex w-[100px] h-[60px] 2xl:w-[120px] justify-center items-center 2xl:h-[69px] text-sm 2xl:text-lg bg-gray-300 text-gray-800 rounded-xl"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Скасувати
            </button>
            <button
              className="cursor-pointer flex w-[100px] h-[60px] 2xl:w-[120px] justify-center items-center 2xl:h-[69px] text-sm 2xl:text-lg bg-[#14111F] text-white rounded-xl disabled:opacity-50"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-pulse">Збереження...</span>
              ) : (
                "Зберегти"
              )}
            </button>
          </>
        ) : (
          <button
            className="cursor-pointer flex w-[160px] h-[60px] 2xl:w-[208px] justify-center items-center 2xl:h-[69px] text-sm 2xl:text-lg bg-[#14111F] text-white rounded-xl"
            onClick={() => setIsEditing(true)}
          >
            Редагувати Профіль
          </button>
        )}
      </div>
    </div>
  );
}
