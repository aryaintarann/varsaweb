"use server";

import nodemailer from "nodemailer";
import { prisma } from "./prisma";

// Types for notification data
interface ReviewNotificationData {
    name: string;
    company?: string;
    rating: number;
    message: string;
}

interface ContactNotificationData {
    name: string;
    email: string;
    phone?: string;
    service?: string;
    message: string;
}

// Get notification settings from database
async function getNotificationSettings() {
    try {
        // Get site settings for notification toggles and Discord webhook
        const settings = await prisma.siteSettings.findUnique({
            where: { id: "main" },
            select: {
                discordWebhookUrl: true,
                emailNotifications: true,
                discordNotifications: true,
            },
        });

        // Get all admin user emails
        const adminUsers = await prisma.user.findMany({
            select: { email: true },
        });

        const adminEmails = adminUsers.map(u => u.email);

        return {
            ...settings,
            adminEmails, // Array of admin emails
        };
    } catch (error) {
        console.error("Error getting notification settings:", error);
        return null;
    }
}

// Create nodemailer transporter
function createEmailTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

// Send email notification
async function sendEmail(to: string, subject: string, html: string) {
    try {
        const transporter = createEmailTransporter();

        await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to,
            subject,
            html,
        });

        console.log(`✅ Email sent to ${to}`);
        return true;
    } catch (error) {
        console.error("❌ Email sending failed:", error);
        return false;
    }
}

// Send Discord webhook notification
async function sendDiscordWebhook(webhookUrl: string, embed: object) {
    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                embeds: [embed],
            }),
        });

        if (!response.ok) {
            throw new Error(`Discord webhook failed: ${response.status}`);
        }

        console.log("✅ Discord notification sent");
        return true;
    } catch (error) {
        console.error("❌ Discord notification failed:", error);
        return false;
    }
}

// ============ PUBLIC NOTIFICATION FUNCTIONS ============

/**
 * Send notification when a new review is submitted
 */
export async function sendNewReviewNotification(data: ReviewNotificationData) {
    const settings = await getNotificationSettings();
    if (!settings) return;

    const { name, company, rating, message } = data;
    const stars = "⭐".repeat(rating);
    const timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

    // Send email notification to all admin users
    if (settings.emailNotifications && settings.adminEmails.length > 0) {
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #006666, #004444); padding: 20px; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">📝 Review Baru!</h1>
                </div>
                <div style="background: #f9f9f9; padding: 20px; border: 1px solid #ddd;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Nama:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
                        </tr>
                        ${company ? `
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Perusahaan:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${company}</td>
                        </tr>
                        ` : ""}
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Rating:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${stars} (${rating}/5)</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Waktu:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${timestamp}</td>
                        </tr>
                    </table>
                    <div style="margin-top: 15px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #006666;">
                        <strong>Pesan:</strong>
                        <p style="margin: 10px 0 0 0; color: #333;">${message}</p>
                    </div>
                </div>
                <div style="background: #006666; color: white; padding: 15px; text-align: center; border-radius: 0 0 10px 10px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/reviews" style="color: #80FFFF; text-decoration: none;">
                        👉 Lihat di Admin Panel
                    </a>
                </div>
            </div>
        `;

        // Send to all admin emails
        for (const adminEmail of settings.adminEmails) {
            await sendEmail(
                adminEmail,
                `📝 Review Baru dari ${name} - ${stars}`,
                emailHtml
            );
        }
    }

    // Send Discord notification
    if (settings.discordNotifications && settings.discordWebhookUrl) {
        const discordEmbed = {
            title: "📝 Review Baru!",
            color: 0x006666,
            fields: [
                { name: "👤 Nama", value: name, inline: true },
                ...(company ? [{ name: "🏢 Perusahaan", value: company, inline: true }] : []),
                { name: "⭐ Rating", value: `${stars} (${rating}/5)`, inline: true },
                { name: "💬 Pesan", value: message.length > 1024 ? message.substring(0, 1021) + "..." : message },
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: "VarsaWeb Notification",
            },
        };

        await sendDiscordWebhook(settings.discordWebhookUrl, discordEmbed);
    }
}

/**
 * Send notification when a new contact submission is received
 */
export async function sendNewContactNotification(data: ContactNotificationData) {
    const settings = await getNotificationSettings();
    if (!settings) return;

    const { name, email, phone, service, message } = data;
    const timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

    // Send email notification to all admin users
    if (settings.emailNotifications && settings.adminEmails.length > 0) {
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #006666, #004444); padding: 20px; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">📬 Pesan Baru Masuk!</h1>
                </div>
                <div style="background: #f9f9f9; padding: 20px; border: 1px solid #ddd;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Nama:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">
                                <a href="mailto:${email}" style="color: #006666;">${email}</a>
                            </td>
                        </tr>
                        ${phone ? `
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Telepon:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">
                                <a href="tel:${phone}" style="color: #006666;">${phone}</a>
                            </td>
                        </tr>
                        ` : ""}
                        ${service ? `
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Layanan:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${service}</td>
                        </tr>
                        ` : ""}
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Waktu:</strong></td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${timestamp}</td>
                        </tr>
                    </table>
                    <div style="margin-top: 15px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #006666;">
                        <strong>Pesan:</strong>
                        <p style="margin: 10px 0 0 0; color: #333;">${message}</p>
                    </div>
                </div>
                <div style="background: #006666; color: white; padding: 15px; text-align: center; border-radius: 0 0 10px 10px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/inbox" style="color: #80FFFF; text-decoration: none;">
                        👉 Lihat di Admin Panel
                    </a>
                </div>
            </div>
        `;

        // Send to all admin emails
        for (const adminEmail of settings.adminEmails) {
            await sendEmail(
                adminEmail,
                `📬 Pesan Baru dari ${name}`,
                emailHtml
            );
        }
    }

    // Send Discord notification
    if (settings.discordNotifications && settings.discordWebhookUrl) {
        const discordEmbed = {
            title: "📬 Pesan Baru Masuk!",
            color: 0x00AA00,
            fields: [
                { name: "👤 Nama", value: name, inline: true },
                { name: "📧 Email", value: email, inline: true },
                ...(phone ? [{ name: "📱 Telepon", value: phone, inline: true }] : []),
                ...(service ? [{ name: "🛠️ Layanan", value: service, inline: true }] : []),
                { name: "💬 Pesan", value: message.length > 1024 ? message.substring(0, 1021) + "..." : message },
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: "VarsaWeb Notification",
            },
        };

        await sendDiscordWebhook(settings.discordWebhookUrl, discordEmbed);
    }
}
