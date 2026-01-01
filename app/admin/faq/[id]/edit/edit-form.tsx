"use client";

import { updateFaq } from "@/actions/settings-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Faq {
    id: string;
    question: string;
    answer: string;
    order: number;
}

export function EditFaqForm({ faq }: { faq: Faq }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await updateFaq(faq.id, formData);

        if (result.success) {
            router.push("/admin/faq");
        } else {
            alert(result.error);
        }
        setLoading(false);
    }

    return (
        <>
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/faq">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <span className="text-muted-foreground">Back to FAQ</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 border rounded-xl p-6 bg-background">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Question</label>
                    <Input name="question" defaultValue={faq.question} required />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Answer</label>
                    <Textarea name="answer" defaultValue={faq.answer} rows={4} required />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Order</label>
                    <Input name="order" type="number" defaultValue={faq.order} />
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={loading}>
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? "Saving..." : "Update FAQ"}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href="/admin/faq">Cancel</Link>
                    </Button>
                </div>
            </form>
        </>
    );
}
