// app/jars/[id]/page.tsx
import SupportButton from "@/components/support_button";
import Sidebar from "@/components/sidebar";
import axios from "axios";
import Header from "@/components/header";
// import JarBase from "../../../../../backend/api/routers/jars";

// export interface Jar {
//     id: number;
//     title: string;
//     description: string;
//     goal_amount: number;
//     collected_amount: number;
//     status: string;
//     tags: string[]; // бо Enums приходять як строки
//   }

export interface JarBase {
    title: string;
    description: string;
    goal_amount: number;
    collected_amount: number; // optional, default = 0
    tags: string;
    created_by: string;
    created_at: string;
    picture: string;
  }



async function getJar(id: string): Promise<JarBase> {
  const res = await fetch(`http://localhost:8000/jars/${id}`, {
    cache: "no-store", // щоб не кешувалось
  });

  if (!res.ok) throw new Error("Jar not found");

  return res.json();
}

async function getUser(username: string) {
    const user = await axios.get(`http://localhost:8000/users/${username}`)
    return user.data
}


export default async function JarDetailsPage({ params }: { params: { id: string } }) {
  const jar = await getJar(params.id);
    const user = await getUser(jar.created_by)
  const percentage = Math.min((jar.collected_amount / jar.goal_amount) * 100, 100);
  const tagList = jar.tags.split(",").map((tag) => tag.trim());
  console.log('user', user)
  return (
    <main className="">
    <Sidebar />
      <Header/>
    <div className="p-10 flex flex-col justify-center  ml-54 space-y-6 font-romono">
      <div className="w-full flex justify-center">
        <img src={`data:image/png;base64,${jar.picture}`} alt={jar.title} className="w-[70%] h-64 object-cover rounded-lg" />
      </div>
    <div className="space-y-6 w-full flex">
      <div className="w-[80%]">

      <h1 className="text-3xl font-romono mb-4">{jar.title}</h1>

      <div className="w-[65%] h-5  rounded-full border-2 border-main overflow-hidden">
        <div className="h-full bg-main" style={{ width: `${percentage}%` }} />
      </div>

      <div className="text-2xl w-[65%] font-romono text-main flex justify-between">
        <span>Зібрано:</span> <span>{jar.collected_amount} / {jar.goal_amount}</span>
      </div>
      
      <p className="text-gray-700 font-romono text-lg w-[60%] mb-10 mt-6">{jar.description}</p>


      <div className="text-sm text-gray-500">
        Автор: {user.first_name} {user.second_name}
      </div>
    
      <p className="text-sm text-gray-500">
  Створено: {new Date(jar.created_at).toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}
</p>    
  </div>

      <div className="flex flex-col flex-wrap gap-2">
        <h3 className="text-xl">Теги:</h3>
        <div>

        {tagList?.map(tag => (
          <span
          key={tag}
          className="px-3 py-1 bg-main text-white rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
        </div>
      </div>
  </div>
      <div className="w-[60%]">
        <SupportButton />
      </div>
    </div>
    </main>
  );
}
