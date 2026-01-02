import { getServiceCategoryById } from "@/actions/admin-actions";
import { notFound } from "next/navigation";
import { EditCategoryForm } from "./edit-form";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const category = await getServiceCategoryById(id);

    if (!category) {
        notFound();
    }

    return (
        <div className="p-6 max-w-xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Kategori</h1>
            <EditCategoryForm category={category} />
        </div>
    );
}
