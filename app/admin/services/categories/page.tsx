import { getServiceCategories } from "@/actions/admin-actions";
import Link from "next/link";
import { DeleteCategoryButton } from "./delete-button";

export default async function ServiceCategoriesPage() {
    const categories = await getServiceCategories();

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kategori Service</h1>
                    <p className="text-gray-600">Kelola kategori untuk mengorganisir layanan Anda</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/admin/services"
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                    >
                        ← Kembali ke Services
                    </Link>
                    <Link
                        href="/admin/services/categories/new"
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
                    >
                        + Tambah Kategori
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Urutan
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nama Kategori
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Jumlah Service
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    Belum ada kategori. Klik "Tambah Kategori" untuk membuat.
                                </td>
                            </tr>
                        ) : (
                            categories.map((category: { id: string; name: string; order: number; services: { id: string }[] }) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {category.order}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-medium text-gray-900">{category.name}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {category.services.length} service
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        <Link
                                            href={`/admin/services/categories/${category.id}`}
                                            className="text-teal-600 hover:text-teal-900"
                                        >
                                            Edit
                                        </Link>
                                        <DeleteCategoryButton id={category.id} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
