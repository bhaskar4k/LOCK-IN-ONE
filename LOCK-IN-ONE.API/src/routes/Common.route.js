import express from 'express';
import Common from '../service/Common.service.js';

import JWT from '../middleware/Jwt.js';
const { VerifyJwtToken, AssignTokenExistance } = JWT;

const router = express.Router();


router.get("/menu", AssignTokenExistance, Common.GetMenu);

export default router;