"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface DonationCardProps {
  id: number;
  title: string;
  imageUrl: string;
  raised: number;
  goal: number;
  tags: string;
  author: string;
  created_at: string;
}

export default function DonationCard({ 
    id,            
    title,
    tags,
    goal,
    raised,
    author,
    imageUrl,
    created_at
}: DonationCardProps) {
  const [active, setActive] = useState(false);
  const [second_name, setSecondName] = useState("");
  const [first_name, setFirstName] = useState("");
  const percentage = Math.min((raised / goal) * 100, 100);
  const tagList = tags.split(",").map((tag) => tag.trim());
  const router = useRouter();

  const handleToggleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      router.push("/login");
      return;
    }
    try {
      if (!active) {
        await axios.post(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/jars/${id}/save`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/jars/${id}/unsave`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setActive(!active);
    } catch (err: any) {
      console.error("Failed to toggle jar save:", err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/jars/saved`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const savedJars = res.data || [];
        const isAlreadySaved = savedJars.some((jar: any) => jar.id === id);
        setActive(isAlreadySaved);

        const user_info = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/${author}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFirstName(user_info.data["first_name"]);
        setSecondName(user_info.data["second_name"]);
      } catch (err: any) {
        console.error("Error fetching data:", err);
      }
    }
    fetchData();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("uk-UA"); // формат день.місяць.рік
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-[300px] h-[400px] flex flex-col font-romono mb-10">
      <div className="relative w-full h-[180px] bg-gray-100">
        <Bookmark
          onClick={handleToggleSave}
          className="absolute rounded-full bg-white p-2 w-10 h-10 cursor-pointer right-2 top-2 z-10"
          fill={active ? "#171717" : "none"}
        />
        <img
          src={`data:image/png;base64,${imageUrl}`}
          className="object-cover w-full h-full"
          alt="Image"
        />
      </div>

      <div className="flex justify-between items-center px-4 pt-4">
        <h2 className="tracking-tight text-base font-semibold line-clamp-2 pr-2">{title}</h2>
        <button
          onClick={() => router.push(`/jar_details/${id}`)}
          className="text-xs text-white bg-main py-1 px-2 rounded-lg"
        >
          Детальніше
        </button>
      </div>

      <div className="flex flex-wrap gap-2 px-4 mt-2">
        {tagList.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-800"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="px-4 flex flex-col gap-1 mt-2">
        <p className="text-xs text-gray-600">Автор: {first_name} {second_name}</p>
        <p className="text-xs text-gray-600">Створено: {formatDate(created_at)}</p>
      </div>

      <div className="flex justify-end items-end px-4 mt-auto">
        <div className="text-sm font-roman text-main">
          {raised}/{goal}
        </div>
      </div>

      <div className="mt-1 w-full h-3 bg-gray-200 overflow-hidden rounded">
        <div className="h-full bg-main" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
