"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Schema for user creation
const createUserSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["OWNER", "ADMIN"]),
});

// Schema for user update
const updateUserSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6).optional().or(z.literal("")),
    role: z.enum(["OWNER", "ADMIN"]),
});

// Check if current user is owner
async function isOwner() {
    const session = await auth();
    return session?.user?.role === "OWNER";
}

// Get all users
export async function getUsers() {
    if (!(await isOwner())) {
        return [];
    }

    try {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        });
    } catch {
        return [];
    }
}

// Get user by ID
export async function getUserById(id: string) {
    if (!(await isOwner())) {
        return null;
    }

    try {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
    } catch {
        return null;
    }
}

// Create new user
export async function createUser(formData: FormData) {
    if (!(await isOwner())) {
        return { success: false, error: "Unauthorized" };
    }

    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        role: formData.get("role") as "OWNER" | "ADMIN",
    };

    const validated = createUserSchema.safeParse(data);

    if (!validated.success) {
        return { success: false, error: "Invalid input. Please check your details." };
    }

    try {
        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validated.data.email },
        });

        if (existingUser) {
            return { success: false, error: "Email already exists" };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(validated.data.password, 10);

        await prisma.user.create({
            data: {
                name: validated.data.name,
                email: validated.data.email,
                password: hashedPassword,
                role: validated.data.role,
            },
        });

        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Create user error:", error);
        return { success: false, error: "Failed to create user" };
    }
}

// Update user
export async function updateUser(id: string, formData: FormData) {
    if (!(await isOwner())) {
        return { success: false, error: "Unauthorized" };
    }

    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string || "",
        role: formData.get("role") as "OWNER" | "ADMIN",
    };

    const validated = updateUserSchema.safeParse(data);

    if (!validated.success) {
        return { success: false, error: "Invalid input. Please check your details." };
    }

    try {
        // Check if email exists for other user
        const existingUser = await prisma.user.findFirst({
            where: {
                email: validated.data.email,
                NOT: { id },
            },
        });

        if (existingUser) {
            return { success: false, error: "Email already used by another user" };
        }

        // Prepare update data
        const updateData: {
            name: string;
            email: string;
            role: "OWNER" | "ADMIN";
            password?: string;
        } = {
            name: validated.data.name,
            email: validated.data.email,
            role: validated.data.role,
        };

        // Only update password if provided
        if (validated.data.password && validated.data.password.length >= 6) {
            updateData.password = await bcrypt.hash(validated.data.password, 10);
        }

        await prisma.user.update({
            where: { id },
            data: updateData,
        });

        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Update user error:", error);
        return { success: false, error: "Failed to update user" };
    }
}

// Delete user
export async function deleteUser(id: string) {
    if (!(await isOwner())) {
        return { success: false, error: "Unauthorized" };
    }

    // Get current session to prevent self-deletion
    const session = await auth();
    if (session?.user?.id === id) {
        return { success: false, error: "You cannot delete your own account" };
    }

    try {
        await prisma.user.delete({ where: { id } });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Delete user error:", error);
        return { success: false, error: "Failed to delete user" };
    }
}

// Set user as owner (for migration purpose)
export async function setUserAsOwner(email: string) {
    try {
        await prisma.user.update({
            where: { email },
            data: { role: "OWNER" },
        });
        return { success: true };
    } catch (error) {
        console.error("Set owner error:", error);
        return { success: false, error: "Failed to set user as owner" };
    }
}
