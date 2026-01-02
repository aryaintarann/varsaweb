"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ============ SERVICE CATEGORIES ============

export async function getServiceCategories() {
    try {
        return await prisma.serviceCategory.findMany({
            orderBy: { order: "asc" },
            include: { services: true },
        });
    } catch {
        return [];
    }
}

export async function getServiceCategoryById(id: string) {
    try {
        return await prisma.serviceCategory.findUnique({
            where: { id },
            include: { services: true },
        });
    } catch {
        return null;
    }
}

export async function createServiceCategory(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const order = parseInt(formData.get("order") as string) || 0;

        await prisma.serviceCategory.create({
            data: { name, order },
        });

        revalidatePath("/admin/services/categories");
        revalidatePath("/admin/services");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to create category" };
    }
}

export async function updateServiceCategory(id: string, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const order = parseInt(formData.get("order") as string) || 0;

        await prisma.serviceCategory.update({
            where: { id },
            data: { name, order },
        });

        revalidatePath("/admin/services/categories");
        revalidatePath("/admin/services");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update category" };
    }
}

export async function deleteServiceCategory(id: string) {
    try {
        await prisma.serviceCategory.delete({ where: { id } });
        revalidatePath("/admin/services/categories");
        revalidatePath("/admin/services");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete category" };
    }
}

// ============ SERVICES ============

export async function getServices() {
    try {
        return await prisma.service.findMany({
            orderBy: { order: "asc" },
            include: { category: true },
        });
    } catch {
        return [];
    }
}

export async function getServiceById(id: string) {
    try {
        return await prisma.service.findUnique({
            where: { id },
            include: { category: true },
        });
    } catch {
        return null;
    }
}

export async function createService(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const icon = formData.get("icon") as string;
        const categoryId = formData.get("categoryId") as string || null;
        const order = parseInt(formData.get("order") as string) || 0;

        await prisma.service.create({
            data: { title, description, icon, categoryId, order },
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
        const categoryId = formData.get("categoryId") as string || null;
        const order = parseInt(formData.get("order") as string) || 0;

        await prisma.service.update({
            where: { id },
            data: { title, description, icon, categoryId, order },
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
        const category = (formData.get("category") as string) || "Project";
        const imageUrl = formData.get("imageUrl") as string;
        const link = formData.get("link") as string;

        await prisma.portfolioItem.create({
            data: { title, description, category, imageUrl, link },
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
        const category = (formData.get("category") as string) || "Project";
        const imageUrl = formData.get("imageUrl") as string;
        const link = formData.get("link") as string;

        await prisma.portfolioItem.update({
            where: { id },
            data: { title, description, category, imageUrl, link },
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
