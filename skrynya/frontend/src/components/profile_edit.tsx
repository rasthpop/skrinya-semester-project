"use client";
import React, { useState } from "react";
import ProfileCard from "./profilecard";

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

export default function ProfileEdit() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    first_name: "Іван",
    last_name: "Петренко",
    email: "ivan.petrenko@example.com",
    phone: "+380501234567",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.first_name) newErrors.first_name = "Ім'я є обов'язковим";
    if (!formData.last_name) newErrors.last_name = "Прізвище є обов'язковим";
    if (!formData.email.includes("@")) newErrors.email = "Некоректна пошта";
    if (!formData.phone.match(/^\+?\d{10,}$/)) newErrors.phone = "Некоректний номер";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      setIsEditing(false);
    }
  };

  return (
    <>
      {!isEditing ? (
        <ProfileCard
          first_name={formData.first_name}
          last_name={formData.last_name}
          email={formData.email}
          phone={formData.phone}
          onEdit={() => setIsEditing(true)}
        />
      ) : (
        <div className="flex flex-col gap-4 p-4">
          <div>
            <input
              className="border px-2 py-1 rounded w-full"
              placeholder="Ім’я"
              value={formData.first_name}
              onChange={(e) => handleChange("first_name", e.target.value)}
            />
            {errors.first_name && <div className="text-red-500 text-sm">{errors.first_name}</div>}
          </div>

          <div>
            <input
              className="border px-2 py-1 rounded w-full"
              placeholder="Прізвище"
              value={formData.last_name}
              onChange={(e) => handleChange("last_name", e.target.value)}
            />
            {errors.last_name && <div className="text-red-500 text-sm">{errors.last_name}</div>}
          </div>

          <div>
            <input
              className="border px-2 py-1 rounded w-full"
              placeholder="Електронна пошта"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>

          <div>
            <input
              className="border px-2 py-1 rounded w-full"
              placeholder="Номер телефону"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
          </div>

          <div className="flex gap-2">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Зберегти
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => setIsEditing(false)}
            >
              Скасувати
            </button>
          </div>
        </div>
      )}
    </>
  );
}
