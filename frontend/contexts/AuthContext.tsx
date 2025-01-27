"use client";

import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import api from "@/utils/api";

interface User {
	username: string;
}

interface AuthContextType {
	user: User | null;
	login: (username: string, password: string) => Promise<void>;
	register: (username: string, password: string) => Promise<void>;
	logout: () => void;
	destroyAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const accessToken = Cookies.get("access_token");
		const username = Cookies.get("username");
		if (accessToken) {
			// You might want to validate the token here
			setUser({ username: username ? username : "User" }); // Replace with actual username if available
		}
	}, []);

	const login = async (username: string, password: string) => {
		try {
			const response = await api.post("http://localhost:8000/token/", { username, password });
			Cookies.set("access_token", response.data.access);
			Cookies.set("username", username);
			Cookies.set("refresh_token", response.data.refresh);
			setUser({ username });
		} catch (error: any) {
			console.log(error.response.data);

			if (error.response?.data) {
				if (error.response.data.detail) {
					throw error.response.data.detail;
				}

				// If it's a username error
				if (error.response.data.username) {
					throw error.response.data.username[0];
				}
				// If it's a password error
				if (error.response.data.password) {
					throw error.response.data.password[0];
				}
			}
			// Fallback error message
			throw "Login failed. Please try again.";
		}
	};

	const register = async (username: string, password: string) => {
		try {
			await api.post("http://localhost:8000/user/create/", { username, password });
			await login(username, password);
		} catch (error: any) {
			console.log(error.response.data);

			if (error.response?.data) {
				// If it's a username error
				if (error.response.data.username) {
					throw error.response.data.username[0];
				}
				// If it's a password error
				if (error.response.data.password) {
					throw error.response.data.password[0];
				}
			}
			// Fallback error message
			throw "Registration failed. Please try again.";
		}
	};

	const logout = () => {
		Cookies.remove("access_token");
		Cookies.remove("refresh_token");
		setUser(null);
	};

	const destroyAccount = async () => {
		try {
			await api.delete("http://localhost:8000/user/destroy/");
			logout();
		} catch (error) {
			console.error("Failed to delete account:", error);
		}
	};

	return <AuthContext.Provider value={{ user, login, register, logout, destroyAccount }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
