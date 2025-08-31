import UserRoles from '../entity/UserRole.model.js';
import UserRoleConstants from '../common-constants/UserRole.constant.js';

import dotenv from 'dotenv';
dotenv.config();

const SeedUserRole = async () => {
    try {
        console.log("Trying to seed user roles!");

        const count = await UserRoles.countDocuments();

        if (count === 0) {
            await UserRoles.insertMany(UserRoleConstants);
        } else {
            console.log("User roles already seeded!\n");
            return;
        }

        console.log(`User roles seeded successfully!\n`);
    } catch (error) {
        console.log("Failed to seed user roles error:", error);
        process.exit(1);
    }
};

export default SeedUserRole;