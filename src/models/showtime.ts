import * as mongoose from "mongoose"

const ShowtimeSchema = new mongoose.Schema({
  movieId: String,
  theaterId: String,
  version: String,
  dates: [ Date ]
})

const Showtime = mongoose.model("showtimes", ShowtimeSchema)

export default Showtime

export interface ShowtimeModel {
  movieId: string
  theaterId: string
  version: string
  dates: Date[]
}