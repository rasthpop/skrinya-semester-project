import React, { useState } from "react";
import DonationCard from "./profile_jarcard";




type MyJarsProps = {
    jars: {
        id: number;
        title: string;
        tags: string;
        goal_amount: number;
        collected_amount: number;
        created_by: string;
        status: string;
        picture: string;
    }[]
  }
  export default function MyJars({ jars }: MyJarsProps) {
    const [isall, setAll] = useState(false);
  
    return (
      <div className=" md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2 mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Мої Збори</h2>
          <span
            onClick={() => setAll(!isall)}
            className="text-base md:text-lg text-hiblue cursor-pointer"
          >
            {!isall ? "Показати більше" : "Сховати"}
          </span>
        </div>
  
        <div
          className={`bg-fallgray py-6 p-4 grid gap-6 justify-items-center rounded-[8px]
            ${isall ? "overflow-y-auto max-h-[500px]" : "overflow-hidden"}
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          `}
        >
          {(isall ? jars : jars.slice(0, 3)).map((jar) => (
            <DonationCard
              key={jar.id}
              id={jar.id}
              title={jar.title}
              tags={jar.tags}
              goal={jar.goal_amount}
              raised={jar.collected_amount}
              author={jar.created_by}
              status_={jar.status}
              imageUrl={jar.picture}
            />
          ))}
        </div>
      </div>
    );
  }
  