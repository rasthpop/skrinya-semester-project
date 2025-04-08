'use client'

import React, { useState, useContext, useEffect } from "react";
import ProfileCard from "@/components/profilecard";
import MyJars from "@/components/profile_myjars";
import Header from "@/components/header";
import AuthContext from "../AuthContext";
import axios from "axios";

export default function Profile(){
  const authContext = useContext(AuthContext)
  const test = 

  useEffect(() => {
    console.log(test)
}, [])

  return(
    <div  className="font-lex ml-[260px] 2xl:ml-[290px] pt-8 px-8 flex flex-col gap-12">
      <ProfileCard/>
      <MyJars/>
      <div>
        
      </div>
    </div>


  )
}