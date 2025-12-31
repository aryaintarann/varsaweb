import { getPortfolioItemById } from "@/actions/admin-actions";
import { notFound } from "next/navigation";
import { EditPortfolioForm } from "./edit-form";

export default async function EditPortfolioPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const item = await getPortfolioItemById(id);

    if (!item) {
        notFound();
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight">Edit Portfolio Item</h1>
            <EditPortfolioForm item={item} />
        </div>
    );
}
