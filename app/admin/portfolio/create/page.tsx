"use client";

import { createPortfolioItem } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePortfolioPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await createPortfolioItem(formData);

        if (result.success) {
            router.push("/admin/portfolio");
        } else {
            alert(result.error);
        }
        setLoading(false);
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/portfolio">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Add Portfolio Item</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 border rounded-xl p-6 bg-background">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input name="title" placeholder="Project Name" required />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea name="description" placeholder="Describe this project..." rows={4} required />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Image URL</label>
                    <Input name="imageUrl" placeholder="https://example.com/image.jpg" />
                    <p className="text-xs text-muted-foreground">
                        Enter a URL to an image for this portfolio item.
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Project Link</label>
                    <Input name="link" placeholder="https://example.com" />
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={loading}>
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? "Saving..." : "Save Item"}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href="/admin/portfolio">Cancel</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
