"use client";

import { FC, useState } from "react";
import { Bookmark } from "lucide-react";

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
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-sm  font-romono  mb-10">
      <div className="relative w-full h-46 bg-red-900">
        <Bookmark onClick={() => (setActive(!active))} className="absolute hover:bg-white transition rounded-full p-2 w-10  h-10 cursor-pointer right-0.5 top-0.5" />
        {/* <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" /> */}
      </div>

      <div className="flex justify-between space-y-3 px-4 pt-4">
        <h2 className="tracking-tight  text-xl ">{title}</h2>

        <div className="flex justify-between items-center">
          <button  className="text-sm text-white bg-main p-2 rounded-lg">
            Детальніше
          </button>
        </div>

        {/* <div className="flex flex-wrap gap-2">
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
        </div> */}

      </div>
        <div className="flex items-center justify-end text-sm text-mai">
          <div>
            {raised}/{goal}
          </div>
        </div>
        



        <div className="w-full h-3 bg-gray-200  overflow-hidden">
          <div className="h-full bg-main" style={{ width:` ${percentage}%` }} />
        </div>
    </div>
  );
};