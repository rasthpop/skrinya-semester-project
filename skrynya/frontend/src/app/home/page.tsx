"use client"

import React, { useEffect, useState } from "react"
import axios from "axios";
import DonationCard from "@/components/jar_card";
import Sidebar from "@/components/sidebar";
import Carousel from "../../components/carousel";

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
  created_at: string;
}



export default function HomePage() {  

  const [jars, setJars] = useState<Jar[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJars, setSavedJars] = useState<Jar[]>([]);
  const cardsPerPage = 30;
  const [sortOption, setSortOption] = useState<string>("Найновіші");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function fetchJars() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_URL}/jars/`);
        setJars(res.data);
        console.log(res.data);
      } catch (err) {
        console.error('Error fetching jars:', err);
      }
    }
    fetchJars();
  }, []);


  useEffect(() => {
    async function fetchSavedJars() {
    const token = localStorage.getItem("token");
    if (!token) {
        setSavedJars([])
        return; 
    }
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/jars/saved`, {
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

  
  const filteredCards = jars.filter((jar) => {
    const search = searchTerm.toLowerCase();
    return (
      jar.title.toLowerCase().includes(search) ||
      jar.description.toLowerCase().includes(search) ||
      jar.created_by.toLowerCase().includes(search)
    );
  });

  const sortedCards = [...jars].sort((a, b) => {
    switch (sortOption) {
      case "Найближчі до закриття":
        return (a.goal_amount - a.collected_amount) - (b.goal_amount - b.collected_amount);
      case "Найдовші до закриття":
        return (b.goal_amount - b.collected_amount) - (a.goal_amount - a.collected_amount);
      case "Найновіші":
        return b.id - a.id;
      case "Найстаріші":
        return a.id - b.id;
      default:
        return 0;
    }
  });

  const displayedCards = searchTerm ? filteredCards : sortedCards;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = displayedCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(displayedCards.length / cardsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };


  return (
    <main className="flex mb-6">
      <Sidebar />
      <div className="flex flex-col items-center justify-center w-full md:ml-54 overflow-x-hidden">
        <h1 className="text-4xl font-bold my-6 text-center">Головна</h1>

        {savedJars.length > 0 && (
        <div className="w-full max-w-6xl mb-10">
            <Carousel jars={savedJars} />
        </div>
        )}

        {/* Сортування і пошук на одному рівні */}
        <div className="w-full max-w-6xl flex flex-col-reverse sm:flex-row-reverse sm:items-center justify-between mb-6 px-6 gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-black dark:text-gray-700">
              Сортувати за:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            >
              <option>Найближчі до закриття</option>
              <option>Найдовші до закриття</option>
              <option>Найновіші</option>
              <option>Найстаріші</option>
            </select>
          </div>

          {/* Пошук */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Пошук..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 text-sm w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Карти */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6 gap-4 min-h-[600px]">
          {currentCards.length > 0 ? (
            currentCards.map((card) => (
              <DonationCard
                key={card.id}
                id={card.id}
                title={card.title}
                tags={card.tags}
                goal={card.goal_amount}
                raised={card.collected_amount}
                author={card.created_by}
                imageUrl={card.picture}
                created_at={card.created_at}
              />
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center text-center text-lg text-gray-600">
              Упс. За вашим пошуковим запитом не знайдено банок.
            </div>
          )}
        </div>

        {/* Пагінація */}
        {currentCards.length > 0 && (
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
        )}
      </div>
    </main>
  );
}
