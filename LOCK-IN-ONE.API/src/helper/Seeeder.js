import SeedEnum from '../seeders/Enum.seeder.js';

import dotenv from 'dotenv';
dotenv.config();

const RunSeeders = async () => {
    try {
        await SeedEnum();
    } catch (error) {
        console.log("Seeder error:", error);
        process.exit(1);
    }
};

export default RunSeeders;