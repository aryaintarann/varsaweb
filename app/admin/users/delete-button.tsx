"use client";

import { deleteUser } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteUserButton({ id, name }: { id: string; name: string }) {
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        if (!confirm(`Apakah Anda yakin ingin menghapus user "${name}"?`)) {
            return;
        }

        setLoading(true);
        const result = await deleteUser(id);

        if (!result.success) {
            alert(result.error || "Gagal menghapus user");
        }
        setLoading(false);
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
        >
            <Trash2 className="w-4 h-4" />
        </Button>
    );
}
