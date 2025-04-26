// app/jars/[id]/page.tsx
import SupportButton from "@/components/support_button";
import Sidebar from "@/components/sidebar";
import axios from "axios";

// import JarBase from "../../../../../backend/api/routers/jars";

export type paramsType = Promise<{ id: string }>;

export interface JarBase {
    id: string;
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_RENDER_URL}/jars/${id}`, {
    cache: "no-store", // щоб не кешувалось
  });

  if (!res.ok) throw new Error("Jar not found");

  return res.json();
}

async function getUser(username: string) {
    const user = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_URL}/users/${username}`)
    return user.data
}

export default async function JarDetailsPage(props: { params: paramsType }) {
  const { id } = await props.params;
  const jar = await getJar(id);
  const user = await getUser(jar.created_by);
  const percentage = Math.min((jar.collected_amount / jar.goal_amount) * 100, 100);
  const tagList = jar.tags.split(",").map((tag) => tag.trim());

  console.log('user', user);

  return (
    <main>
      <Sidebar />
      <div className="p-6 md:p-10 flex flex-col justify-center md:ml-54 space-y-6 font-romono">
        {/* Image */}
        <div className="w-full flex justify-center">
          <img
            src={`data:image/png;base64,${jar.picture}`}
            alt={jar.title}
            className="w-full md:w-[70%] h-48 md:h-64 object-cover rounded-lg"
          />
        </div>

        {/* Main content */}
        <div className="space-y-6 w-full flex flex-col md:flex-row">
          {/* Left side */}
          <div className="w-full md:w-4/5 space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold">{jar.title}</h1>

            <div className="w-full md:w-2/3 h-5 rounded-full border-2 border-main overflow-hidden">
              <div className="h-full bg-main" style={{ width: `${percentage}%` }} />
            </div>

            <div className="text-sm md:text-base w-full md:w-2/3 font-romono text-main flex justify-between">
              <span>Зібрано:</span> 
              <span>{jar.collected_amount} / {jar.goal_amount}</span>
            </div>

            <p className="text-gray-700 font-romono text-base md:text-lg w-full md:w-3/5 mb-6">
              {jar.description}
            </p>

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

          {/* Tags */}
          <div className="flex flex-col gap-2 mt-6 md:mt-0">
            <h3 className="text-lg md:text-xl font-semibold">Теги:</h3>
            <div className="flex flex-wrap gap-2">
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

        {/* Support button */}
        <div className="w-full md:w-3/5">
          <SupportButton jar_id={parseInt(jar.id)} />
        </div>
      </div>
    </main>
  );
}
