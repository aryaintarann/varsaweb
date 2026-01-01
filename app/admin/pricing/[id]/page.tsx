"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import { getPricingPlanById, updatePricingPlan, deletePricingPlan } from "@/actions/pricing-actions";

interface EditPricingPageProps {
    params: Promise<{ id: string }>;
}

export default function EditPricingPage({ params }: EditPricingPageProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [features, setFeatures] = useState<string[]>([""]);
    const [plan, setPlan] = useState<{
        id: string;
        name: string;
        description: string;
        price: number;
        discountPrice: number | null;
        discountLabel: string | null;
        discountTerms: string | null;
        features: string;
        isPopular: boolean;
        order: number;
    } | null>(null);

    useEffect(() => {
        async function fetchPlan() {
            const { id } = await params;
            const data = await getPricingPlanById(id);
            if (data) {
                setPlan(data);
                try {
                    setFeatures(JSON.parse(data.features || "[]"));
                } catch {
                    setFeatures([]);
                }
            }
            setFetching(false);
        }
        fetchPlan();
    }, [params]);

    const addFeature = () => setFeatures([...features, ""]);
    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };
    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!plan) return;
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.set("features", JSON.stringify(features.filter(f => f.trim())));

        const result = await updatePricingPlan(plan.id, formData);
        if (result.success) {
            router.push("/admin/pricing");
        } else {
            alert(result.error);
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!plan) return;
        if (!confirm("Are you sure you want to delete this pricing plan?")) return;
        setDeleting(true);

        const result = await deletePricingPlan(plan.id);
        if (result.success) {
            router.push("/admin/pricing");
        } else {
            alert(result.error);
            setDeleting(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!plan) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold mb-2">Plan not found</h1>
                <p className="text-muted-foreground mb-4">The pricing plan you are looking for does not exist.</p>
                <Button asChild>
                    <Link href="/admin/pricing">Back to Pricing</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/pricing">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Edit Pricing Plan</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 border rounded-xl p-6 bg-background">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Plan Name</Label>
                        <Input id="name" name="name" defaultValue={plan.name} required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" defaultValue={plan.description} required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price (IDR)</Label>
                            <Input id="price" name="price" type="number" defaultValue={plan.price} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="discountPrice">Discount Price (IDR)</Label>
                            <Input id="discountPrice" name="discountPrice" type="number" defaultValue={plan.discountPrice || ""} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="discountLabel">Discount Label</Label>
                            <Input id="discountLabel" name="discountLabel" defaultValue={plan.discountLabel || ""} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="order">Order</Label>
                            <Input id="order" name="order" type="number" defaultValue={plan.order} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="discountTerms">Discount Terms (S&K)</Label>
                        <Textarea
                            id="discountTerms"
                            name="discountTerms"
                            defaultValue={plan.discountTerms || ""}
                            rows={3}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Features</Label>
                        <div className="space-y-2">
                            {features.map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={feature}
                                        onChange={(e) => updateFeature(index, e.target.value)}
                                        placeholder={`Feature ${index + 1}`}
                                    />
                                    {features.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => removeFeature(index)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={addFeature}>
                                <Plus className="w-4 h-4 mr-2" /> Add Feature
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isPopular"
                            name="isPopular"
                            value="true"
                            defaultChecked={plan.isPopular}
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <Label htmlFor="isPopular" className="font-normal">Mark as Popular</Label>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href="/admin/pricing">Cancel</Link>
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="ml-auto"
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
