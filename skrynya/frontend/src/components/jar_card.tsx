"use client"

import Image from "next/image";
import { FC } from "react";
import { Bookmark } from "lucide-react";
import { useState } from "react";
// import { Button } from "@/components/ui/button";

interface DonationCardProps {
  title: string;
  imageUrl: string;
  raised: number;
  goal: number;
  tags: string[];
}

export default function DonationCard({ title, imageUrl, raised, goal, tags }: DonationCardProps){
    const [active, setActive] = useState(false);
  const percentage = Math.min((raised / goal) * 100, 100);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden max-w-sm">
      <div className="relative w-full h-48">
        {/* <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" /> */}
      </div>

      <div className="p-4 space-y-3">
        <h2 className="text-lg font-semibold">{title}</h2>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                tag === "Транспорт"
                  ? "bg-olive-100 text-olive-800"
                  : tag === "Бронетехніка"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button  className="text-sm">
            Детальніше
          </button>
          <Bookmark onClick={() => (setActive(!active))} className="w-5 h-5 cursor-pointer" />
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            <div className="w-16 h-4 bg-gray-300 rounded-full dark:bg-gray-700"></div>
            <div>Status</div>
          </div>
          <div>
            {raised}/{goal}
          </div>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600" style={{ width:` ${percentage}%` }} />
        </div>
      </div>
    </div>
  );
};