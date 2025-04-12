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
  created_at: string;
}



export default function HomePage() {  
  const donationCards = [
    {
      id: 1,
      title: "123m1ndsdjk",
      tags: ["Транспорт", "Бронетехніка"],
      goal: 100000,
      raised: 1000000000,
    },
    {
      id: 2,
      title: "Допомога Тваринам",
      tags: ["Тварини", "Продукти"],
      goal: 50000,
      raised: 20000,
    },
    {
      id: 3,
      title: "Допомога Дітям",
      tags: ["Діти", "Іграшки"],
      goal: 30000,
      raised: 15000,
    },
    {
      id: 4,
      title: "Допомога Лікарням",
      tags: ["Медицина", "Ліки"],
      goal: 200000,
      raised: 100000,
    },
    {
      id: 5,
      title: "Допомога Біженцям",
      tags: ["Біженці", "Продукти"],
      goal: 70000,
      raised: 30000,
    },
    {
      id: 6,
      title: "Допомога Військовим",
      tags: ["Військові", "Екіпірування"],
      goal: 150000,
      raised: 80000,
    },
  
  ]


  const [jars, setJars] = useState<Jar[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

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

//   const goToNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const goToPrevPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };
// //   const [jars, setJars] = useState<Jar[]>([]);

//   useEffect(() => {
//     async function fetchJars() {
//       try {
//         const res = await axios.get('http://127.0.0.1:8000/jars/')
//         setJars(res.data)
//         console.log(res.data)
//       } catch (err) {
//         console.error('Error fetching jars:', err)
//       }
//     };

//     fetchJars()
//   }, [])

//   const [currentPage, setCurrentPage] = useState(1);
//   const cardsPerPage = 3; // Show 3 cards per page

//   // Calculate the indexes for current page
//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCards = donationCards.slice(indexOfFirstCard, indexOfLastCard);

//   const totalPages = Math.ceil(donationCards.length / cardsPerPage);

  // Functions to change page
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };


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
    }]
  

  return(
    <main className="flex mb-6">
        <Sidebar />
      <div className="flex flex-col items-center justify-center w-full ml-54 overflow-x-hidden">
        <Header />
        <h1 className="text-4xl font-bold my-6 text-center">Головна</h1>
        <div className="w-full max-w-6xl">
        <Carousel jars={m} />
        </div>

        <div className="my-8 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {jars.map((value) => (
          <JarCard key={value.id} name={value.title} />
        ))}
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 gap-4">
          {currentCards.map((card) => (
            <DonationCard
              key={card.id}
              title={card.title}
              tags={card.tags}
              goal={card.goal_amount}
              raised={card.collected_amount}
              author={card.created_by}
              created_at={card.created_at}
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