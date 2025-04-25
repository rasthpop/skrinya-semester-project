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
      const res = await axios.post(`${process.env.NEXT_PUBLIC_RENDER_URL}/jars/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Jar created successfully:", res.data);
      router.push("/post");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Error creating jar:", err.response?.data || err.message);
      } else {
        console.error("Error creating jar:", err);
      }
    }
  }

  return (
      <main>
    <div className="min-h-screen bg-gradient-to-tr from-zinc-100 to-zinc-300 flex items-center justify-center px-4 relative">
      <a
        href="/home"
        className="absolute left-0 top-0 w-full bg-main h-14 text-2xl font-bold text-white flex items-center justify-center"
        >
        Skrynya
      </a>

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-10 space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Відкрити Банку
        </h2>

        <div className="flex flex-col space-y-5">
          {/* Title Field */}
          <div>
            <input
              onChange={handleChange}
              type="text"
              name="title"
              placeholder="Назва збору"
              className="input-style"
              />
            {formErrors.title && (
                <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <textarea
              onChange={(e) =>
                setJarData((prev) => ({ ...prev, description: e.target.value }))
            }
            name="description"
            placeholder="Опис"
            className="input-style h-40 resize-none"
            />
            {formErrors.description && (
                <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
            )}
          </div>

          {/* Goal Field */}
          <div>
            <input
              onChange={handleChange}
              type="text"
              name="goal"
              placeholder="Мета (сума)"
              className="input-style"
              />
            {formErrors.goal && (
                <p className="text-red-500 text-sm mt-1">{formErrors.goal}</p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className="block">
              <span className="text-gray-700 mb-2 block">Завантажити фото:</span>
              <div className="flex items-center gap-4">
                <label className="bg-main text-white px-4 py-2 rounded-xl cursor-pointer hover:brightness-110 transition duration-300">
                  Вибрати файл
                  <input
                    type="file"
                    accept="image/png"
                    className="hidden"
                    onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                    />
                </label>
                <span className="text-sm text-gray-600">
                  {photo ? photo.name : "Файл не вибрано"}
                </span>
              </div>
              {formErrors.photo && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.photo}</p>
                )}
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleCreate}
            className="bg-main cursor-pointer text-white py-3 rounded-xl font-semibold hover:brightness-110 transition duration-300"
            >
            Створити
          </button>
        </div>
      </div>

      <style jsx>{`
        .input-style {
            @apply w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition;
            }
            `}</style>
    </div>
            </main>
  );
}
