import Link from "next/link";
import { getPricingPlans, deletePricingPlan } from "@/actions/pricing-actions";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DeleteButton } from "../services/delete-button";

export default async function PricingPage() {
    const plans = await getPricingPlans();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Pricing Plans</h1>
                <Button asChild>
                    <Link href="/admin/pricing/new">
                        <Plus className="w-4 h-4 mr-2" /> Add Plan
                    </Link>
                </Button>
            </div>

            <div className="border rounded-xl overflow-hidden bg-background">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Name</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Price</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Discount</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Popular</th>
                            <th className="text-right px-6 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {plans.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                    No pricing plans found. Create your first plan.
                                </td>
                            </tr>
                        ) : (
                            plans.map((plan) => (
                                <tr key={plan.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium">{plan.name}</div>
                                        <div className="text-xs text-muted-foreground">{plan.description}</div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {formatPrice(plan.price)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {plan.discountPrice ? (
                                            <div>
                                                <span className="text-green-600 font-medium">
                                                    {formatPrice(plan.discountPrice)}
                                                </span>
                                                {plan.discountLabel && (
                                                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                        {plan.discountLabel}
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {plan.isPopular ? (
                                            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                                                Popular
                                            </span>
                                        ) : (
                                            <span className="text-muted-foreground">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/pricing/${plan.id}`}>
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <DeleteButton id={plan.id} onDelete={deletePricingPlan} />
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
