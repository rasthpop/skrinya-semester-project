"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function JarForm() {
  const router = useRouter();
  const [jardata, setJarData] = useState({
    title: "",
    description: "",
    goal: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateJar = () => {
    const errors: { [key: string]: string } = {};

    if (!jardata.title.trim()) errors.title = "Назва збору обов’язкова";
    if (!jardata.description.trim()) errors.description = "Опис обов’язковий";
    if (!jardata.goal.trim()) {
      errors.goal = "Мета обов’язкова";
    } else if (!/^\d+$/.test(jardata.goal)) {
      errors.goal = "Мета має містити лише числа";
    } else if (parseInt(jardata.goal) <= 0) {
      errors.goal = "Мета має бути більшою за 0";
    }
    if (!photo) errors.photo = "Фото обов'язкове";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setJarData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCreate() {
    const token = localStorage.getItem("token");
    if (!token) return console.log("no jwt token!");

    if (!validateJar()) return;

    const formData = new FormData();
    formData.append("title", jardata.title);
    formData.append("description", jardata.description);
    formData.append("goal_amount", jardata.goal);
    formData.append("collected_amount", "0");
    formData.append("tags", "test-tag");
    if (photo) formData.append("photo", photo);

    try {
      const res = await axios.post("http://127.0.0.1:8000/jars/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Jar created successfully:", res.data);
      router.push("/post");
    } catch (err: any) {
      console.error("Error creating jar:", err.response?.data || err.message || err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-zinc-100 to-zinc-300 flex items-center justify-center px-4">
      <a href="/home" className="absolute left-0 top-0 w-full bg-main h-14 text-2xl font-bold text-white flex items-center justify-center">Skrynya</a>

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-10 space-y-8 transition-all">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Відкрити Банку
        </h2>

        <div className="flex flex-col space-y-4">
          <input
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="Назва збору"
            className="border-b-1 h-8 text-lg border-gray-400"
          />
          <textarea
            onChange={(e) => setJarData((prev) => ({ ...prev, description: e.target.value }))}
            name="description"
            placeholder="Опис"
            className="input-style h-40 border-gray-400"
          />
          <input
            onChange={handleChange}
            type="text"
            name="goal"
            placeholder="Мета (сума)"
            className="border-b-1 h-8 text-lg border-gray-400"
          />

          <input
            type="file"
            accept="image/png"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          />

          {formErrors.title && <p className="text-red-500 text-sm">{formErrors.title}</p>}
          {formErrors.goal && <p className="text-red-500 text-sm">{formErrors.goal}</p>}
          {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
          {formErrors.photo && <p className="text-red-500 text-sm">{formErrors.photo}</p>}

          <button
            onClick={handleCreate}
            className="bg-main text-white py-3 rounded-xl text-center font-semibold hover:brightness-110 transition duration-300"
          >
            Створити
          </button>
        </div>
      </div>

      <style jsx>{`
        .input-style {
          @apply px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition;
        }
      `}</style>
    </div>
  );тр
}
