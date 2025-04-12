"use client"

import React, { useEffect, useState } from "react"
import axios from "axios";
import JarCard from "@/components/profile_jarcard"
import { GetServerSideProps } from 'next';
import DonationCard from "@/components/jar_card";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/navigation";
import Carousel from "../../components/carousel";
import Header from "@/components/header";

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

  const m =  [
    {
      id: 1,
      author: "Author 1",
      title: "Jar 1",
      image: "dummy.jpg",
      description: "Description for Jar 1",
    },
    {
      id:2,
      title: "Jar 2",
      author: "Author 2",
      image: "dummy.jpg",
      description: "Description for Jar 1",
    },
    {
      id:3,
      title: "Jar 3",
      author: "Author 2",
      image: "dummy.jpg",
      description: "Description for Jar 1",
    },
  
  ]
  return(
    <main className="flex">
        <Sidebar />
      <div className="flex flex-col items-center w-full ml-[250px] overflow-x-hidden">
        <Header />
        <h1 className="text-4xl font-bold my-6 text-center">Головна</h1>
        <div className="w-full max-w-6xl">
        <Carousel jars={m} />
        </div>

        <div className="mx-4 my-8 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {jars.map((value) => (
          <JarCard key={value.id} name={value.title} />
        ))}
        </div>

        <div className="w-full max-w-4xl px-4">
        {/* <DonationCard
          title="Пожертвувати на благодійність"
          tags={["допомога", "благодійність"]}
          goal={1000}
          raised={200}
        /> */}
        </div>
      </div>
    </main>
  )
}