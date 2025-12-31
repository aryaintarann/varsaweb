"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

interface DeleteButtonProps {
    id: string;
    onDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
}

export function DeleteButton({ id, onDelete }: DeleteButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        startTransition(async () => {
            await onDelete(id);
        });
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={isPending}
            className="text-destructive hover:text-destructive"
        >
            <Trash2 className="w-4 h-4" />
        </Button>
    );
}
