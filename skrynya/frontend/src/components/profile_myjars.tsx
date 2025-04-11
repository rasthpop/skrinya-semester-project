import React from "react";
import JarCard from "./profile_jarcard";



export default function MyJars(jars: any[]) {
    return (
        <div>
            <div className="flex justify-between">
            <h2 className="text-2xl">My Jars</h2>
            <span className="text-xl text-hiblue cursor-pointer">See All</span>
            </div>
            <div className="bg-fallgray py-8 p-4 grid grid-cols-3 gap-y-6 gap-x-6 justify-items-center rounded-[4px]">
                {jars.slice(0, 3).map((jar) => (
                    <JarCard name={jar}/>
                ))}
            </div>
        </div>
    )
}