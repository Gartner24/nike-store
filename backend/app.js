import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db/database.js';
import morgan from 'morgan';
import cors from 'cors';
import router from './app/routes/index.routes.js';


const app = express();
dotenv.config()

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Routes
app.use('/api', router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})