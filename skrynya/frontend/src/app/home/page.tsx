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
  tags: string;
  created_by: string;
    picture: string;
}



export default function HomePage() {  

  const [jars, setJars] = useState<Jar[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJars, setSavedJars] = useState<Jar[]>([]);
  const cardsPerPage = 30;

  useEffect(() => {
    async function fetchJars() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/jars/');
        setJars(res.data);
        console.log(res.data);
      } catch (err) {
        console.error('Error fetching jars:', err);
      }
    }
    fetchJars();
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = jars.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(jars.length / cardsPerPage);


  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };


  useEffect(() => {
    async function fetchSavedJars() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:8000/users/jars/saved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSavedJars(res.data);
        console.log("Saved jars:", res.data);
      } catch (err) {
        console.error("Error fetching saved jars:", err);
      }
    }
    fetchSavedJars();
  }, []);

  return(
    <main className="flex mb-6">
        <Sidebar />
      <div className="flex flex-col items-center justify-center w-full ml-54 overflow-x-hidden">
        <Header />
        <h1 className="text-4xl font-bold my-6 text-center">Головна</h1>
        <div className="w-full max-w-6xl mb-15">
        <Carousel jars={savedJars} />
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 gap-4">
          {currentCards.map((card) => (
            <DonationCard
              key={card.id}
              id={card.id}
              title={card.title}
              tags={card.tags}
              goal={card.goal_amount}
              raised={card.collected_amount}
              author={card.created_by}
                imageUrl={card.picture} // Assuming image is a base64 string or URL
            />
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-6 space-x-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-main text-white disabled:opacity-50 cursor-pointer"
          >
            {`<`}
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-main text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-main text-white disabled:opacity-50 cursor-pointer"
          >
            {`>`}
          </button>
        </div>
      </div>
    </main>
  )
}