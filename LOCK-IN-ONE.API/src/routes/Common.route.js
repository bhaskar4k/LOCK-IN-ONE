import express from 'express';
import Common from '../service/Common.service.js';

import JWT from '../middleware/Jwt.js';
const { VerifyJwtToken } = JWT;

const router = express.Router();


router.get("/menu", VerifyJwtToken, Common.GetMenu);

export default router;