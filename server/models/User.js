import mongoose from "mongoose"

const { Schema, model, Types } = mongoose

const schema = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

export default model('User', schema)