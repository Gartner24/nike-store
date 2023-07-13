import express from 'express';
import loginController from '../../controllers/authentication.controller.js';

const authenticationRouter = express.Router();

// JWT authentication middleware
authenticationRouter.post('/login', loginController);

export default authenticationRouter;