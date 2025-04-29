"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ProfileJarCardProps {
  id: number;
  title: string;
  imageUrl: string;
  goal_amount: number;
  collected_amount: number;
  tags: string;
  author: string;
  status_: string;
}

export default function ProfileJarCard({
  id,
  title,
  imageUrl,
  goal_amount,
  collected_amount,
  tags,
  author,
  status_,
}: ProfileJarCardProps) {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const percentage = goal_amount === 0 ? 0 : Math.min((collected_amount / goal_amount) * 100, 100);
  const tagList = tags.split(",").map((tag) => tag.trim());

  const handleToggleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      if (!active) {
        await axios.post(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/jars/${id}/save`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/jars/${id}/unsave`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setActive(!active);
    } catch (err) {
      console.error("Failed to toggle jar save:", err);
    }
  };

  let color = "black";
  let status = "Невідомо";

  if (status_ === "active") {
    color = "green";
    status = "Активний";
  } else if (status_ === "not_reviewed") {
    color = "red";
    status = "Не перевірено";
  } else if (status_ === "finished") {
    color = "gray";
    status = "Завершено";
  }
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col font-romono mb-10 w-full max-w-[300px] min-h-[400px] sm:max-w-[340px] md:max-w-[360px]">
      {/* Image Section */}
      <div className="relative w-full aspect-[5/3] bg-gray-100">
        <Bookmark
          onClick={handleToggleSave}
          className="absolute rounded-full bg-white p-2 w-8 h-8 sm:w-10 sm:h-10 cursor-pointer right-2 top-2 z-10"
          fill={active ? "#171717" : "none"}
        />
        <p
          className="absolute bg-white px-2 py-1 flex items-center rounded-full text-[10px] sm:text-xs h-8 sm:h-10 top-2 left-2"
          style={{ color }}
        >
          {status}
        </p>
        <img
          src={`data:image/png;base64,${imageUrl}`}
          className="object-cover w-full h-[200px]"
          alt="Image"
        />
      </div>
  
      {/* Title and Button */}
      <div className="flex justify-between items-start px-4 pt-4 gap-2">
        <h2 className="tracking-tight text-sm sm:text-base font-semibold line-clamp-2 flex-1">{title}</h2>
        <button
          onClick={() => router.push(`/jar_details/${id}`)}
          className="text-[10px] sm:text-xs text-white bg-main py-1 px-2 rounded-lg whitespace-nowrap cursor-pointer"
        >
          Детальніше
        </button>
      </div>
  
      {/* Tags */}
      <div className="flex flex-wrap gap-2 px-4 mt-2">
        {tagList.map((tag) => (
          <span
            key={tag}
            className="text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-800"
          >
            {tag}
          </span>
        ))}
      </div>
  
      {/* Author */}
      <div className="px-4 flex flex-col gap-1 mt-2">
        <p className="text-[10px] sm:text-xs text-gray-600">Автор: {author}</p>
      </div>
  
      {/* Progress */}
      <div className="flex justify-end items-end px-4 mt-auto">
        <div className="text-xs sm:text-sm font-roman text-main">
          {collected_amount}/{goal_amount}
        </div>
      </div>
  
      {/* Progress Bar */}
      <div className="mt-1 w-full h-2 sm:h-3 bg-gray-200 overflow-hidden rounded">
        <div className="h-full bg-main" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
  
}
