// 'use client'

// import React, { useState, useContext, useEffect } from "react";
// import { useRouter } from 'next/navigation';
// import ProfileCard from "@/components/profilecard";
// import MyJars from "@/components/profile_myjars";
// import Header from "@/components/header";
// import AuthContext from "../AuthContext";
// import axios from "axios";

// export default function ProfilePage() {
//   const router = useRouter();

//   const handleEdit = () => {
//     router.push('/edit-profile');
//   };

//   return (
//     <div className="font-lex ml-[260px] 2xl:ml-[290px] pt-8 px-8 flex flex-col gap-12">
//       <ProfileCard
//         first_name={"Andriy"}
//         second_name={"Shevchenko"}
//         email={"andriy@example.com"}
//         phone={"+380123456789"}
//         onEdit={handleEdit}
//       />
//       <MyJars />
//     </div>
//   );
// }
'use client';

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/navigation';
import ProfileCard from "@/components/profilecard";
import MyJars from "@/components/profile_myjars";
import Header from "@/components/header";
import AuthContext from "../AuthContext";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpcnlua2EiLCJpZCI6MTgsImV4cCI6MTc0NTU2OTUyNH0.6k2IJ_XLHuvjTykRyGRQIRcJ74jn1wnjVsYyEyKAuac";
  const [user, setUser] = useState({
    first_name: "",
    second_name: "",
    email: "",
    phone: ""
  });

  const handleEdit = () => {
    router.push('/edit-profile');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        router.push('/login'); // Redirect to login if unauthorized
      }
    };

    if (token) fetchProfile();
  }, [token, router]);

  return (
    <div className="font-lex ml-[260px] 2xl:ml-[290px] pt-8 px-8 flex flex-col gap-12">
      <ProfileCard
        first_name={user.first_name}
        second_name={user.second_name}
        email={user.email}
        phone={user.phone}
        onEdit={handleEdit}
      />
      <MyJars />
    </div>
  );
}
