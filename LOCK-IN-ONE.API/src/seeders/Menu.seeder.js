import Menus from '../entity/Menu.model.js';
import MenusConstants from '../common-constants/Menu.constant.js';

const SeedMenu = async () => {
    try {
        console.log("Trying to seed menu!");

        const count = await Menus.countDocuments();

        if (count === 0) {
            await Menus.insertMany(MenusConstants);
        } else {
            console.log("Menu already seeded!\n");
            return;
        }

        console.log(`Menu seeded successfully!\n`);
    } catch (error) {
        console.log("Failed to seed menu error:", error);
        process.exit(1);
    }
};

export default SeedMenu;