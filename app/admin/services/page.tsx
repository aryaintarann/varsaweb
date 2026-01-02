import Link from "next/link";
import { getServices, deleteService } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DeleteButton } from "./delete-button";

export default async function ServicesPage() {
    const services = await getServices();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Services</h1>
                <div className="flex gap-3">
                    <Button variant="outline" asChild>
                        <Link href="/admin/services/categories">
                            Kelola Kategori
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/admin/services/create">
                            <Plus className="w-4 h-4 mr-2" /> Add Service
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="border rounded-xl overflow-hidden bg-background">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Title</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Icon</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Description</th>
                            <th className="text-right px-6 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {services.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                    No services found. Create your first service.
                                </td>
                            </tr>
                        ) : (
                            services.map((service) => (
                                <tr key={service.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4 font-medium">{service.title}</td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        <code className="px-2 py-1 bg-muted rounded text-xs">{service.icon}</code>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                                        {service.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/services/${service.id}/edit`}>
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <DeleteButton id={service.id} onDelete={deleteService} />
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
