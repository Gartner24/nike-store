//I need to implement JWT to return a token to the user
//when the user is in my data base I return a token to the user
//and it token will save in cookies, to validate the user
//I use Sequalize to conect to my data base, and here is the structure of my data base:
//CREATE TABLE users (
//     userID INT AUTO_INCREMENT,
//     username VARCHAR(50) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     fullName VARCHAR(50) NOT NULL,
//     email VARCHAR(120) NOT NULL UNIQUE,
//     phone VARCHAR(20),
//     role ENUM('client', 'admin') NOT NULL DEFAULT 'client',
//     address TEXT,
//     registrationDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     CONSTRAINT `PK_userID` PRIMARY KEY (userID)
// );
//Help me with this, please

import Router from 'express';
import jwt from 'jsonwebtoken';
import { check } from 'express-validator';


const router = Router();

loginRouter.post('/login', (req, res) => {
    const user = req.body{userID, username, password };
    const token = jwt.sign(user, 'holi', { expiresIn: '30m' });
    res.status(200).json({ token });
});