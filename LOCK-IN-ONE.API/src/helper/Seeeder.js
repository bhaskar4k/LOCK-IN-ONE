import Enums from '../entity/Enum.model.js';

import dotenv from 'dotenv';
dotenv.config();

const RunSeeders = async () => {
    try {
        const newEnums = new Enums({
            enum_name: 'ENUMS',
            enum_value: 'ENUMS',
        });
        await newEnums.save();
    } catch (error) {
        console.log("Seeder error:", error);
        process.exit(1);
    }
};

export default RunSeeders;