import { getFaqById } from "@/actions/settings-actions";
import { notFound } from "next/navigation";
import { EditFaqForm } from "./edit-form";

export default async function EditFaqPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const faq = await getFaqById(id);

    if (!faq) {
        notFound();
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight">Edit FAQ</h1>
            <EditFaqForm faq={faq} />
        </div>
    );
}
