import React from "react";

export default function ProfileCard() {

  return(
    <div className="flex gap-4 items-center mx-4">
      <div className="h-[180px] w-[180px] 2xl:h-[208px] 2xl:w-[208px] rounded-full bg-fallgray"></div>

      <div className="flex flex-col">
        <div className="flex items-center"><span className="text-3xl">User Name</span> <div className=" ml-2 w-[26px] h-[26px] rounded-[7px] bg-fallgray mt-2"></div></div>
        <div className="text-xl">Status</div>
      </div>
      
      <div className="w-[2px] h-[161px] bg-[#D9D9D9]"></div>
      <div className="flex flex-col">
        <span className="text-textgray">Електронна Пошта: <span></span></span>
        <span className="text-textgray">Номер Телефону: <span></span></span>
        <span className="text-textgray">Дата Реєстрації: <span></span></span>
      </div>
      
      <div className="cursor-pointer flex ml-auto w-[160px] h-[60px] 2xl:w-[208px] justify-center items-center 2xl:h-[69px] text-sm 2xl:text-lg bg-[#14111F] text-white rounded-xl">Редагувати Профіль</div>
    </div>
  )
}