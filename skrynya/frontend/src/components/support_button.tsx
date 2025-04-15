// src/app/components/SupportButton.tsx
"use client";

import React from "react";

export default function SupportButton() {
  return (
    <button
      className="px-6 py-3 bg-main text-white rounded-lg text-lg hover:opacity-90 transition"
      onClick={() => alert("Дякуємо за підтримку!")}
    >
      Підтримати 💛
    </button>
  );
}
