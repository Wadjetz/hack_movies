import fetch from 'node-fetch';
const jsonfile = require('jsonfile')
import * as mongoose from "mongoose"

import { ShowtimeModel } from "./models/showtime"

const Movie = mongoose.model("movies");
const Theater = mongoose.model("theaters");
const Showtime = mongoose.model("showtimes");

const logError = (err: any) => console.error(err)
const ignoreError = (err: any) => {}

// remove duplicates
const deDupe = (lst: any[]) =>
  lst.filter(
    (elem: any, index:number, self: any[]) => index === self.indexOf(elem)
  )

const saveMovie = (id: string, jsonMovie: any) => {
  console.log(jsonMovie.title)
  return new Movie({
    _id: id,
    title: jsonMovie.title,
    poster: jsonMovie.poster.file_name,
    releaseDate: jsonMovie.releaseDate.date,
  }).save().catch(ignoreError)
}

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
  const version = showVersion.version;
  const newDates = showVersion.showtimes.map( (t: any) => t.showStart );

  Showtime.findOne({ movieId, theaterId, version }).exec(
    (err, res: mongoose.Document) => {
      if (res) {
        const mergedDates = deDupe(newDates.concat((res as any).dates))
        return res.update(
          { movieId, theaterId, version },
          { $set: { dates: mergedDates } }
        ).catch(ignoreError)
      } else {
        return new Showtime({
          movieId, theaterId, version,
          dates: newDates
        }).save().catch(ignoreError)
      }
    }
  )
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

const DELAY = 1500;

const parseOtherMovies = (obj: any) => {
  const otherMovies = Object.keys(obj.theaters).map((t:any) => obj.theaters[t].movies);
  const uniqueOthers = deDupe([].concat( ...otherMovies ))
  setTimeout(() => getMoviesData(uniqueOthers), DELAY);
}

const getMoviesData = (ids: string[]) => {
  if (ids.length > 0) {
    getMovieData(ids[0], false);
    setTimeout(() => getMoviesData(ids.slice(1)), DELAY+DELAY*Math.random());
  }
}

const getMovieData = (id: string, first: boolean): Promise<void> => {
  console.log(`Getting data of movie ${id}`)
  
  const url = `http://www.allocine.fr/_/showtimes/movie-${id}/near-115755/?v=v1.2.2.61`;
  return fetch(url)
  .then(res => res.json())
  .then((obj: any) => {
    const res = parseMovieData(id)(obj)
    first && parseOtherMovies(obj)
  })
  
  /*
  jsonfile.readFile(
    `/Users/ngl/projects/hackday/hack_movies/src/data/${id}.json`,
    (err: any, obj: any) => {
      if (obj) {
        const res = parseMovieData(id)(obj);
        first && parseOtherMovies(obj)
      }
    }
  )
  */
  
}

const run = () => {
  console.log('Initializing bootstrap');
  getMovieData('226995', true);
}

export default run