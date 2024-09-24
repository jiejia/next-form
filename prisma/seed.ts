import bcrypt from "bcryptjs";

import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function seedUsers() {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await prisma.user.createMany({
        data: [
            {
                username: 'admin',
                email: 'admin@thenextform.org',
                password: hashedPassword,
            },
        ],
    });
}

async function seedOptions() {
    await prisma.option.createMany({
        data: [
            {
                name: 'general_settings',
                value: {
                    "default_language": "en-us"
                }
            },
        ],
    });
}

async function main() {
    await seedUsers();
    await seedOptions();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });