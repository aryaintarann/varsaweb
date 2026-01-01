"use client";

import { Button } from "@/components/ui/button";
import { Check, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";

export function ApproveButton({
    id,
    onApprove,
}: {
    id: string;
    onApprove: (id: string) => Promise<{ success: boolean; error?: string }>;
}) {
    const [loading, setLoading] = useState(false);

    async function handleApprove() {
        setLoading(true);
        await onApprove(id);
        setLoading(false);
    }

    return (
        <Button variant="outline" size="sm" onClick={handleApprove} disabled={loading} className="gap-1">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            Approve
        </Button>
    );
}

export function DeleteReviewButton({
    id,
    onDelete,
}: {
    id: string;
    onDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
}) {
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this review?")) return;
        setLoading(true);
        await onDelete(id);
        setLoading(false);
    }

    return (
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </Button>
    );
}
