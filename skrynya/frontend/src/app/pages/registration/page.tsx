'use client'
import React, { useState, useContext } from "react";
import AuthContex from "@/app/AuthContext";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirm: string
}

interface LogFormData {
  login: string;
  password: string;
}

export default function Registration() {
  const { login } = useContext(AuthContex)
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')

  const [regformData, setregFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirm: ""
  });

  const [logformData, setlogFormData] = useState<LogFormData>({
    login: "",
    password: "",
  });

  const [isreg, setReg] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isreg){
      setregFormData((prev) => ({ ...prev, [name]: value }));
    }
    else {
      setlogFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isreg) {
      if (regformData.confirm == regformData.password){
        console.log("Submitted Data:", regformData);
      }
      else{
        console.log("Passwords do not match!")
      }
    }
    else{
      login(logformData["login"], logformData["password"])
      console.log("Submitted Data:", logformData);
    }
  };

  return (
    <div className="flex items-center flex-col mt-30 w-[40%] shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-[60%]">
          {isreg ?
          <div className="flex flex-col gap-8">
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

