import fetch from 'node-fetch';

import Movie from './models/movies';

const getMovieData = (id: string) => {
  const url = `http://www.allocine.fr/_/showtimes/movie-${id}/near-115755/?v=v1.2.2.61`;
  fetch(url)
  .then(res => res.json())
  .then((data: any) => {
    const jsonMovie: any = data.movies[id];
    const movie = new Movie({
      _id: id,
      title: jsonMovie.title,
      poster: jsonMovie.poster.file_name,
      releaseDate: jsonMovie.releaseDate.date
    }).save();
  })
}

const run = () => {
  console.log('Initializing bootstrap');
  getMovieData('226995');
}

export default run