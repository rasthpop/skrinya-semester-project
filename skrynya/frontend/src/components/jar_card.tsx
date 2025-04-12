"use client";

import { FC, useState } from "react";
import { Bookmark } from "lucide-react";

interface DonationCardProps {
  title: string;
  imageUrl: string;
  raised: number;
  goal: number;
  tags: string;
  author: string;
}

export default function DonationCard({
  title,
  imageUrl,
  raised,
  goal,
  tags,
  author,
}: DonationCardProps) {
  const [active, setActive] = useState(false);
  const percentage = Math.min((raised / goal) * 100, 100);

  // Теги парсимо, якщо вони приходять як строка через кому
  const tagList = tags.split(",").map((tag) => tag.trim());

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-sm font-romono mb-10">
      <div className="relative w-full h-46 bg-red-900">
        <Bookmark
          onClick={() => setActive(!active)}
          className="absolute hover:bg-white transition rounded-full p-2 w-10 h-10 cursor-pointer right-0.5 top-0.5"
        />
        {/* <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" /> */}
      <img
          src={`data:image/jpeg;base64,${imageUrl}`}
          alt={title}
          className="w-full h-full object-cover"
          />
       </div>

      <div className="px-4 pt-4 space-y-3">
        <h2 className="tracking-tight text-xl">{title}</h2>

        <p className="text-sm text-gray-600">Автор: {author}</p>

        <div className="flex flex-wrap gap-2">
          {tagList.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button className="text-sm text-white bg-main p-2 rounded-lg">
            Детальніше
          </button>
          <div className="text-sm text-mai">
            {raised}/{goal}
          </div>
        </div>

        <div className="w-full h-3 bg-gray-200 overflow-hidden rounded">
          <div className="h-full bg-main" style={{ width: `${percentage}%` }} />
        </div>
      </div>
    </div>
  );
}
