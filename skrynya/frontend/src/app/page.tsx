"use client"

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();
  const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("user");
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile"); // Redirect to profile if logged in
    }
    else {
      router.push("/home")
    }
  }, [isAuthenticated]);

  
  return <></>;
}