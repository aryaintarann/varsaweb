import { getServiceById, getServiceCategories } from "@/actions/admin-actions";
import { notFound } from "next/navigation";
import { EditServiceForm } from "./edit-form";

export default async function EditServicePage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const [service, categories] = await Promise.all([
        getServiceById(id),
        getServiceCategories()
    ]);

    if (!service) {
        notFound();
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight">Edit Service</h1>
            <EditServiceForm service={service} categories={categories} />
        </div>
    );
}
