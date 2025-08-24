import OrganizationRoutes from '../routes/Organization.route.js';

const InitializeRoutes = (app) => {
    app.use("/organization", OrganizationRoutes);
};

export default InitializeRoutes;