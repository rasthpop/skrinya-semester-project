"use client";

import { useState, useEffect } from "react";
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
  status_: string;
}

export default function DonationCard({ 
    id,            
    title,
    tags,
    goal,
    raised,
    author,
    imageUrl,
    status_,
}: DonationCardProps) {
    const [active, setActive] = useState(false);



    const [second_name, setSecondName] = useState("");
    const [first_name, setFirstName] = useState("");

    let percentage: number
    if (raised === 0) {
        percentage = 0
    }
    else if (goal === 0) {
        percentage = 0
    }
    else {
        percentage = Math.min((raised / goal) * 100, 100);
    }
    // console.log("percentage", percentage)
    // console.log("raised", raised)
    // console.log("goal", goal)
    // console.log("id", id)
    // console.log("title", title)
    // console.log("author", author)
    // const percentage = Math.min((raised / goal) * 100, 100);
    const tagList = tags.split(",").map((tag) => tag.trim());
    // const key = localStorage.getItem("key");
    const router = useRouter()

    const handleToggleSave = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          router.push("/login")
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
        } catch (err: unknown) {
          console.error("Failed to toggle jar save:");
          if (axios.isAxiosError(err) && err.response) {
            console.error("Status:", err.response.status);
            console.error("Data:", err.response.data);
          } else {
            console.error("Full error:", err);
          }
        }
    };

    useEffect(() => {
      const isSaved = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
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
          console.error("Failed to fetch saved jars:");
          if (axios.isAxiosError(err) && err.response) {
            console.error("Status:", err.response.status);
            console.error("Data:", err.response.data);
          } else {
            console.error("Full error:", err);
          }
        }


        try {
          const user_info = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setFirstName(user_info.data["first_name"])
        setSecondName(user_info.data["second_name"])
        // console.log("User info:", first_name, second_name);
        } 
        catch (err: unknown) {
          console.error("Failed to fetch saved jars:");
          if (axios.isAxiosError(err) && err.response) {
            console.error("Status:", err.response.status);
            console.error("Data:", err.response.data);
          } else {
            console.error("Full error:", err);
          }
        }
      }
      isSaved()
      console.log(active)
    }, [])

    
    let color: string
    let status: string
  
    if (status_ === "active") {
    color = "green"
    status = "Активний"
    } else if (status_ === "not_reviewed") {
    color = "red"
    status = "Не перевірено"
    } else if (status_ === "finished") {
    color = "gray"
    status = "Завершено"
    } else {
    color = "black"
    status = "Невідомо"
    }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-sm font-romono mb-10">
    <div className="relative w-full h-46 bg-red-900">
    <Bookmark
onClick={handleToggleSave}
className={`absolute rounded-full bg-white  p-2 w-10 h-10 cursor-pointer right-1 top-1

      `}
    fill={active ? '#171717' : 'none'}
    />

    <p className="absolute bg-white px-2 py-1 flex items-center rounded-full h-10 top-1 left-1 text-lg text-sm text-gray-600" style={{color: color}}>{status}</p>
      <img src={`data:image/png;base64,${imageUrl}`} className="h-46 w-80 object-cover" alt="Image" />
    </div>
    <div className="px-4 pt-4 space-y-3">
      <div className="flex justify-between">
        <h2 className="tracking-tight text-xl">{title}</h2>

        <button onClick={() => router.push(`/jar_details/${id}`)} className="cursor-pointer text-sm text-white bg-main p-2 rounded-lg">
          Детальніше
        </button>

      </div>

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
        <p className="text-sm text-gray-600">Автор: {first_name} {second_name}</p>
        <div className="flex justify-end items-end">
          <div className="text-sm text-main">
            {raised}/{goal}
          </div>
        </div>

      </div>
      <div className="mt-1 w-full h-3 bg-gray-200 overflow-hidden rounded">
        <div className="h-full bg-main" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
