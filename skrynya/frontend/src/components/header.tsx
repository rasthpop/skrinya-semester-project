"use client"

import React, { useContext } from "react";
import AuthContext from "@/app/AuthContext";

export default function Header(){
    const authContext = useContext(AuthContext);

    if (!authContext) {
      throw new Error("AuthContext is not provided")
    }
  
    const { logout } = authContext;
    return(
        <div className="w-full h-[64px] flex justify-end pr-6 bg-fallgray">
            <button onClick={() => (logout())}> Log out</button>
        </div>
    )
}