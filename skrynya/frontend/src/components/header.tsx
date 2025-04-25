"use client"

import React from "react";

export default function Header(){
    return (
        <div className="w-full h-[64px] flex items-center justify-center px-6 bg-fallgray">
            <div className="relative flex-1 max-w-md">
                <input
                    type="text"
                    placeholder="Пошук..."
                    className="w-full py-2 px-4 pr-16 rounded-full border bg-white"
                />
            </div>
        </div>
    )
}