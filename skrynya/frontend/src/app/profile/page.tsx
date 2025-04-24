'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import ProfileCard from "@/components/profilecard";
import MyJars from "@/components/profile_myjars";
import Header from "@/components/header";
import axios from "axios";
import Sidebar from "@/components/sidebar";
import Activity from "@/components/activity";
import History from "@/components/profile_transaction_history";

export default function Profile() {
  const router = useRouter();
  const [user_data, setUserData] = useState<any>(null);
  const [user_jars, setUserJars] = useState<any>([]);
  const [token, setToken] = useState<string | null>(null);
  const [activity, setActivity] = useState<any>([]);
  const handleEdit = () => {
    router.push('/edit-profile');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.log("No token found");
      return;
    }

    setToken(storedToken);

    const fetchData = async () => {
      try {
        const user = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setUserData(user.data);

        const jars = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_URL}/jars/my/`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setUserJars(jars.data);

        const activity = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/me/activity`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setActivity(activity.data);
      } catch (err: any) {
        console.error("Error fetching data:", err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex">
      <Sidebar />
      <div className="font-lex ml-54 pt-8 px-8 flex flex-col gap-12 mb-20">
        {user_data && (
          <ProfileCard
            first_name={user_data["first_name"]}
            last_name={user_data["second_name"]}
            email={user_data["email"]}
            phone={user_data["phone"]}
            since={user_data["created_at"].split("T")[0]}
            imageUrl={user_data["image"]}
            onEdit={handleEdit}
          />
        )}
        <div>
          <MyJars jars={user_jars} />
        </div>
        <div className="w-full flex justify-between">
          {/* <div className="w-[48%]"><Activity activity={activity}/></div> */}
          <div className="w-[48%]"><History/></div>
        </div>
      </div>
    </main>
  );
}
