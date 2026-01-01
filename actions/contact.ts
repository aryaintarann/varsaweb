"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8).optional(),
    service: z.string().optional(),
    preferredContact: z.string().optional(),
    message: z.string().min(10),
});

export async function submitContact(formData: FormData) {
    const rawvPhone = formData.get("phone") as string;

    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        // Convert empty string to undefined so validaton passes for optional fields (if logic allowed) 
        // OR simply ensure we pass the string if it's there. 
        // Note: phone is required in UI, but if it has min(8), "" fails.
        phone: rawvPhone === "" ? undefined : rawvPhone,
        service: (formData.get("service") as string) || undefined,
        preferredContact: (formData.get("preferredContact") as string) || undefined,
        message: formData.get("message") as string,
    };

    const validated = contactSchema.safeParse(data);

    if (!validated.success) {
        console.error("Contact Validation Error:", validated.error.flatten());
        return { success: false, error: "Invalid input. Please check your details." };
    }

    try {
        await prisma.contactSubmission.create({
            data: validated.data,
        });
        return { success: true, message: "Message sent successfully!" };
    } catch (e) {
        console.error("Database Error:", e);
        return { success: false, error: "Failed to send message. Please try again." };
    }
}
