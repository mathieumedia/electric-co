import mongoose from 'mongoose'

export default mongoose.Schema({
    street: {type: String},
    aptNum: {type: String},
    city: {type: String},
    state: {type: mongoose.SchemaTypes.ObjectId, ref: 'State'},
    zip: {type: String},
})