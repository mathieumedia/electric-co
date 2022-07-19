import mongoose from 'mongoose'

export default mongoose.Schema({
    paymentDate: {type: Date},
    paymentAmount: {type: Number, default: 0},
    paymentMethod: {type: String},
    creditCard: {
        cardHolder: {type: String},
        cardNumber: {type: String},
        expDate: {type: Date},
        cvv: {type: Number},
        zipcode: {type: Number},
    },

    banking: {
        routingNumber: {type: String},
        accountNumber: {type: String}
    },
})