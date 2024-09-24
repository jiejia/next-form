const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

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

async function seedMenuItem() {
    await prisma.MenuItem.createMany({
        data: [
            {
                title: 'Dashboard',
                url: '/dashboard',
                parentId: null
            },
            {
                title: 'Forms',
                url: '/form',
                parentId: null
            },
            {
                title: 'Settings',
                url: '/setting',
                parentId: null
            },
        ],
    });
}

async function main() {
    await seedUsers();
    await seedOptions();
    await seedMenuItem();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });