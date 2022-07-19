import mongoose from 'mongoose'

export default mongoose.Schema({
    chargeAmount: {type: Number, default: 0},
    balance: {type: Number, default: 0},
    credit: {type: Number, default: 0},
    status: {type: mongoose.SchemaTypes.ObjectId, ref: 'BillingStatus'},
    dueDate: {type: Date},
    datePaid: {type: Date},
    amountPaid: {type: Number, default: 0},
    billingStart: {type: Date},
    billingEnd: {type: Date},
    billingDays: {type: Number},
    billingRate: {type: Number, default: 0},
    totalKwUsed: {type: Number, default: 0},
    dailyUsage: []
})