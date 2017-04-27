import * as mongoose from "mongoose"

const Theater = new mongoose.Schema({
    allocineId: String,
    name: String,
    address: String,
    network: String,
})

export default Theater
