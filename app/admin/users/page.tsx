import { getUsers } from "@/actions/user-actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Shield, User } from "lucide-react";
import { DeleteUserButton } from "./delete-button";

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className="text-muted-foreground">Kelola akun admin dan owner</p>
                </div>
                <Button asChild>
                    <Link href="/admin/users/new" className="gap-2">
                        <Plus className="w-4 h-4" />
                        Tambah User
                    </Link>
                </Button>
            </div>

            <div className="bg-background rounded-xl border overflow-hidden">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="text-left px-6 py-3 text-sm font-medium">Nama</th>
                            <th className="text-left px-6 py-3 text-sm font-medium">Email</th>
                            <th className="text-left px-6 py-3 text-sm font-medium">Role</th>
                            <th className="text-left px-6 py-3 text-sm font-medium">Dibuat</th>
                            <th className="text-right px-6 py-3 text-sm font-medium">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                    Tidak ada user
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-muted/30">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                {user.role === "OWNER" ? (
                                                    <Shield className="w-4 h-4 text-primary" />
                                                ) : (
                                                    <User className="w-4 h-4 text-muted-foreground" />
                                                )}
                                            </div>
                                            <span className="font-medium">{user.name || "-"}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === "OWNER"
                                                ? "bg-primary/10 text-primary"
                                                : "bg-muted text-muted-foreground"
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {new Date(user.createdAt).toLocaleDateString("id-ID")}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/users/${user.id}`}>
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <DeleteUserButton id={user.id} name={user.name || user.email} />
                                        </div>
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
