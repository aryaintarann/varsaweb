import Link from "next/link";
import { getFaqs, deleteFaq } from "@/actions/settings-actions";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "../services/delete-button";

export default async function FaqPage() {
    const faqs = await getFaqs();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">FAQ</h1>
                <Button asChild>
                    <Link href="/admin/faq/create">
                        <Plus className="w-4 h-4 mr-2" /> Add FAQ
                    </Link>
                </Button>
            </div>

            <div className="border rounded-xl overflow-hidden bg-background">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground w-12">Order</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Question</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Answer</th>
                            <th className="text-right px-6 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {faqs.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                    No FAQs found. Create your first FAQ.
                                </td>
                            </tr>
                        ) : (
                            faqs.map((faq) => (
                                <tr key={faq.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4 text-muted-foreground">{faq.order}</td>
                                    <td className="px-6 py-4 font-medium">{faq.question}</td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground max-w-sm truncate">
                                        {faq.answer}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/faq/${faq.id}/edit`}>
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <DeleteButton id={faq.id} onDelete={deleteFaq} />
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
