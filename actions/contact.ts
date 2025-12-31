"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
});

export async function submitContact(formData: FormData) {
    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
    };

    const validated = contactSchema.safeParse(data);

    if (!validated.success) {
        return { success: false, error: "Invalid input. Please check your details." };
    }

    try {
        await prisma.contactSubmission.create({
            data: validated.data,
        });
        return { success: true, message: "Message sent successfully!" };
    } catch (e) {
        console.error(e);
        return { success: false, error: "Failed to send message. Please try again." };
    }
}
