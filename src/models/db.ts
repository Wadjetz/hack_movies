import * as mongoose from "mongoose"

var mongoPromise = mongoose.Promise;
mongoPromise = global.Promise;

mongoose.connect("mongodb://localhost/hack_movies")

