import Menus from '../entity/Menu.model.js';
import MenusConstants from '../common-constants/Menu.constant.js';

const SeedMenu = async () => {
    try {
        console.log("Trying to seed menu!");

        await Menus.deleteMany({});

        await Menus.insertMany(MenusConstants); 

        console.log(`Menu seeded successfully!\n`);
    } catch (error) {
        console.log("Failed to seed menu error:", error);
        process.exit(1);
    }
};

export default SeedMenu;