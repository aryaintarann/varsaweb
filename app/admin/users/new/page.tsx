"use client";

import { createUser } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewUserPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await createUser(formData);

        if (result.success) {
            router.push("/admin/users");
        } else {
            alert(result.error || "Gagal membuat user");
        }
        setLoading(false);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/users">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Tambah User Baru</h1>
                    <p className="text-muted-foreground">Buat akun admin atau owner baru</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-lg space-y-6 bg-background rounded-xl border p-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Nama</label>
                    <Input
                        name="name"
                        placeholder="Nama lengkap"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Minimal 6 karakter"
                        minLength={6}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <select
                        name="role"
                        className="w-full h-10 px-3 rounded-md border bg-background text-sm"
                        defaultValue="ADMIN"
                        required
                    >
                        <option value="ADMIN">Admin</option>
                        <option value="OWNER">Owner</option>
                    </select>
                    <p className="text-xs text-muted-foreground">
                        Owner memiliki akses penuh termasuk user management. Admin tidak dapat mengakses user management.
                    </p>
                </div>

                <div className="flex gap-3 pt-4">
                    <Button type="submit" disabled={loading} className="gap-2">
                        <Save className="w-4 h-4" />
                        {loading ? "Menyimpan..." : "Simpan"}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href="/admin/users">Batal</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
