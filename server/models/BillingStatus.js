import mongoose from 'mongoose'

export default mongoose.model('BillingStatus', {
    name:{
        type: String,
        required: true,
        unique: true
    }
})