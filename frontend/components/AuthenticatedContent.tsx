// components/AuthenticatedContent.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/utils/api";
import TestModelItem from "@/components/TestModelItem";
import { TestModel } from "@/components/TestModelItem";
import AddModelDialog from "@/components/AddModelDialog";
import { Button } from "./ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import DeleteAccountDialog from "./DeleteAccountDialog";

export default function AuthenticatedContent() {
	const [data, setData] = useState<TestModel[]>([]);
	const { logout, destroyAccount } = useAuth();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await api.get("http://localhost:8000/testmodel/");
			setData(response.data);
		} catch (error) {
			console.error("Failed to fetch data:", error);
		}
	};

	const deleteModel = async (id: number) => {
		try {
			await api.delete(`/testmodel/${id}/`);
			fetchData();
		} catch (error) {
			console.error("Failed to delete model:", error);
		}
	};

	const addModel = async (title: string, description: string) => {
		try {
			await api.post("http://localhost:8000/testmodel/", { title, description });
			fetchData();
		} catch (error) {
			console.error("Failed to add model:", error);
		}
	};

	const { user } = useAuth();

	return (
		<div className="flex flex-col items-start py-8 space-y-4 max-w-lg m-auto bg-[rgba(255,255,255,0.2)] text-white p-8 mt-8">
			<h1 className="font-bold text-4xl">Logged in as {user?.username}</h1>
			<div className="flex flex-row justify-between w-full">
				<Button onClick={logout}>Logout</Button>
				<DeleteAccountDialog />
			</div>
			<AddModelDialog addModel={addModel} />
			{data.map((item: TestModel) => (
				<TestModelItem key={item.id} item={item} onDelete={deleteModel} />
			))}
		</div>
	);
}
