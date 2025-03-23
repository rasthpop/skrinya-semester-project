import React from "react";

export default function ProfileCard() {

  return(
    <div className="flex gap-4 items-center">
      <div className="h-[180px] w-[180px] 2xl:h-[208px] 2xl:w-[208px] rounded-full bg-[#D9D9D9]"></div>

      <div className="flex flex-col">
        <div className="flex items-center"><span className="text-3xl">User Name</span> <div className="ml-2 w-[26px] h-[26px] rounded-[7px] bg-[#D9D9D9]"></div></div>
        <div className="text-xl">Status</div>
      </div>
      
      <div className="w-[2px] h-[181px] bg-[#D9D9D9]"></div>
      <div className="flex flex-col">
        <span className="">Електронна Пошта: <span></span></span>
        <span>Номер Телефону: <span></span></span>
        <span>Дата Реєстрації: <span></span></span>
      </div>
      
      <div className="ml-auto py-5 px-3 text-md bg-[#14111F] text-white rounded-xl">Редагувати Профіль</div>
    </div>
  )
}