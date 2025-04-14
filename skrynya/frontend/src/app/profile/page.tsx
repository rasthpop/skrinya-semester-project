'use client'

import React, { useState, useEffect } from "react";
import ProfileCard from "@/components/profilecard";
import MyJars from "@/components/profile_myjars";
import Header from "@/components/header";
import axios from "axios";
import Sidebar from "@/components/sidebar";

export default function Profile() {
  const [user_data, setUserData] = useState<any>(null);
  const [user_jars, setUserJars] = useState<any>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.log("No token found");
      return;
    }

    setToken(storedToken);

    const fetchData = async () => {
      try {
        const user = await axios.get("http://127.0.0.1:8000/users/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setUserData(user.data);

        const jars = await axios.get("http://127.0.0.1:8000/jars/my/", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setUserJars(jars.data);
      } catch (err: any) {
        console.error("Error fetching data:", err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex">
      <Sidebar />
      <div className="font-lex ml-54 pt-8 px-8 flex flex-col gap-12">
        {user_data && (
          <ProfileCard
            first_name={user_data["first_name"]}
            last_name={user_data["second_name"]}
            email={user_data["email"]}
            phone={user_data["phone"]}
            since={user_data["created_at"].split("T")[0]}
            imageUrl={user_data["image"]}
          />
        )}
        <div>
          <MyJars jars={user_jars} />
        </div>
      </div>
    </main>
  );
}
