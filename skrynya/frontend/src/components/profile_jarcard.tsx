import React from "react";

export default function JarCard({ name }: { name: string }){
    return(
        <div className="w-full h-[260px] 2xl:w-[438px] 2xl:h-[280px] bg-white rounded-xl">
            <div className="bg-slate-600 h-[60%] rounded-t-xl">

            </div>
            {name}
        </div>
    )
}