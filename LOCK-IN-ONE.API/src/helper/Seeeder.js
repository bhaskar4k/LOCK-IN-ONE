import SeedEnum from '../seeders/Enum.seeder.js';
import SeedMenu from '../seeders/Menu.seeder.js';
import SeedUser from '../seeders/User.seeder.js';
import SeedUserRole from '../seeders/UserRole.seeder.js';
import SeedRoleMenuMapping from '../seeders/RoleMenuMapping.seeder.js';

import dotenv from 'dotenv';
dotenv.config();

const RunSeeders = async () => {
    try {
        console.log(`=====================================================`);
        console.log(`Master Data Seeding Started!                       |`);
        console.log(`=====================================================\n`);

        await SeedEnum();
        await SeedMenu();
        await SeedUser();
        await SeedUserRole();
        await SeedRoleMenuMapping();

        console.log(`=====================================================`);
        console.log(`Master Data Seeding Ended!                          |`);
        console.log(`=====================================================\n`);
    } catch (error) {
        console.log("Seeder error:", error);
        process.exit(1);
    }
};

export default RunSeeders;