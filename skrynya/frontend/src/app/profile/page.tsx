import React from "react";
import ProfileCard from "@/components/profilecard";
import MyJars from "@/components/profile_myjars";
import Header from "@/components/header";


export default function Profile(){

  return(
    <div  className="font-lex ml-[260px] 2xl:ml-[290px] pt-8 px-8 flex flex-col gap-12">
      <ProfileCard/>
      <MyJars/>
      <div>
        
      </div>
    </div>
  )
}