import mongoose from 'mongoose'

export default mongoose.model('AccountType', {
    name:{
        type: String,
        required: true,
        unique: 'true'
    },
    rate: {
        type: Number,
        required: true,
        default: 0
    }
})