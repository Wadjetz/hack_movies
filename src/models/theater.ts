import * as mongoose from "mongoose"

const TheaterSchema = new mongoose.Schema({
    allocineId: String,
    name: String,
    address: String,
    network: String,
})

const Theater = mongoose.model("theaters", TheaterSchema)

export default Theater
