"use server";

import { prisma } from "@/lib/prisma";
import { sendNewReviewNotification } from "@/lib/notifications";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const reviewSchema = z.object({
    name: z.string().min(1),
    company: z.string().optional(),
    rating: z.number().min(1).max(5),
    message: z.string().min(1),
});

export async function submitReview(formData: FormData) {
    const ratingStr = formData.get("rating") as string;
    const rating = ratingStr ? parseInt(ratingStr, 10) : 0;

    const data = {
        name: formData.get("name") as string,
        company: (formData.get("company") as string) || undefined,
        rating: isNaN(rating) ? 0 : rating,
        message: formData.get("message") as string,
    };

    console.log("Review data received:", data);

    const validated = reviewSchema.safeParse(data);

    if (!validated.success) {
        console.error("Validation errors:", JSON.stringify(validated.error.issues, null, 2));
        return { success: false, error: "Invalid input. Please check your details." };
    }

    try {
        await prisma.review.create({
            data: {
                ...validated.data,
                approved: false,
            },
        });

        // Send notifications to admin (runs in background, doesn't block response)
        sendNewReviewNotification({
            name: validated.data.name,
            company: validated.data.company,
            rating: validated.data.rating,
            message: validated.data.message,
        }).catch(console.error);

        revalidatePath("/review");
        revalidatePath("/");
        return { success: true, message: "Thank you for your review!" };
    } catch (e) {
        console.error(e);
        return { success: false, error: "Failed to submit review. Please try again." };
    }
}

export async function getApprovedReviews() {
    try {
        return await prisma.review.findMany({
            where: { approved: true },
            orderBy: { createdAt: "desc" },
        });
    } catch {
        return [];
    }
}

export async function getAllReviews() {
    try {
        return await prisma.review.findMany({
            orderBy: { createdAt: "desc" },
        });
    } catch {
        return [];
    }
}

export async function approveReview(id: string) {
    try {
        await prisma.review.update({
            where: { id },
            data: { approved: true },
        });
        revalidatePath("/admin/reviews");
        revalidatePath("/");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to approve review" };
    }
}

export async function deleteReview(id: string) {
    try {
        await prisma.review.delete({ where: { id } });
        revalidatePath("/admin/reviews");
        revalidatePath("/");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to delete review" };
    }
}

export async function getSatisfactionPercentage() {
    try {
        const reviews = await prisma.review.findMany({
            where: { approved: true },
            select: { rating: true },
        });

        if (reviews.length === 0) return 0;

        const totalRating = reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0);
        const maxPossible = reviews.length * 5;
        const percentage = Math.round((totalRating / maxPossible) * 100);

        return percentage;
    } catch {
        return 0;
    }
}
