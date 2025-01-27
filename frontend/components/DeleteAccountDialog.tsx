"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";

export default function DeleteAccountDialog() {
	const [isOpen, setIsOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { destroyAccount } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			await destroyAccount();
			setIsOpen(false);
		} catch (error) {
			console.error("Failed to delete account:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="text-black" variant="destructive">
					Delete Account
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Are you sure you want to delete your account?</DialogTitle>
					<DialogDescription>This process is not reversible.</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<DialogFooter>
						<Button type="submit" variant={"destructive"} disabled={isSubmitting}>
							{isSubmitting ? "Deleting..." : "Delete Account"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
