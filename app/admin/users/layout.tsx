import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function UsersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // Only owners can access user management
    if (session?.user?.role !== "OWNER") {
        redirect("/admin");
    }

    return <>{children}</>;
}
