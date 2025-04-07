"use client"

import React, { useEffect } from "react";
import HomePage from "./home/page";

import Sidebar from "@/components/sidebar";
import Profile from "./profile/page";
import Header from "@/components/header";
import Registration from "./registration/page";

import { useRouter } from "next/navigation";
import { AuthProvider } from "./AuthContext";

export default function Home() {
  const router = useRouter();
  const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("user");
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile"); // Redirect to profile if logged in
    }
  }, [isAuthenticated]);

  
  return (
   <HomePage/>
  );
}