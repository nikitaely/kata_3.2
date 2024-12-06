import React from 'react';
import PropTypes from 'prop-types';
import './movie.css'

function Movie({ title, description, release_date, genres, poster_path }) {
  return (
    <div className="movie">
      <img className="movie-image" src={'https://image.tmdb.org/t/p/w500' + poster_path} alt="film cover" />
      <div className='container'>
        <h5 className="movie-title">{title}</h5>
        <span className="movie-date">{release_date}</span>
        <div className="movie-categories">
          {genres.map((genre) => (
            <div key={genre.id} className="movie-genre">
              {genre.name}
            </div>
          ))}
        </div>
        <div className="movie-description">{description}</div>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  title: PropTypes.string,
  release_date: PropTypes.string,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  poster_path: PropTypes.string,
};

export default Movie;
