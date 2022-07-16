import express from 'express';
import colors from 'colors';
import  mongoose from 'mongoose'

// #region ----------API ROUTES -----------
import userRoutes from './routes/userRoutes.js'
import essentialRoutes from './routes/essentialRoutes.js'
// #endregion

import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({extended: false}));

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected ${conn.connection.host}`.green.underline.bold)
    }catch(error){
        console.log(`"ERROR: ${err.message}`.bgRed.underline.bold)
        process.exit(1)
    }
}

connectDB()

app.use('/api/users', userRoutes)
app.use('/api/essentials', essentialRoutes)
app.listen(PORT, () => console.info(`Server is running on port ${PORT}\n`.green.underline.bold));