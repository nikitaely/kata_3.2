import React from 'react';
import Movie from '../movie/movie';
import PropTypes from 'prop-types';
import './movie-list.css';

function MovieList({ movies, addNewMovie }) {

  const elements = movies.map((item) => {
    const { id } = item;

    return <Movie id={id} addNewMovie={addNewMovie} />;
  });

  return <ul className="movie-list">{elements}</ul>;
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, 
      title: PropTypes.string.isRequired,
    })
  ).isRequired, 
  addNewMovie: PropTypes.func.isRequired, 
};

export default MovieList;

