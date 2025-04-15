import React, { useState } from "react";




type ActivityProps = {
    activity: any[]
}

export default function Activity({activity}: ActivityProps) {
    return (
    <div>
        <div className="flex justify-between">
        <h2 className="text-2xl">Activity</h2>
        </div>
        <div className="bg-fallgray py-8 p-4 grid grid-cols-3 gap-y-2 gap-x-6 justify-items-center rounded-[4px]">
            <div className="flex flex-col gap-1 space-y">
                <h2 className="text-m mb-2">Current streak: {activity.current_streak}</h2>
                <h2 className="text-m">Max streak: {activity.max_streak}</h2>
            </div>


        </div>
    </div>
    )
}