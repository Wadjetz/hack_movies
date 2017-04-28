import fetch from 'node-fetch';
const jsonfile = require('jsonfile')
import * as mongoose from "mongoose"

const Movie = mongoose.model("movies");
const Theater = mongoose.model("theaters");
const Showtime = mongoose.model("showtimes");

const logError = (err: any) => console.error(err)
const ignoreError = (err: any) => {}

const saveMovie = (id: string, jsonMovie: any) =>
  new Movie({
    _id: id,
    title: jsonMovie.title,
    poster: jsonMovie.poster.file_name,
    releaseDate: jsonMovie.releaseDate.date,
  }).save().catch(ignoreError)

const saveTheater = (id: string, jsonTheater: any) => () => {
  const addr: any = jsonTheater.address;
  return new Theater({
    _id: jsonTheater.id_ac,
    name: jsonTheater.name,
    address: [addr.addresse, addr.zip_code, addr.city].join(" "),
    network: jsonTheater.network.slug,
  }).save().catch(ignoreError)
}

const saveShowTimes = (movieId: string, theaterId: string, showVersion: any) => () => {
  return new Showtime({
    movieId, theaterId,
    version: showVersion.version,
    dates: showVersion.showtimes.map( (t: any) => t.showStart )
  }).save().catch(logError)
}

const parseMovieData = (id: string) => (data: any) => {

  saveMovie(id, data.movies[id]);

  Object.keys(data.theaters).reduce(
    (acc: Promise<void>, key: string) =>
      acc.then( saveTheater(key, data.theaters[key]) )
  , Promise.resolve());

  Object.keys(data.showtimes).reduce((acc: Promise<void>, theaterId: string) => {
    const movieShowtimes = data.showtimes[theaterId];
    return acc.then(() =>
      Object.keys(movieShowtimes).reduce((acc2: Promise<void>, dateKey: string) => {
        const dateSessions = movieShowtimes[dateKey][id];
        return acc2.then(() =>
          dateSessions.reduce((acc3: Promise<void>, showVersion: any) => 
            acc3.then( saveShowTimes(id, theaterId, showVersion) )
          , acc2)
        );
      }, acc)
    );
  }, Promise.resolve());

}

const getMovieData = (id: string) => {
  const url = `http://www.allocine.fr/_/showtimes/movie-${id}/near-115755/?v=v1.2.2.61`;
  //fetch(url)
  //.then(res => res.json())
  //.then(parseMovieData(id))
  jsonfile.readFile(
    '/Users/ngl/projects/hackday/hack_movies/src/data.json',
    (err: any, obj: any) => parseMovieData(id)(obj)
  )
}

const run = () => {
  console.log('Initializing bootstrap');
  getMovieData('226995');
}

export default run