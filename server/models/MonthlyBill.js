import mongoose from 'mongoose'

export default mongoose.Schema({
    chargeAmount: {type: Number, default: 0},
    balance: {type: Number, default: 0},
    credit: {type: Number, default: 0},
    amountPaid: {type: Number, default: 0},
    billingDays: {type: Number, default: 0},
    billingRate: {type: Number, default: 0},
    totalKwUsed: {type: Number, default: 0},

    dueDate: {type: Date},
    duePaid: {type: Date},
    billingStart: {type: Date},
    billingEnd: {type: Date},

    status: {type: mongoose.SchemaTypes.ObjectId, ref: 'BillingStatus'},

    dailyUsage: []
})