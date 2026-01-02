"use client";

import { updateServiceCategory } from "@/actions/admin-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Category {
    id: string;
    name: string;
    order: number;
}

export function EditCategoryForm({ category }: { category: Category }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await updateServiceCategory(category.id, formData);

        setLoading(false);

        if (result.success) {
            toast.success("Kategori berhasil diperbarui");
            router.push("/admin/services/categories");
        } else {
            toast.error(result.error || "Gagal memperbarui kategori");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Kategori
                </label>
                <input
                    type="text"
                    name="name"
                    required
                    defaultValue={category.name}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urutan Tampil
                </label>
                <input
                    type="number"
                    name="order"
                    defaultValue={category.order}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <p className="text-xs text-gray-500 mt-1">Angka lebih kecil ditampilkan lebih dulu</p>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
                >
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
            </div>
        </form>
    );
}
