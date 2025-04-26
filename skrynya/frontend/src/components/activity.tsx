'use client';

import React from "react";

type ActivityProps = {
  activity: {
    total_campaigns: number;
    total_donated: number;
    current_streak: number;
    max_streak: number;
    donations: {
      amount: number;
      date: string;
      id: number;
      user_id: number;
      campaign_id: number;
    }[];
    campaigns: {
      id: number;
      title: string;
      created_by: string;
    }[];
  };
};

export default function Activity({ activity }: ActivityProps) {
  return (
    <div className="h-full">
      <div className="flex justify-between">
        <h2 className="text-2xl">Статистика</h2>
      </div>

      <div className="bg-fallgray py-8 pl-2 grid grid-cols-2 gap-y-4 gap-x-6 justify-items-start rounded-[4px] h-full mt-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm text-gray-700 font-semibold">Поточний стрік:</h2>
          <p className="text-lg">{activity.current_streak}</p>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-sm text-gray-700 font-semibold">Максимальний стрік:</h2>
          <p className="text-lg">{activity.max_streak}</p>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-sm text-gray-700 font-semibold">Загальна сума донатів:</h2>
          <p className="text-lg">{activity.total_donated} ₴</p>
        </div>
      </div>
    </div>
  );
}
