import React, { useState } from "react";
import DonationCard from "./profile_jarcard";




type MyJarsProps = {
    jars: any[]
  }
  export default function MyJars({jars}: MyJarsProps) {
    // console.log("jars", jars)
    const [isall, setAll] = useState(false)
    return (
        <div>
            <div className="flex justify-between">
            <h2 className="text-2xl">My Jars</h2>
            <span onClick={() => (setAll(!isall))} className="text-xl text-hiblue cursor-pointer">{!isall ? "See All" : "Show less"}</span>
            </div>
            <div className="bg-fallgray py-8 p-4 grid grid-cols-3 gap-y-6 gap-x-6 justify-items-center rounded-[4px]">
                {!isall ? jars.slice(0,3).map((jar) => (
                    <DonationCard key={jar.id}
                    id = {jar.id}
                    title={jar.title}
                    tags={jar.tags}
                    goal={jar.goal_amount}
                    raised={jar.collected_amount}
                    author={jar.created_by}
                    status_={jar.status}
                    imageUrl={jar.picture}/>
                )) 
                :
                jars.map((jar) => (
                    <DonationCard key={jar.id}
                    id = {jar.id}
                    title={jar.title}
                    tags={jar.tags}
                    goal={jar.goal_amount}
                    raised={jar.collected_amount}
                    author={jar.created_by}
                    status_={jar.status}
                    imageUrl={jar.picture}/>
                ))}
            </div>
        </div>
    )
}