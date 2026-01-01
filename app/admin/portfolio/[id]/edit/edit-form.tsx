"use client";

import { updatePortfolioItem } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string | null;
    link: string | null;
}

export function EditPortfolioForm({ item }: { item: PortfolioItem }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(item.imageUrl || "");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.set("imageUrl", imageUrl);
        const result = await updatePortfolioItem(item.id, formData);

        if (result.success) {
            router.push("/admin/portfolio");
        } else {
            alert(result.error);
        }
        setLoading(false);
    }

    return (
        <>
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/portfolio">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <span className="text-muted-foreground">Back to Portfolio</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 border rounded-xl p-6 bg-background">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input name="title" defaultValue={item.title} required />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Input name="category" defaultValue={item.category} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea name="description" defaultValue={item.description} rows={4} required />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Project Image</label>
                    <ImageUpload
                        value={imageUrl}
                        onChange={setImageUrl}
                        onRemove={() => setImageUrl("")}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Project Link</label>
                    <Input name="link" defaultValue={item.link || ""} />
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={loading}>
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? "Saving..." : "Update Item"}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href="/admin/portfolio">Cancel</Link>
                    </Button>
                </div>
            </form>
        </>
    );
}
