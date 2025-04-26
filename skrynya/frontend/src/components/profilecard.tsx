"use client"
import React from "react";
import Image from "next/image";

type ProfileCardProps = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  onEdit: () => void;
    since: string;
    imageUrl: string;
};
export default function ProfileCard(props: ProfileCardProps) {
  return (
    <div className="flex flex-col mt-14 md:flex-row gap-6 items-center md:items-start mx-4">
      {/* User Info */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-xl sm:text-2xl md:text-3xl font-semibold">{props.first_name} {props.last_name}</span>
          <div className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] md:w-[26px] md:h-[26px] rounded-[7px] bg-fallgray"></div>
        </div>
        <div className="text-lg sm:text-xl text-gray-600 mt-2">Status</div>
      </div>

      {/* Vertical Divider (only on medium and larger screens) */}
      <div className="hidden md:block w-[2px] h-[161px] bg-[#D9D9D9]"></div>

      {/* Contact Info */}
      <div className="flex flex-col gap-2 flex-1 text-sm sm:text-base text-textgray">
        <span>Електронна Пошта: <span className="font-medium">{props.email}</span></span>
        <span>Номер Телефону: <span className="font-medium">{props.phone}</span></span>
        <span>Дата Реєстрації: <span className="font-medium">{props.since}</span></span>
      </div>

      {/* Edit Button */}
      <div className="h-full flex items-center">
        <div
          onClick={props.onEdit}
          className="cursor-pointer mt-4 md:mt-0 w-full md:w-auto bg-[#14111F] text-white rounded-xl px-6 py-3 text-center text-sm sm:text-base md:text-lg font-semibold hover:bg-opacity-90 transition"
          >
          Редагувати Профіль
        </div>
      </div>
    </div>
  );
}
