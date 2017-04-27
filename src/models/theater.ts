import * as mongoose from "mongoose"

const TheaterSchema = new mongoose.Schema({
    _id: String,
    name: String,
    address: String,
    network: String,
})

const Theater = mongoose.model("theaters", TheaterSchema)

export default Theater
