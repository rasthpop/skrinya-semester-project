"use client"
import React from "react";

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

    return(
        // <div className="flex gap-4 item s-center mx-4">
        //   <img src={`data:image/png;base64,${props.imageUrl}`} className="h-[180px] w-[180px] 2xl:h-[208px] 2xl:w-[208px] rounded-full bg-fallgray"/>
    <div className="flex flex-col gap-4">
    <div className="flex flex-col">
      <div className="flex items-center">
        <span className="text-3xl">{props.first_name} {props.last_name}</span>
        <div className="ml-2 w-[26px] h-[26px] rounded-[7px] bg-fallgray mt-2"></div>
      </div>
      <div className="text-xl">Status</div>
    </div>

    <div className="w-[2px] h-[161px] bg-[#D9D9D9]"></div>
    <div className="flex flex-col">
      <span className="text-textgray">Електронна Пошта: <span>{props.email}</span></span>
      <span className="text-textgray">Номер Телефону: <span>{props.phone}</span></span>
      <span className="text-textgray">Дата Реєстрації: <span>{props.since}</span></span>
    </div>

    <div
      onClick={props.onEdit} // When the button is clicked, it triggers the edit mode
      className="cursor-pointer flex ml-auto w-[160px] h-[60px] 2xl:w-[208px] justify-center items-center 2xl:h-[69px] text-sm 2xl:text-lg bg-[#14111F] text-white rounded-xl"
    >Редагувати Профіль
    </div>
  </div>
);
}