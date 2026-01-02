"use client";

import { createService } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Category {
    id: string;
    name: string;
}

interface CreateServiceFormProps {
    categories: Category[];
}

export function CreateServiceForm({ categories }: CreateServiceFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await createService(formData);

        if (result.success) {
            toast.success("Service berhasil dibuat");
            router.push("/admin/services");
        } else {
            toast.error(result.error || "Gagal membuat service");
        }
        setLoading(false);
    }

    return (
        <>
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/services">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <span className="text-muted-foreground">Back to Services</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 border rounded-xl p-6 bg-background">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input name="title" placeholder="Website Development" required />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Icon (Lucide icon name)</label>
                    <Input name="icon" placeholder="layout" required />
                    <p className="text-xs text-muted-foreground">
                        Use Lucide icon names like: layout, shopping-bag, code-2, globe, etc.
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Kategori</label>
                    <select
                        name="categoryId"
                        className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        <option value="">-- Tanpa Kategori --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <p className="text-xs text-muted-foreground">
                        Service tanpa kategori akan muncul di tab "Semua"
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Urutan</label>
                    <Input name="order" type="number" defaultValue={0} />
                    <p className="text-xs text-muted-foreground">
                        Angka lebih kecil ditampilkan lebih dulu
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea name="description" placeholder="Describe this service..." rows={4} required />
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={loading}>
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? "Saving..." : "Save Service"}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href="/admin/services">Cancel</Link>
                    </Button>
                </div>
            </form>
        </>
    );
}
