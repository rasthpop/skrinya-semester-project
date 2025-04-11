'use client'

import React, { useState, useContext, useEffect } from "react";
import ProfileCard from "@/components/profilecard";
import MyJars from "@/components/profile_myjars";
import Header from "@/components/header";
import axios from "axios";
import Sidebar from "@/components/sidebar";


export default function Profile() {
  const [user_data, setUserData] = useState<any>(null)
  const [user_jars, setUserJars] = useState<any>([])
  const token = localStorage.getItem("token")

  async function getUser(){
    try {
      const res = await axios.get("http://127.0.0.1:8000/users/me", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });

      return res.data
      
    } catch (err: any) {
      console.error("Error fetching data:", err.response?.data || err.message);
    }
  }
  
  async function getUserJars() {
    try {
      const res = await axios.get("http://127.0.0.1:8000/jars/my/", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }

      });

      return res
      
    } catch (err: any) {
      console.error("Error getting jars:");
    }
    
  }
    
    // const user_data = getUser()
    useEffect(() => {
      const fetchData = async () => {
        const user = await getUser()
        const jars = await getUserJars()
        console.log(user)
        console.log(jars)
        if (user) setUserData(user)
        if (jars) setUserJars(jars)
      }
      if (token) {
        fetchData()
        console.log(user_data || "no user data")
      }
      else {
        console.log("No token found") 
      }        
  
    }, [])


  return(
    <main className="flex">
      <Sidebar/>
    <div  className="font-lex ml-[260px] 2xl:ml-[290px] pt-8 px-8 flex flex-col gap-12">
      {/* <ProfileCard
      first_name={user_data["first_name"]}
      last_name={user_data["second_name"]}
      email={user_data["email"]}
      phone={user_data["phone"]}
      /> */}
      {/* <MyJars

      /> */}
      <div>
        
      </div>
    </div>
    </main>


  )
}