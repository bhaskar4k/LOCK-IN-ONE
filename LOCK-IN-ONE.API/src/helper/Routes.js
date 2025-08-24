import OrganizationRoutes from '../routes/Organization.route.js';
import CommonRoutes from '../routes/Common.route.js';

const InitializeRoutes = (app) => {
    console.log("Trying to initialize routes!");

    app.use("/organization", OrganizationRoutes);
    app.use("/common", CommonRoutes);
    
    console.log("Routes initialized successfully!\n");
};

export default InitializeRoutes;