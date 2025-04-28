"use client";

import React, { useState } from "react";
import ProfileJarCard from "./profile_jarcard"; // 👈 зверни увагу на імпорт
// або "./profile_jarcard" якщо інша назва файлу

type MyJarsProps = {
  jars: {
    id: number;
    title: string;
    tags: string;
    goal_amount: number;
    collected_amount: number;
    created_by: string;
    status: string;
    picture: string;
  }[];
};

export default function MyJars({ jars }: MyJarsProps) {
  const [isAll, setIsAll] = useState(false);


  return (
    <div>
      <div className="flex justify-between w-full">
        <h2 className="text-2xl">Мої Збори</h2>
        <span
          onClick={() => setIsAll(!isAll)}
          className="text-lg text-hiblue cursor-pointer"
        >
          {!isAll ? "Сховати" : "Показати більше"}
        </span>
      </div>

      <div
        className={`bg-fallgray py-8 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center rounded-[4px] ${
          isAll ? "overflow-y-auto max-h-[500px]" : "overflow-hidden"
        }`}
      >
        {(isAll ? jars : jars.slice(0, 3)).map((jar) => (
          <ProfileJarCard
            key={jar.id}
            id={jar.id}
            title={jar.title}
            tags={jar.tags}
            goal_amount={jar.goal_amount}
            collected_amount={jar.collected_amount}
            author={jar.created_by}
            status_={jar.status}
            imageUrl={jar.picture}
          />
        ))}
      </div>
    </div>
  );
}
