'use client'
import React, { useState, useContext } from "react";
import AuthContext from "@/app/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

interface FormData {
  first_name: string;
  second_name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirm: string
}

interface LogFormData {
  login: string;
  password: string;
}

export default function Registration() {
  const authContext = useContext(AuthContext)

  const router = useRouter()

  if (!authContext) {
    throw new Error("AuthContext is not provided")
  }

  const { login } = authContext;

  const [regformData, setregFormData] = useState<FormData>({
    first_name: "",
    second_name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm: ""
  });

  const [logformData, setlogFormData] = useState<LogFormData>({
    login: "",
    password: "",
  });

  const [isreg, setReg] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    if (isreg){
      setregFormData((prev) => ({ ...prev, [name]: value }))
    }
    else {
      setlogFormData((prev) => ({ ...prev, [name]: value }))
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isreg) {
      if (regformData.confirm == regformData.password){
        console.log("Submitted Data:", regformData)
        try {
          const response = await axios.post("http://localhost:8000/auth", regformData, {
            headers: { "Content-Type": "application/json" },
          });
          
        } catch (error: any) {
          console.log("error", {error})
        }
        // login(logformData["login"], logformData["password"])
        console.log("Submitted Data:", logformData);
        localStorage.setItem("user", regformData["username"])
      }
      else{
        console.log("Passwords do not match!")
      }
    }
    else{
      login(logformData["login"], logformData["password"])
      localStorage.setItem("user", logformData["login"])
      console.log(localStorage)
      router.push("/post")
    }

    console.log(localStorage.getItem("user"))
  };

  return (
    <div className="flex items-center justify-center flex-col mt-30 w-[60%] mx-20 shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-[60%]">
          {isreg ?
          <div className="flex flex-col gap-8">
            <div className="flex gap-2 w-full">
              <input
                className="border-b-1 border-gray-400"
                type="text"
                name="first_name"
                placeholder="First Name"
                value={regformData.first_name}
                onChange={handleChange}
                required
                />
              <input
                className="border-b-1 border-gray-400"
                type="text"
                name="second_name"
                placeholder="Second Nmae"
                value={regformData.second_name}
                onChange={handleChange}
                required
                />

            </div>
            <input
              className="border-b-1 border-gray-400"
              type="text"
              name="username"
              placeholder="Username"
              value={regformData.username}
              onChange={handleChange}
              required
              />
            <input
              className="border-b-1 border-gray-400"
              type="email"
              name="email"
              placeholder="Email"
              value={regformData.email}
              onChange={handleChange}
              required
              /> 
            <input
              className="border-b-1 border-gray-400"
              type="text"
              name="phone"
              placeholder="+ 380"
              value={regformData.phone}
              onChange={handleChange}
              required
              /> 
            </div>
            : 
            <input
            className="border-b-1 border-gray-400"
            type="text"
            name="login"
            placeholder="Логін"
            value={logformData.login}
            onChange={handleChange}
            required
            />
            }
          <input
            className="border-b-1 border-gray-400"
            type="password"
            name="password"
            placeholder="Password"
            value={isreg ? regformData.password : logformData.password}
            onChange={handleChange}
            required
          />
          {isreg ?  <input
            className="border-b-1 border-gray-400"
            type="password"
            name="confirm"
            placeholder="Confirm password"
            value={regformData.confirm}
            onChange={handleChange}
            required
          /> : <></>}
          <span onClick={() => (setReg(!isreg))} className="text-sm text-hiblue tracking-tight cursor-pointer">
            {isreg ? "У мене є акаунт" : "Зареєструватися"}
          </span>
          <button type="submit" className="w-full bg-main text-white rounded-lg">Submit</button>
        </form>
      </div>
  );
};
