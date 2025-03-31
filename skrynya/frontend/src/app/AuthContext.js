"use client"

import { createContext, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation" 

const AuthContex = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const router = useRouter()

    async function Login(username, password){
        try {
            const formData = new FormData()
            formData.append('username', username)
            formData.append('password', password)
            const response = await axios.post('http://localhost:8000/auth/token', formData, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
            localStorage.setItem('token', response.data.access_token)
            setUser(response.data)
            router.push('/')
        }
        catch(error){
            console.log("FAIL", error)
        }
    }
    function Logout() {
        setUser(null)
        delete axios.defaults.headers.common['Authorization']
        router.push('/login')
    }
    return (
        <AuthContex.Provider value={{user, Login, Logout}}>
            {children}
        </AuthContex.Provider>
    )
}

export default AuthContex