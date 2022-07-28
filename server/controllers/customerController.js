import Customer from '../models/Customer.js';
import MonthlyBill from '../models/MonthlyBill.js'
import AccountType from '../models/AccountType.js'
import BillingStatus from '../models/BillingStatus.js'
import Address from '../models/Address.js'
import User from '../models/User.js'
import * as helper from './helperController.js'
import bcrypt from 'bcryptjs'

// #region ------------- CUSTOMER BASICS ------------
export async function getCustomers(req, res){
    try{
        const customers = await Customer.find().select('-__v')

        res.json(customers)
    }catch(error){
        helper.ExportError(res, error)
    }
}

export async function addCustomer(req, res){
    try {

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
        
        res.json({
            customer: newCustomer,
            alert: {message: "Customer Successfully Added", type: 'success'}
        })
    } catch (error) {
        helper.ExportError(res, error)
    }
}

export async function updateCustomer(req, res){
    try {

        const {customerId} = req.params;

        let customer = await Customer.findByIdAndUpdate(customerId, req.body, {new: true})

        if(!customer){
            return res.status(400).json({message: "Unable to update customer. Please try again later", type:'error'})
        }

        res.json({
            customer,
            alert: {
                message: "Customer Successfully Updated",
                type: 'success'
            }
        })

    } catch (error) {
        helper.ExportError(res, error)
    }
}

export async function addCustomerBill(req, res){
    try {

        const {customerId, year, month} = req.body;

        let customer = await Customer.findById(customerId)

        if(!customer){
            return res.status(400).json({message: 'Unable to locate Customer. Please try again later', type: 'error'})
        }

        const accountType = await AccountType.findById(customer.accountType)

        if(!accountType){
            return res.status(400).json({message: 'Unable to create new customer Bill. Please try again later', type: 'error'})
        }

        const newBill = await createBill({year,  month, accountType })
        customer.monthlyBills.push(newBill)

        await customer.save();

        res.json({
            customer,
            alert: {
                message: "Successfully Created customer bill", type: 'success'
            }
        })

    } catch (error) {
        helper.ExportError(res, error)
    }
}


// #endregion ----------------------------------

//#region Helper methods
async function createBill({year, month, accountType}){
    const billingEnd = new Date(year, month, 0)
    const billingDays = billingEnd.getDate();
    const billingStart = new Date(billingEnd).setDate(1)
    const dueDate = billingEnd.addDays(15)

    console.log(accountType)

    let bill = {
        billingStart,
        billingEnd,
        billingDays,
        dueDate,
        billingRate: accountType.rate,
        dailyUsage: []
    }

    for(let i = 0; i < billingDays; i++){
        const usage = Math.floor(Math.random() * (37 - 20) + 20)
        const dailyCost = usage * accountType.rate

        bill.dailyUsage.push({
            kwhUsed: usage,
            date: new Date(`${year}-${month}-${i + 1}`),
            dailyCost
        })
    }

    const chargeAmount = bill.dailyUsage.reduce((acc, daily) => { return acc + daily.dailyCost}, 0);
    const totalKwUsed = bill.dailyUsage.reduce((acc, daily) => { return acc + daily.kwhUsed}, 0)
    bill.chargeAmount = chargeAmount;
    bill.balance = chargeAmount
    bill.totalKwUsed = totalKwUsed

    const status = await BillingStatus.findOne({name: "Current"})

    bill.status = status._id
    
    bill.chargeAmount = chargeAmount

    return bill;
}

Date.prototype.addDays = function (days){
    let date = new Date(this.valueOf())
    return date.setDate(date.getDate() + days)
}
