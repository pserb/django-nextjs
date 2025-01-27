// components/RegisterForm.tsx
"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function RegisterForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const { register } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		try {
			await register(username, password);
		} catch (err) {
			setError(err as string);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Register</CardTitle>
				<CardDescription>Create a new account to get started.</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							type="text"
							placeholder="Choose a username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="Choose a password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{error && <p className="text-sm text-red-500">{error}</p>}
				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Registering..." : "Register"}
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
