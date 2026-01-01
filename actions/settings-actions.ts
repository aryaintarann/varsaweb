"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ============ SITE SETTINGS ============

export async function getSiteSettings() {
    try {
        let settings = await prisma.siteSettings.findUnique({
            where: { id: "main" },
        });

        // Create default settings if not exists
        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: { id: "main" },
            });
        }

        return settings;
    } catch {
        return null;
    }
}

export async function updateSiteSettings(formData: FormData) {
    try {
        const data: Record<string, string> = {};

        // Get all form fields
        for (const [key, value] of formData.entries()) {
            if (typeof value === "string") {
                data[key] = value;
            }
        }

        await prisma.siteSettings.upsert({
            where: { id: "main" },
            update: data,
            create: { id: "main", ...data },
        });

        revalidatePath("/");
        revalidatePath("/admin/settings");
        return { success: true };
    } catch (error) {
        console.error("Update settings error:", error);
        return { success: false, error: "Failed to update settings" };
    }
}

// ============ FAQ ============

export async function getFaqs() {
    try {
        return await prisma.faq.findMany({
            orderBy: { order: "asc" },
        });
    } catch {
        return [];
    }
}

export async function getFaqById(id: string) {
    try {
        return await prisma.faq.findUnique({ where: { id } });
    } catch {
        return null;
    }
}

export async function createFaq(formData: FormData) {
    try {
        const question = formData.get("question") as string;
        const answer = formData.get("answer") as string;
        const order = parseInt(formData.get("order") as string) || 0;

        await prisma.faq.create({
            data: { question, answer, order },
        });

        revalidatePath("/admin/faq");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to create FAQ" };
    }
}

export async function updateFaq(id: string, formData: FormData) {
    try {
        const question = formData.get("question") as string;
        const answer = formData.get("answer") as string;
        const order = parseInt(formData.get("order") as string) || 0;

        await prisma.faq.update({
            where: { id },
            data: { question, answer, order },
        });

        revalidatePath("/admin/faq");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update FAQ" };
    }
}

export async function deleteFaq(id: string) {
    try {
        await prisma.faq.delete({ where: { id } });
        revalidatePath("/admin/faq");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete FAQ" };
    }
}
