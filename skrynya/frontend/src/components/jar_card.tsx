"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface DonationCardProps {
  id: number;               // 👈 Додано
  title: string;
  imageUrl: string;
  raised: number;
  goal: number;
  tags: string;
  author: string;
  created_at: string
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
 
    const router = useRouter()

    const handleToggleSave = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
        //   console.error("No token found");
          router.push("/login")
          return;
        }
      
        try {
          if (!active) {
            // Save jar
            await axios.post(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/jars/${id}/save`, null, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log("Jar saved!");
          } else {
            // Unsave jar
            await axios.post(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/jars/${id}/unsave`, null, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log("Jar unsaved!");
          }
          setActive(!active);
        } catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            console.error("Failed to toggle jar save:");
            console.error("Status:", err.response?.status);
            console.error("Data:", err.response?.data);
          } else {
            console.error("An unexpected error occurred:", err);
          }
        }
      };

    useEffect(() => {
      const isSaved = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
        //   console.error("No token found");
          return;
        }

        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/jars/saved`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const savedJars = res.data || [];
          const isAlreadySaved = savedJars.some((jar: DonationCardProps) => jar.id === id);
          setActive(isAlreadySaved);

        } 
        catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            console.error("Failed to fetch saved jars:");
            console.error("Status:", err.response?.status);
            console.error("Data:", err.response?.data);
          } else {
            console.error("An unexpected error occurred:", err);
            }        
          }

        try {
          const user_info = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/${author}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFirstName(user_info.data["first_name"]);
          setSecondName(user_info.data["second_name"]);
        } 
        catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            console.error("Failed to fetch saved jars:");
            console.error("Status:", err.response?.status);
            console.error("Data:", err.response?.data);
          } else {
            console.error("An unexpected error occurred:", err);
            }        
          }
      }
      isSaved()
      console.log(active)
    }, [])

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("uk-UA"); // формат день.місяць.рік
    };

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-[300px] sm:max-w-[340px] flex flex-col font-romono mb-8">
        {/* Image section */}
        <div className="relative w-full h-[180px] sm:h-[200px] bg-gray-100">
          <Bookmark
            onClick={handleToggleSave}
            className="absolute rounded-full bg-white p-2 w-9 h-9 sm:w-10 sm:h-10 cursor-pointer right-2 top-2 z-10"
            fill={active ? "#171717" : "none"}
          />
          <img
            src={`data:image/png;base64,${imageUrl}`}
            className="object-cover w-full h-[200px]"
            alt="Image"
          />
        </div>
    
        {/* Title + Button */}
        <div className="flex justify-between items-center px-4 pt-4">
          <h2 className="tracking-tight text-sm sm:text-base font-semibold line-clamp-2 pr-2">{title}</h2>
          <button
            onClick={() => router.push(`/jar_details/${id}`)}
            className="text-xs sm:text-sm text-white bg-main py-1 px-2 sm:py-2 sm:px-3 rounded-lg"
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
    
        {/* Author and Date */}
        <div className="px-4 flex flex-col gap-1 mt-2">
          <p className="text-[10px] sm:text-xs text-gray-600">Автор: {first_name} {second_name}</p>
          <p className="text-[10px] sm:text-xs text-gray-600">Створено: {formatDate(created_at)}</p>
        </div>
    
        {/* Raised Amount */}
        <div className="flex justify-end items-end px-4 mt-auto">
          <div className="text-xs sm:text-sm font-roman text-main">
            {raised}/{goal}
          </div>
        </div>
    
        {/* Progress Bar */}
        <div className="mt-1 w-full h-2 sm:h-3 bg-gray-200 overflow-hidden rounded">
          <div className="h-full bg-main" style={{ width: `${percentage}%` }} />
        </div>
      </div>
    );
    
  }
  
