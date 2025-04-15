"use client"

import React from "react";

export default function History() {
    const isEmpty = true; // Replace this with your actual condition to check if it's empty

    return (
        <div className="h-full">
            <div className="flex justify-between">
                <h2 className="text-2xl">Історія транзакцій</h2>
            </div>
            <div className="bg-fallgray py-8 p-4 grid grid-cols-3 gap-y-2 gap-x-6 justify-items-center rounded-[4px] h-full">
                {isEmpty ? (
                    <div className="text-gray-500">тут поки пусто...</div>
                ) : (
                    <div className="flex flex-col gap-1 space-y">
                        {/* Add your content here */}
                    </div>
                )}
            </div>
        </div>
    );
}