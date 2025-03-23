import React from "react";
import ProfileCard from "@/components/profilecard";
import MyJars from "@/components/profile_myjars";

export default function App(){
  return(
    <div className="ml-[260px] 2xl:ml-[360px] pt-8 px-8">
      <ProfileCard/>
      <MyJars/>
    </div>
  )
}