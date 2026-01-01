"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ============ PRICING PLANS ============

export async function getPricingPlans() {
    try {
        return await prisma.pricingPlan.findMany({
            orderBy: { order: "asc" },
        });
    } catch {
        return [];
    }
}

export async function getPricingPlanById(id: string) {
    try {
        return await prisma.pricingPlan.findUnique({ where: { id } });
    } catch {
        return null;
    }
}

export async function createPricingPlan(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = parseFloat(formData.get("price") as string);
        const discountPriceRaw = formData.get("discountPrice") as string;
        const discountPrice = discountPriceRaw ? parseFloat(discountPriceRaw) : null;
        const discountLabel = formData.get("discountLabel") as string || null;
        const discountTerms = formData.get("discountTerms") as string || null;
        const features = formData.get("features") as string; // JSON string
        const isPopular = formData.get("isPopular") === "true";
        const order = parseInt(formData.get("order") as string) || 0;

        await prisma.pricingPlan.create({
            data: {
                name,
                description,
                price,
                discountPrice,
                discountLabel,
                discountTerms,
                features,
                isPopular,
                order,
            },
        });

        revalidatePath("/admin/pricing");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to create pricing plan:", error);
        return { success: false, error: "Failed to create pricing plan" };
    }
}

export async function updatePricingPlan(id: string, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = parseFloat(formData.get("price") as string);
        const discountPriceRaw = formData.get("discountPrice") as string;
        const discountPrice = discountPriceRaw ? parseFloat(discountPriceRaw) : null;
        const discountLabel = formData.get("discountLabel") as string || null;
        const discountTerms = formData.get("discountTerms") as string || null;
        const features = formData.get("features") as string; // JSON string
        const isPopular = formData.get("isPopular") === "true";
        const order = parseInt(formData.get("order") as string) || 0;

        await prisma.pricingPlan.update({
            where: { id },
            data: {
                name,
                description,
                price,
                discountPrice,
                discountLabel,
                discountTerms,
                features,
                isPopular,
                order,
            },
        });

        revalidatePath("/admin/pricing");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to update pricing plan:", error);
        return { success: false, error: "Failed to update pricing plan" };
    }
}

export async function deletePricingPlan(id: string) {
    try {
        await prisma.pricingPlan.delete({ where: { id } });
        revalidatePath("/admin/pricing");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete pricing plan:", error);
        return { success: false, error: "Failed to delete pricing plan" };
    }
}
