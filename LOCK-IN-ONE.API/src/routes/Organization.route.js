import express from 'express';
import Organization from '../service/Organization.service.js';
const router = express.Router();

router.post("/register", Organization.RegisterOrganization);
router.post("/login", Organization.Login);

export default router;