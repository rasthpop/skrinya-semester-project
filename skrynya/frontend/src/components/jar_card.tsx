"use client";

import { FC, useState } from "react";
import { Bookmark } from "lucide-react";
import axios from "axios";

interface DonationCardProps {
  id: number;               // 👈 Додано
  title: string;
  imageUrl: string;
  raised: number;
  goal: number;
  tags: string;
  author: string;
}

export default function DonationCard({ 
    id,             // 👈 Додано
    title,
    tags,
    goal,
    raised,
    author,
    imageUrl,
}: DonationCardProps) {
    const [active, setActive] = useState(false);
    const percentage = Math.min((raised / goal) * 100, 100);
    const tagList = tags.split(",").map((tag) => tag.trim());
    const key = localStorage.getItem("key");
    
    const handleToggleSave = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
      
        try {
          if (!active) {
            // Save jar
            await axios.post(`http://127.0.0.1:8000/users/jars/${id}/save`, null, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log("Jar saved!");
          } else {
            // Unsave jar
            await axios.post(`http://127.0.0.1:8000/users/jars/${id}/unsave`, null, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log("Jar unsaved!");
          }
          setActive(!active);
        } catch (err: any) {
          console.error("Failed to toggle jar save:");
          console.error("Status:", err.response?.status);
          console.error("Data:", err.response?.data);
          console.error("Full error:", err);
        }
      };
      

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-sm font-romono mb-10">
      <div className="relative w-full h-46 bg-red-900">
      <Bookmark
  onClick={handleToggleSave}
  className={`absolute transition rounded-full p-2 w-10 h-10 cursor-pointer right-0.5 top-0.5
    ${active ? "text-black" : "text-gray-400 hover:text-black"}`
  }
/>
        <img src={`data:image/png;base64,${imageUrl}`} alt="Image" />
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
          <div className="text-sm text-main">
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
