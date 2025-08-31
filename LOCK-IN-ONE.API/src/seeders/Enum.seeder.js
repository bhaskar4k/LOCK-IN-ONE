import Enums from '../entity/Enum.model.js';
import EnumsConstants from '../common-constants/Enum.constant.js';


import dotenv from 'dotenv';
dotenv.config();

const SeedEnum = async () => {
    try {
        console.log("Trying to seed enums!");

        const ItemCount = await Enums.countDocuments();

        if (ItemCount > 0) {
            console.log("Enums already seeded!\n");
            return;
        }

        const { EnumConstantNames, ...restEnums } = EnumsConstants;

        let count = 0;
        for (const key of Object.keys(EnumConstantNames)) {
            const enumName = EnumConstantNames[key];
            const enumValues = restEnums[enumName];

            if (enumValues) {
                const docs = Object.values(enumValues).map(val => ({
                    enum_name: enumName,
                    enum_value: val,
                }));

                await Enums.insertMany(docs);
                count++;
            }
        }

        console.log(`Enums seeded successfully! Total ${count} enums added!\n`);
    } catch (error) {
        console.log("Failed to seed enum error:", error);
        process.exit(1);
    }
};

export default SeedEnum;