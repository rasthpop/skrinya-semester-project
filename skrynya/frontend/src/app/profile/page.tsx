// Profile.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "@/components/profilecard";
import MyJars from "@/components/profile_myjars";
import axios from "axios";
import Sidebar from "@/components/sidebar";
import History from "@/components/profile_transaction_history";
import Activity from "@/components/activity";

interface UserData {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  created_at: string;
  image: string;
}

interface Jar {
  id: string;
  title: string;
  tags: string;
  goal_amount: number;
  collected_amount: number;
  created_by: string;
  status: string;
  picture: string;
}

interface ActivityData {
  total_campaigns: number;
  total_donated: number;
  current_streak: number;
  max_streak: number;
  donations: {
    amount: number;
    date: string;
    id: number;
    user_id: number;
    campaign_id: number;
  }[];
  campaigns: {
    id: number;
    title: string;
    created_by: string;
  }[];
}

export default function Profile() {
  const router = useRouter();
  const [user_data, setUserData] = useState<UserData | null>(null);
  const [user_jars, setUserJars] = useState<Jar[]>([]);
  const [activities, setActivities] = useState<ActivityData | null>(null);

  const handleEdit = () => {
    router.push("/edit-profile");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken)
        return router.push('/home')

    const fetchData = async () => {
      try {
        const user = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/me`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setUserData(user.data);

        const jars = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_URL}/jars/my/`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setUserJars(jars.data);

        const activity = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/me/activity`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setActivities(activity.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex justify-center md:justify-start">
      <Sidebar />
      <div className="font-lex md:justify-start md:ml-54 pt-8 flex justify-center flex-col gap-12">
        {user_data && (
          <ProfileCard
            first_name={user_data.first_name}
            last_name={user_data.second_name}
            email={user_data.email}
            phone={user_data.phone}
            since={user_data.created_at.split("T")[0]}
            imageUrl={user_data.image}
            onEdit={handleEdit}
          />
        )}

        <MyJars jars={user_jars.map(jar => ({
          id: parseInt(jar.id),
          title: jar.title,
          tags: jar.tags,
          goal_amount: jar.goal_amount,
          collected_amount: jar.collected_amount,
          created_by: `${user_data?.first_name || ""} ${user_data?.second_name || ""}`,
          status: jar.status,
          picture: jar.picture,
        }))} />

        {activities && (
          <div className="w-full flex md:flex-row flex-col justify-between">
            <div className="w-full md:w-[48%] mb-2 ">
              <Activity activity={activities} />
            </div>
            <div className="w-full md:w-[48%]">
              <History donations={activities.donations} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}