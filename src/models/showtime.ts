import * as mongoose from "mongoose"

const Showtime = new mongoose.Schema({
    movieId: String,
    theaterId: String,
    date: Date,
    version: String,
    times: [Date]
})

export default Showtime

