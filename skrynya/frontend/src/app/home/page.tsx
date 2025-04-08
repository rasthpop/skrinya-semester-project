"use client"

import React, { useEffect, useState } from "react"
import axios from "axios";
import JarCard from "@/components/profile_jarcard"
import { GetServerSideProps } from 'next';

interface Jar {
  id: number;
  title: string;
  description: string;
  goal_amount: number;
  collected_amount: number;
  status: string;
}

export default function HomePage() {  
  const [jars, setJars] = useState<Jar[]>([]);

  useEffect(() => {
    async function fetchJars() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/jars/')
        setJars(res.data)
        console.log(res.data)
      } catch (err) {
        console.error('Error fetching jars:', err)
      }
    };

    fetchJars()
  }, [])


  return(
    <main>

    <div className="w-full h-[300px] my-10 bg-slate-500 ">
      m
    </div>

    <div className="mx-20 gap-8 grid grid-cols-3">
      {jars.map((value) => (
        <JarCard key={value.id} name={value.title} />
      ))}  
    </div>

    </main>
  )
}