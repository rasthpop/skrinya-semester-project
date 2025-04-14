import React, { useContext, useEffect, useState } from "react";
import AuthContext from "@/app/AuthContext";
import axios from "axios";
import debounce from "lodash.debounce";

export default function Header() {
    const authContext = useContext(AuthContext);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);

    if (!authContext) {
        throw new Error("AuthContext is not provided");
    }

    const { logout, user } = authContext;

    const fetchResults = debounce(async (search: string) => {
        try {
            const res = await axios.get(`/api/search-campaigns`, {
                params: { query: search }
            });
            setResults(res.data);
        } catch (err) {
            console.error("Search error:", err);
        }
    }, 300);

    useEffect(() => {
        if (query.length > 0) {
            fetchResults(query);
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <div className="w-full h-[64px] flex items-center justify-center px-6 bg-fallgray">
            <div className="relative flex-1 max-w-md">
                <input
                    type="text"
                    placeholder="Пошук..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full py-2 px-4 pr-16 rounded-full border bg-white"
                />
                {results.length > 0 && (
                    <ul className="absolute top-12 w-full bg-white border rounded-lg shadow z-10">
                        {results.map((result, i) => (
                            <li key={i} className="p-2 hover:bg-gray-100 cursor-pointer">
                                {result}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button 
                onClick={() => logout()} 
                className="text-sm text-gray-700 hover:text-gray-900"
            >
                Log out
            </button>
        </div>
    );
}
