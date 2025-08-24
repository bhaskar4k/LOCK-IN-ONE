import OrganizationRoutes from '../routes/Organization.route.js';

const InitializeRoutes = (app) => {
    console.log("Trying to initialize routes!");
    app.use("/organization", OrganizationRoutes);
    console.log("Routes initialized successfully!\n");
};

export default InitializeRoutes;