import Customer from '../models/Customer.js';
import MonthlyBill from '../models/MonthlyBill.js'
import Address from '../models/Address.js'
import User from '../models/User.js'
import * as helper from './helperController.js'
import bcrypt from 'bcryptjs'

// #region ------------- CUSTOMER BASICS ------------
export async function getCustomers(req, res){
    try{
        if(req.user.isAdmin === "false"){
            return res.status(401).json({message: "Unauthorized Access", type: 'error'})
        }

        const customers = await Customer.find().select('-__v')

        res.json(customers)
    }catch(error){
        helper.ExportError(res, error)
    }
}

export async function addCustomer(req, res){
    try {

        if(req.user.isAdmin === "false"){
            return res.status(401).json({message: "Unauthorized Access", type: 'error'})
        }

        const {email, address} = req.body;

        let newUser = await User.findOne({email});

        if(newUser){
            return res.status(400).json({message: 'Account Already Exists', type: 'error'})
        }

        newUser = new User({email, password: address.zip})

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt)

        await newUser.save();

        if(!newUser) return res.status(400).json({message: 'Unable to create New Customer. Please try again at later time', type: 'error'})

        let newCustomer = new Customer({...req.body, user: newUser._id})

        await newCustomer.save()

        if(!newUser) return res.status(400).json({message: 'Unable to create New Customer. Please try again at later time', type: 'error'})
        
        res.json(newCustomer)
    } catch (error) {
        helper.ExportError(res, error)
    }
}


// #endregion ----------------------------------