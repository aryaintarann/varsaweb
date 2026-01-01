"use client";

import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";
import { useTransition } from "react";

interface ButtonProps {
    id: string;
    onMarkRead?: (id: string) => Promise<{ success: boolean; error?: string }>;
    onDelete?: (id: string) => Promise<{ success: boolean; error?: string }>;
}

export function MarkReadButton({ id, onMarkRead }: ButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        if (!onMarkRead) return;
        startTransition(async () => {
            await onMarkRead(id);
        });
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleClick}
            disabled={isPending}
        >
            <Check className="w-4 h-4 mr-1" />
            Mark Read
        </Button>
    );
}

export function DeleteInboxButton({ id, onDelete }: ButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        if (!onDelete) return;
        if (!confirm("Are you sure you want to delete this message?")) return;

        startTransition(async () => {
            await onDelete(id);
        });
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleClick}
            disabled={isPending}
            className="text-destructive hover:text-destructive"
        >
            <Trash2 className="w-4 h-4" />
        </Button>
    );
}
