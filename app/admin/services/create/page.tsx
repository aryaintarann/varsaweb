import { getServiceCategories } from "@/actions/admin-actions";
import { CreateServiceForm } from "./create-form";

export default async function CreateServicePage() {
    const categories = await getServiceCategories();

    return (
        <div className="space-y-6 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight">Create Service</h1>
            <CreateServiceForm categories={categories} />
        </div>
    );
}
