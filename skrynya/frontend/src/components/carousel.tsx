'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Bookmark } from "lucide-react";
// interface Jar {
//   id: number
//   title: string
//   image: string
//   description: string
//   author: string  // ← тут буде first_name + ' ' + last_name
// }


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
  
  
interface CarouselProps {
  jars: Jar[]
}

export default function Carousel({ jars }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? jars.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === jars.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full mx-auto overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {jars.map((jar) => (
          <div key={jar.id} className="relative w-full flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-6 flex flex-col justify-end">
              <span className="text-white/80 text-sm">{jar.created_by} збирає</span>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl md:text-4xl text-white font-bold">{jar.title}</h2>
                <Bookmark className='text-white/80' size={36} fill="white"/>
                </div>
            </div>
        <img src={`data:image/png;base64,${jar.picture}`} alt="Image" className='w-full h-72 object-cover'/>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full shadow-lg transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full shadow-lg transition-all"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        {jars.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
