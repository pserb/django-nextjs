"use client"

import { useAuth } from "@/contexts/AuthContext"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1>Please log in or register</h1>
        <LoginForm />
        <br />
        <RegisterForm />
      </div>
    )
  }

  return <>{children}</>
}

