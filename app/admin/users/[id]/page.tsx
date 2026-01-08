import { getUserById } from "@/actions/user-actions";
import { notFound } from "next/navigation";
import { EditUserForm } from "./edit-form";

export default async function EditUserPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const user = await getUserById(id);

    if (!user) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <EditUserForm user={user} />
        </div>
    );
}
