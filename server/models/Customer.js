import mongoose from 'mongoose';
import Address from './Address.js'
import Payment from './Payment.js'
import MonthlyBill from './MonthlyBill.js';

export default mongoose.model("Customer", {
    firstName: {type: String},
    lastName: {type: String},
    middleName: {type: String},
    user: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User'},
    email: {type: String},
    gender: {type: mongoose.SchemaTypes.ObjectId,  ref: 'Gender'},
    phone: {type: String},
    dateOfBirth: {type: Date},
    accountType: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'AccountType'},

    OrganizationName: {Type: String},
    careOf: {type: String},
    address: Address,
    payments: Payment,
    monthlyBills: [MonthlyBill]
})