import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import colors from 'colors'
import User from '../models/User.js'
import Customer from '../models/Customer.js'
import * as helperController from './helperController.js'
import dotenv from 'dotenv'
dotenv.config();


export async function getUsers(req, res){
    try{
        const users = await User.find()
            .select('-password').select('-__v');

        res.json(users)
    }catch(error){
        helperController.ExportError({res, error})
    }
}

export async function registerUser(req, res){
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: 'A valid Email and/or Password', type: 'error'})
        }

        let newUser = await User.findOne({email});

        if(newUser){
            return res.status(400).json({message: 'User already exists', type: 'error'})
        }

        newUser = new User(req.body)

        const salt = await bcrypt.genSalt(10);

        newUser.password = await bcrypt.hash(newUser.password, salt)

        await newUser.save()

        if(!newUser){
            return res.status(400).json({message: 'Unable to create user. Please try again at a later time', type: 'error'})
        }

        const payload = {
            user: newUser._id,
            isAdmin: newUser.isAdmin
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 28800,
        }, (err, token) => {
            if(err) throw err
            res.json({token, isAdmin: newUser.isAdmin})
        })

    }catch(error){
        helperController.ExportError({res, error})
    }
}

export async function loginUser(req, res){
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: 'A valid Email and/or Password', type: 'error'})
        }

        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: 'Invalid email and/or password', type: 'error'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: 'Invalid email and/or password', type: 'error'})
        }

        const payload = {
            user: user._id,
            isAdmin: user.isAdmin
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 28800,
        }, (err, token) => {
            if(err) throw err
            res.json({
                token,
                isAdmin: user.isAdmin
            })
        })
    }catch(error){
        helperController.ExportError({res, error})
    }
}



