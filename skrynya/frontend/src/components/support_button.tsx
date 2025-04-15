"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SupportButtonProps {
  jar_id: number;
}

export default function SupportButton({ jar_id }: SupportButtonProps) {
  const [showInput, setShowInput] = useState(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleClick = async () => {
    if (!showInput) {
      setShowInput(true);
      return;
    }

    if (!amount || amount <= 0) {
      alert("Введіть коректну суму");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Ви не увійшли в акаунт");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`http://localhost:8000/donations/${jar_id}`, { amount }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAmount(null);
      setShowInput(false);

      router.refresh();

    } catch (err: any) {
      console.error("Помилка при донаті:", err.response?.data || err.message);
      alert("Щось пішло не так");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {showInput && (
        <input
          type="number"
          placeholder="Сума"
          className="border px-3 py-2 rounded w-full"
          value={amount ?? ""}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      )}

      <button
        disabled={loading}
        onClick={handleClick}
        className="px-6 py-3 bg-main text-white rounded-lg text-lg hover:opacity-90 transition disabled:opacity-50"
      >
        {showInput ? "Надіслати" : "Підтримати"}
      </button>
    </div>
  );
}
