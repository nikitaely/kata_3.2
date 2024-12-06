import React from 'react';
import Movie from './movie';
import PropTypes from 'prop-types';
import './movie-list.css'


function MovieList({ movie }) {
  const elements = movie.map((item) => {
    
    const { id, original_title, overview, release_date, poster_path } = item;
    
    const genres = [
      {
        id: 12,
        name: 'Adventure',
      },
      {
        id: 28,
        name: 'Action',
      },
      {
        id: 878,
        name: 'Science Fiction',
      },
    ];
    return (
      <Movie
        key={id}
        description={overview}
        title={original_title}
        release_date={release_date}
        genres={genres}
        poster_path={poster_path}
      />
    );
  });

  return <ul className="movie-list">{elements}</ul>;
}

MovieList.propTypes = { 
  movie: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string.isRequired,
      overview: PropTypes.string,
      release_date: PropTypes.string,
      poster_path: PropTypes.string,
    })
  ).isRequired,
};


export default MovieList;
