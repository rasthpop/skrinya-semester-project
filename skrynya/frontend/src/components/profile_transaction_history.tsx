"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
interface Donation {
    id: number;
    amount: number;
    date: string;
    campaign_id: number;
}

interface HistoryProps {
    donations: Donation[];
}

export default function History({ donations }: HistoryProps) {
    const router = useRouter();
  const [campaignTitles, setCampaignTitles] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchCampaignTitles = async () => {
      const titles: Record<number, string> = {};
  
      for (const donation of donations) {
        if (!titles[donation.campaign_id]) {
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_URL}/jars/${donation.campaign_id}`);
            titles[donation.campaign_id] = res.data.title;
          } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
              console.warn(`Не знайдено збір з id ${donation.campaign_id}`);
              titles[donation.campaign_id] = "Збір видалено або закрито";
            } else {
              console.error("Інша помилка при отриманні збору:", error);
              titles[donation.campaign_id] = "Помилка завантаження";
            }
          }
        }
      }
  
      setCampaignTitles(titles);
    };
  
    if (donations.length > 0) {
      fetchCampaignTitles();
    }
  }, [donations]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA");
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="h-full">
      <div className="flex justify-between">
        <h2 className="text-2xl">Історія транзакцій</h2>
      </div>
      <div className="bg-fallgray py-4 p-4 rounded-[4px] h-[400px] overflow-y-auto grid gap-4">
        {donations.length === 0 ? (
          <div className="text-gray-500 text-center">Тут поки пусто...</div>
        ) : (
          donations.map((donation) => (
            <div
              key={donation.id}
              className="w-full bg-white rounded-lg p-4 shadow flex flex-col gap-2"
            >
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatDate(donation.date)}</span>
                <span>{formatTime(donation.date)}</span>
              </div>
              <div className="text-xl font-semibold text-main">
                {donation.amount} ₴
              </div>
            

            <div
            className="text-sm text-gray-700 cursor-pointer hover:underline"
            onClick={() => {
                if (campaignTitles[donation.campaign_id] !== "Збір видалено або закрито" && campaignTitles[donation.campaign_id] !== "Помилка завантаження") {
                router.push(`/jar_details/${donation.campaign_id}`);
                }
                // Якщо збір видалено або помилка — нічого не робити
            }}
            >
                {campaignTitles[donation.campaign_id] || "Завантаження..."}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
