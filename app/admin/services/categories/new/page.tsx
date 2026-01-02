"use client";

import { createServiceCategory } from "@/actions/admin-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function NewCategoryPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await createServiceCategory(formData);

        setLoading(false);

        if (result.success) {
            toast.success("Kategori berhasil dibuat");
            router.push("/admin/services/categories");
        } else {
            toast.error(result.error || "Gagal membuat kategori");
        }
    }

    return (
        <div className="p-6 max-w-xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Tambah Kategori Baru</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Kategori
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Contoh: Web Development"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Urutan Tampil
                    </label>
                    <input
                        type="number"
                        name="order"
                        defaultValue={0}
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
                        {loading ? "Menyimpan..." : "Simpan Kategori"}
                    </button>
                </div>
            </form>
        </div>
    );
}
