"use client"

import { useAuth } from "@/contexts/AuthContext"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
        <div className="w-full max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-4xl font-bold text-primary">Demo Dashboard</h1>
            <p className="text-muted-foreground">Please log in or register to continue</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-start">
            <LoginForm />
            <div className="hidden md:flex h-64 border-r border-border"></div>
            <RegisterForm />
          </div>
        </div>
      </div>
    )
  }

  return <div className="min-h-screen">{children}</div>
}