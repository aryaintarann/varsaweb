import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || "admin@varsaweb.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "VarsaWeb2026!";

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            password: hashedPassword,
        },
        create: {
            email: adminEmail,
            password: hashedPassword,
            name: "Admin",
        },
    });

    console.log(`✅ Admin user created/updated: ${admin.email}`);
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);
    console.log("\n⚠️  IMPORTANT: Change this password after first login!");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
