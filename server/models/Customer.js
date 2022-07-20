import mongoose from 'mongoose';
import Address from './Address.js'
import Payment from './Payment.js'
import MonthlyBill from './MonthlyBill.js'

export default mongoose.model("Customer", {
    firstName: {type: String},
    middleName: {type: String},
    lastName: {type: String},
    email: {type: String},
    phone: {type: String},
    dateOfBirth: {type: Date},

    user: {type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true},
    gender: {type: mongoose.SchemaTypes.ObjectId, ref: "Gender"},
    accountType: {type: mongoose.SchemaTypes.ObjectId, ref: "AccountType"},

    organizationName: {type: String},
    careOf: {type: String},
    address: Address,
    paymentHistory: [Payment],
    monthlyBills: [MonthlyBill]
})