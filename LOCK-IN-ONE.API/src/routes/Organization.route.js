import express from 'express';
import Organization from '../service/Organization.service.js';
const router = express.Router();

router.post("/register", Organization.RegisterOrganization);

export default router;