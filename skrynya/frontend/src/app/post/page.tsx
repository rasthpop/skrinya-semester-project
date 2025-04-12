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
    collected_amount: 0,
    status: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setJarData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleCreate() {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("no jwt token!");
      return;
    }

    const payload = {
      title: jardata.title,
      description: jardata.description,
      goal_amount: parseInt(jardata.goal),
      collected_amount: 0,
      status: "active",
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/jars/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Jar created successfully:", res.data);
      router.push("/post");
    } catch (err: any) {
      console.error("Error creating jar:", err.response?.data || err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-zinc-100 to-zinc-300 flex items-center justify-center px-4">
      <a
        href="/home"
        className="absolute top-6 left-6 text-hiblue text-sm hover:underline"
      >
        На головну
      </a>

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
            className="input-style"
          />
          <input
            onChange={handleChange}
            type="text"
            name="description"
            placeholder="Опис"
            className="input-style"
          />
          <input
            onChange={handleChange}
            type="text"
            name="goal"
            placeholder="Мета (сума)"
            className="input-style"
          />

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
  );
}
