import express from 'express';
import colors from 'colors';
import  mongoose from 'mongoose'

import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({extended: false}));


app.listen(PORT, () => console.info(`Server is running on port ${PORT}\n`.green.underline.bold));