import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './movie.css';
import { Spin, Alert } from 'antd';
import getMovieInfo from '../../server-api/get-movie-info';

export default class Movie extends Component {
  state = {
    loading: true,
    hasError: false,
    errorMessage: '',
    movieInfo: null,
  };

  componentDidMount() {
    const { id, addNewMovie } = this.props;

    getMovieInfo(id)
      .then((movieInfo) => {
        addNewMovie(id, movieInfo); 
        this.setState({ movieInfo, loading: false });
      })
      .catch((error) => {
        this.setState({
          hasError: true,
          errorMessage: error.message || 'Failed to fetch movie information.',
          loading: false,
        });
      });
  }

  
  truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;

    let truncated = text.slice(0, maxLength);
    if (text[maxLength] !== ' ' && truncated[truncated.length - 1] !== ' ') {
      truncated = truncated.slice(0, truncated.lastIndexOf(' '));
    }

    return `${truncated}...`;
  };

  render() {
    const { loading, hasError, errorMessage, movieInfo } = this.state;

    if (hasError) {
      return (
        <div className="movie-error">
          <Alert
            message="Error"
            description={errorMessage}
            type="error"
            showIcon
          />
        </div>
      );
    }

    if (loading) {
      return (
        <div className="movie-spinner">
          <Spin size="large" tip="Loading movie details..." />
        </div>
      );
    }

    if (!movieInfo) {
      return <p className="movie-not-found">Movie information not found.</p>;
    }

    return (
      <div className="movie">
        <MovieInfo movieInfo={movieInfo} truncateText={this.truncateText} />
      </div>
    );
  }
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  movies: PropTypes.object.isRequired, 
  addNewMovie: PropTypes.func.isRequired,
};

const MovieInfo = ({ movieInfo, truncateText }) => {
  const { title, release_date, poster_path, overview, genres } = movieInfo;

  return (
    <React.Fragment>
      <img
        className="movie-image"
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={`${title} poster`}
      />
      <div className="container">
        <h5 className="movie-title">{title}</h5>
        <span className="movie-date">{release_date}</span>
        
        {genres && genres.length > 0 && (
          <div className="movie-categories">
            {genres.map((genre) => (
              <div key={genre.id} className="movie-genre">
                {genre.name}
              </div>
            ))}
          </div>
        )}
        <div className="movie-description">
          {truncateText(overview || 'No description available', 200)}
        </div>
      </div>
    </React.Fragment>
  );
};

MovieInfo.propTypes = {
  movieInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    description: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  truncateText: PropTypes.func.isRequired,
};