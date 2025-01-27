"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export interface TestModel {
	id: number;
	title: string;
	description: string;
}

interface TestModelItemProps {
	item: TestModel;
	onDelete: (id: number) => Promise<void>;
}

export default function TestModelItem({ item, onDelete }: TestModelItemProps) {
	"use client";
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		setIsDeleting(true);
		await onDelete(item.id);
		setIsDeleting(false);
	};

	return (
		// have the delete button all the way to the right and at the top of the item
		<div className="flex flex-row justify-between items-start w-full">
			<div className="flex flex-col">
				<h1 className="font-bold text-2xl">{item.title}</h1>
				<p>{item.description}</p>
			</div>
			<Button onClick={handleDelete} disabled={isDeleting} variant={"ghost"} className="mt-4">
				{isDeleting ? (
					<>
						<Loader2 className="animate-spin" size={16} />
						Deleting...
					</>
				) : (
					"Delete"
				)}
			</Button>
		</div>
	);
}
