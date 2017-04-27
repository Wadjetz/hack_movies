import * as mongoose from "mongoose"

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/hack_movies")

