import Link from "next/link";
import { getPortfolioItems, deletePortfolioItem } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import Image from "next/image";
import { DeleteButton } from "../services/delete-button";

export default async function PortfolioPage() {
    const items = await getPortfolioItems();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
                <Button asChild>
                    <Link href="/admin/portfolio/create">
                        <Plus className="w-4 h-4 mr-2" /> Add Item
                    </Link>
                </Button>
            </div>

            {items.length === 0 ? (
                <div className="border rounded-xl p-12 text-center bg-background">
                    <p className="text-muted-foreground mb-4">No portfolio items found.</p>
                    <Button asChild>
                        <Link href="/admin/portfolio/create">Create your first item</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="border rounded-xl overflow-hidden bg-background group">
                            <div className="aspect-video relative bg-muted">
                                {item.imageUrl ? (
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold mb-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                    {item.description}
                                </p>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/portfolio/${item.id}/edit`}>
                                            <Pencil className="w-4 h-4 mr-1" /> Edit
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/portfolio/${item.id}`} target="_blank">
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                    <DeleteButton id={item.id} onDelete={deletePortfolioItem} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
