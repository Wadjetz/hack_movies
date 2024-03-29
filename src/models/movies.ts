import * as mongoose from "mongoose"

const MovieSchema = new mongoose.Schema({
  _id: String,
  title: String,
  poster: String,
  releaseDate: Date,
})

const Movie = mongoose.model("movies", MovieSchema)

export default Movie

export interface MovieModel {
  _id: string
  title: string
  poster: string
  releaseDate: Date
}
