import { ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/app/AuthContext";

export default function ProtectedRoute( { children }: {children: ReactNode}) {
    const { user } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (!user){
            router.push('/registration')
        }

    }, [user, router]);
    return user ? children : null
}

