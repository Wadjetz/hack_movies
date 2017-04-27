import * as mongoose from "mongoose"

const ShowtimeSchema = new mongoose.Schema({
    movieId: String,
    theaterId: String,
    date: Date,
    version: String,
    times: [Date]
})

const Showtime = mongoose.model("showtime", ShowtimeSchema)

export default Showtime

