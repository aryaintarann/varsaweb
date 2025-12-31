"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ============ SERVICES ============

export async function getServices() {
    try {
        return await prisma.service.findMany({
            orderBy: { createdAt: "desc" },
        });
    } catch {
        return [];
    }
}

export async function getServiceById(id: string) {
    try {
        return await prisma.service.findUnique({ where: { id } });
    } catch {
        return null;
    }
}

export async function createService(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const icon = formData.get("icon") as string;

        await prisma.service.create({
            data: { title, description, icon },
        });

        revalidatePath("/admin/services");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to create service" };
    }
}

export async function updateService(id: string, formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const icon = formData.get("icon") as string;

        await prisma.service.update({
            where: { id },
            data: { title, description, icon },
        });

        revalidatePath("/admin/services");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update service" };
    }
}

export async function deleteService(id: string) {
    try {
        await prisma.service.delete({ where: { id } });
        revalidatePath("/admin/services");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete service" };
    }
}

// ============ PORTFOLIO ============

export async function getPortfolioItems() {
    try {
        return await prisma.portfolioItem.findMany({
            orderBy: { createdAt: "desc" },
        });
    } catch {
        return [];
    }
}

export async function getPortfolioItemById(id: string) {
    try {
        return await prisma.portfolioItem.findUnique({ where: { id } });
    } catch {
        return null;
    }
}

export async function createPortfolioItem(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const imageUrl = formData.get("imageUrl") as string;
        const link = formData.get("link") as string;

        await prisma.portfolioItem.create({
            data: { title, description, imageUrl, link },
        });

        revalidatePath("/admin/portfolio");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to create portfolio item" };
    }
}

export async function updatePortfolioItem(id: string, formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const imageUrl = formData.get("imageUrl") as string;
        const link = formData.get("link") as string;

        await prisma.portfolioItem.update({
            where: { id },
            data: { title, description, imageUrl, link },
        });

        revalidatePath("/admin/portfolio");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update portfolio item" };
    }
}

export async function deletePortfolioItem(id: string) {
    try {
        await prisma.portfolioItem.delete({ where: { id } });
        revalidatePath("/admin/portfolio");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete portfolio item" };
    }
}

// ============ INBOX ============

export async function getContactSubmissions() {
    try {
        return await prisma.contactSubmission.findMany({
            orderBy: { createdAt: "desc" },
        });
    } catch {
        return [];
    }
}

export async function markAsRead(id: string) {
    try {
        await prisma.contactSubmission.update({
            where: { id },
            data: { read: true },
        });
        revalidatePath("/admin/inbox");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to mark as read" };
    }
}

export async function deleteContactSubmission(id: string) {
    try {
        await prisma.contactSubmission.delete({ where: { id } });
        revalidatePath("/admin/inbox");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete submission" };
    }
}

// ============ DASHBOARD STATS ============

export async function getDashboardStats() {
    try {
        const [servicesCount, portfolioCount, unreadCount] = await Promise.all([
            prisma.service.count(),
            prisma.portfolioItem.count(),
            prisma.contactSubmission.count({ where: { read: false } }),
        ]);

        return { servicesCount, portfolioCount, unreadCount };
    } catch {
        return { servicesCount: 0, portfolioCount: 0, unreadCount: 0 };
    }
}
