import mongoose from 'mongoose'

export default mongoose.model("User", {
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: String,
        default: false,
    },
})
