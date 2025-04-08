"use client"

import axios from "axios"
import React, { useState } from "react"
import { useRouter } from "next/navigation"

export default function JarForm() {
  
  const router = useRouter()
  const [jardata, setJarData] = useState(
    {
      title: "",
      description: "",
      goal: "",
      collected_amount: 0,
      status: ""

    }
  )
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    const { name, value } = e.target
    setJarData((prev) => ({ ...prev, [name]: value }))
  }

  
  async function handleCreate() {
    const token = localStorage.getItem("token")
  
    if(!token) {
      console.log("no jwt token!")
      return
    }
    const payload = {
      title: jardata.title,
      description: jardata.description,
      goal_amount: parseInt(jardata.goal), // assuming jardata.goal is a string
      collected_amount: 0,
      status: "active"
    }
    try {
      const res = await axios.post("http://127.0.0.1:8000/jars/", payload, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });

      console.log("Jar created successfully:", res.data);
    } catch (err: any) {
      console.error("Error creating jar:", err.response?.data || err.message);
    }
  }

  return(
    <div className="flex justify-center">
      <a className="text-hiblue absolute left-2 top-2" href="/home" >Назад</a>
      
      <div className="flex flex-col w-[50%] mt-20 gap-6">
        <h2 className="mb-8">Відкрити банку</h2>

        <input onChange={handleChange} type="text" name="title" placeholder="title"/>        
        <input onChange={handleChange} type="text" name="description" placeholder="description"/>        
        <input onChange={handleChange} type="text" name="goal" placeholder="goal"/>

        <button onClick={handleCreate} className="py-4 px-2 bg-amber-300">Create</button>
      </div>
    </div>
  )
}