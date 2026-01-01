"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, X } from "lucide-react";
import { createPricingPlan } from "@/actions/pricing-actions";

export default function NewPricingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [features, setFeatures] = useState<string[]>([""]);

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
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.set("features", JSON.stringify(features.filter(f => f.trim())));

        const result = await createPricingPlan(formData);
        if (result.success) {
            router.push("/admin/pricing");
        } else {
            alert(result.error);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/pricing">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Add Pricing Plan</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 border rounded-xl p-6 bg-background">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Plan Name</Label>
                        <Input id="name" name="name" placeholder="e.g. Landing Page" required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" placeholder="Brief description of the plan" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price (IDR)</Label>
                            <Input id="price" name="price" type="number" placeholder="1500000" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="discountPrice">Discount Price (IDR)</Label>
                            <Input id="discountPrice" name="discountPrice" type="number" placeholder="Optional" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="discountLabel">Discount Label</Label>
                            <Input id="discountLabel" name="discountLabel" placeholder="e.g. Hemat 20%" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="order">Order</Label>
                            <Input id="order" name="order" type="number" defaultValue={0} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="discountTerms">Discount Terms (S&K)</Label>
                        <Textarea
                            id="discountTerms"
                            name="discountTerms"
                            placeholder="Syarat dan ketentuan diskon (opsional)"
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
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <Label htmlFor="isPopular" className="font-normal">Mark as Popular</Label>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Plan"}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href="/admin/pricing">Cancel</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
