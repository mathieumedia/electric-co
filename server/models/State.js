import mongoose from 'mongoose'

export default mongoose.model('State', {
    name:{
        type: String,
        required: true,
        unique: true
    },
    abbr: {
        type: String,
        required: true,
        unique: true
    }
})