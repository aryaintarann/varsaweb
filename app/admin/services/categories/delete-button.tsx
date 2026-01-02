"use client";

import { deleteServiceCategory } from "@/actions/admin-actions";
import { toast } from "sonner";

export function DeleteCategoryButton({ id }: { id: string }) {
    async function handleDelete() {
        if (!confirm("Yakin ingin menghapus kategori ini? Service dalam kategori ini akan menjadi tidak berkategori.")) return;

        const result = await deleteServiceCategory(id);
        if (result.success) {
            toast.success("Kategori berhasil dihapus");
        } else {
            toast.error(result.error || "Gagal menghapus kategori");
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 font-medium"
        >
            Hapus
        </button>
    );
}
