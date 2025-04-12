"use client"

import React, { useContext  } from "react";
import AuthContext from "@/app/AuthContext";

export default function Header(){
    const authContext = useContext(AuthContext);

    if (!authContext) {
      throw new Error("AuthContext is not provided")
    }
  
    const { logout, user  } = authContext;
    return (
        <div className="w-full h-[64px] flex items-center justify-center px-6 bg-fallgray">
            <div className="relative flex-1 max-w-md">
                <input
                    type="text"
                    placeholder="Пошук..."
                    className="w-full py-2 px-4 pr-16 rounded-full border bg-white"
                />
                {/* <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {user?.current_streak && (
                        <span className="text-sm font-medium">{user.current_streak} pts.</span>
                    )}
                    <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                </div> */}
            </div>
            <button 
                onClick={() => logout()} 
                className="text-sm text-gray-700 hover:text-gray-900"
            >
                Log out
            </button>
        </div>
    )
}