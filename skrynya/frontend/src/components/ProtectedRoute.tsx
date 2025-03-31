import { ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContex from "@/app/AuthContext";

export default function ProtectedRoute( { children }: {children: ReactNode}) {
    const { user } = useContext(AuthContex)
    const router = useRouter()

    useEffect(() => {
        if (!user){
            router.push('/registration')
        }

    }, [user, router]);
    return user ? children : null
}

