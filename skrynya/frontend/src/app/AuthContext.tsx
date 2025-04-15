"use client";

import { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
    id: number;
    first_name: string;
    second_name: string;
    username: string;
    email: string;
    phone: string;
    // Add other user properties as needed
}

interface AuthContextType {
    user: User | null;
    login(username: string, password: string): Promise<void>;
    logout(): void;
}

const AuthContext = createContext<AuthContextType | null>(null);
export default AuthContext;

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    async function login(username: string, password: string): Promise<void> {
        try {
            const formData = new URLSearchParams();
            formData.append("username", username);
            formData.append("password", password);

            const response = await axios.post<{ access_token: string; user: User }>(
                "http://localhost:8000/auth/token",
                formData,
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }
            );

            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
            localStorage.setItem("token", response.data.access_token);
            setUser(response.data.user);
            router.push("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    function logout(): void {
        setUser(null);
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        localStorage.setItem("user", "")
        router.push("/login");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}