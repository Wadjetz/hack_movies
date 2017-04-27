import * as mongoose from "mongoose"

const MovieSchema = new mongoose.Schema({
    allocineId: String,
    title: String,
    poster: String,
    releaseDate: Date
})

const Movie = mongoose.model("movies", MovieSchema)

export default Movie
