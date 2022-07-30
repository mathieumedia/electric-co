import Customer from '../models/Customer.js';
import MonthlyBill from '../models/MonthlyBill.js'
import AccountType from '../models/AccountType.js'
import BillingStatus from '../models/BillingStatus.js'
import Address from '../models/Address.js'
import User from '../models/User.js'
import State from '../models/State.js'
import Gender from '../models/Gender.js'
import * as helper from './helperController.js'
import bcrypt from 'bcryptjs'
import customerData from '../data/customers.js'

// #region ------------- CUSTOMER BASICS ------------
export async function getCustomers(req, res){
    try{
        const customers = await Customer.find().select('-__v')

        res.json(customers)
    }catch(error){
        helper.ExportError(res, error)
    }
}

export async function deleteAllCustomers(req, res){
    try {

        const nonAdmins = await User.find({isAdmin: false});

        for(let i = 0; i < nonAdmins.length; i++){
            await Customer.findOneAndDelete({user: nonAdmins[i]._id})
            await User.findByIdAndDelete(nonAdmins[i]._id)
        }
        
        res.json({message: "All Non Admin accounts have been deleted", type: "success"})
    } catch(error){
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

export async function repopulateCustomers(req, res){
    try {
        const customerList = []
        for(let i = 0; i < customerData.length; i++){
            let newCustomer = await Customer.findOne({email: customerData[i].email})
            let user = await User.findOne({email: customerData[i].email})

            if(!newCustomer && !user){
                
                newCustomer = customerData[i];
                newCustomer.paymentMethods.creditCard = {
                    ...newCustomer.paymentMethods.creditCard,
                    cardHolder: newCustomer.accountType === 'Commercial' ? newCustomer.careOf : `${newCustomer.firstName} ${newCustomer.lastName}`
                }
                const accountType = await AccountType.findOne({name: newCustomer.accountType});
                const state = await State.findOne({abbr: newCustomer.address.state})

                
                newCustomer.accountType = accountType._id
                newCustomer.address.state = state._id
                if(newCustomer.gender){
                    newCustomer.gender = (await Gender.findOne({abbr: newCustomer.gender}))._id
                }
                
                newCustomer.monthlyBills = []
                newCustomer.paymentHistory = []

                for(let b = 0; b <= new Date().getMonth(); b++){
                    const bill = await createBill({year: 2022, month: b + 1, accountType})

                    if(b < new Date().getMonth()){
                        const methods = ["Credit Card", "Banking"]
                        const paymentMethod = methods[Math.floor(Math.random() * methods.length)]
                        const creditCard = paymentMethod === 'Credit Card' ? newCustomer.paymentMethods.creditCard : null
                        const banking = paymentMethod === 'Banking' ? newCustomer.paymentMethods.banking : null

                        const paymentMethodObj = {
                            paymentMethod,
                            creditCard,
                            banking,
                            paymentAmount: bill.balance,
                        }
                        const payment = await createPayment(paymentMethodObj)
                        const status = await BillingStatus.findOne({name: 'Paid'})
                        //console.log(status)

                        bill.paidDate = bill.dueDate;
                        bill.amountPaid = bill.balance;
                        bill.balance = 0;
                        bill.status = status._id
                        newCustomer.paymentHistory.unshift(payment);
                    }
                    newCustomer.monthlyBills.unshift(bill);
                }

                newCustomer = new Customer(newCustomer)

                // #region ---- User creation
                user = new User({email: newCustomer.email, password: newCustomer.address.zip})
                const salt = await bcrypt.genSalt(10)

                user.password = await bcrypt.hash(user.password, salt)
                await user.save();
                newCustomer.user = user._id;
                //#endregion

                await newCustomer.save()
                customerList.push(newCustomer)
            }
        }

        res.json(customerList)
    } catch (error) {
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

//#region ------ BILLING METHODS -------
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

export async function creditCustomerBill(req, res){
    try {
        let {creditAmount, customerId, billId} = req.body;

        const customer = await Customer.findById(customerId);

        if(!customer){
            return res.status(400).json({message: 'Unknown Customer', type: 'error'})
        }

        const bill = customer.monthlyBills.find(b => b._id.toString() === billId)

        creditAmount = parseFloat(creditAmount)
        bill.credit += creditAmount
        bill.balance -= creditAmount

        const status = bill.balance <= 0 
            ?   await BillingStatus.findOne({name: "Paid"})
            :   await evaluateCurrentBillingStatus(bill.billingEnd)

        bill.status = status._id

        customer.monthlyBills.map(b => b._id === bill._id ? bill : b)

        await customer.save();

        res.json({
            customer,
            alert: {message: "Customer Updated Successfully", type: 'success'}
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

    const chargeAmount = helper.toFixed(bill.dailyUsage.reduce((acc, daily) => { return acc + daily.dailyCost}, 0));
    const totalKwUsed = bill.dailyUsage.reduce((acc, daily) => { return acc + daily.kwhUsed}, 0)
    bill.chargeAmount = chargeAmount;
    bill.balance = chargeAmount
    bill.totalKwUsed = totalKwUsed

    const status = await evaluateCurrentBillingStatus(billingEnd)

    bill.status = await status._id
    
    bill.chargeAmount = chargeAmount

    return bill;
}

async function createPayment(paymentMethodObj){
    const {paymentAmount, paymentMethod, creditCard, banking} = paymentMethodObj

    let payment = {
        paymentDate: new Date(),
        paymentAmount,
        paymentMethod,
        confirmationNumber: Math.random().toString(36).slice(2)
    }
    if(banking) payment = {...payment, banking}
    if(creditCard) payment = {...payment, creditCard}
    
    return payment
}

Date.prototype.addDays = function (days){
    let date = new Date(this.valueOf())
    return date.setDate(date.getDate() + days)
}



async function evaluateCurrentBillingStatus(start){
    const dayDifference = (new Date().getTime() - start.getTime()) / (1000 * 3600 * 24)
    return dayDifference <= 15 
        ?   await BillingStatus.findOne({name: "Current"})
        :   await BillingStatus.findOne({name: "Past Due"})
}
