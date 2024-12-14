import React, { Component } from 'react';
import MovieList from '../movie-list/movie-list';
import getListMovie from '../../server-api/get-list-movie';
import { Offline, Online } from 'react-detect-offline';
import './app.css';
import Search from '../search/search';
import { Pagination } from 'antd';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    getListMovie()
      .then((movies) => {
        this.setState({ movies: movies.results });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }

  // Метод для обновления списка фильмов
  updateMovies = (movies) => {
    this.setState({ movies });
  };

  addNewMovie = (movie) => {
    this.setState((prevState) => ({
      movies: [...prevState.movies, movie],
    }));
  };

  render() {
    console.log('Rendered movies:', this.state.movies);
    const { movies } = this.state;
    return (
      <div className="app">
        <Online>
          <Search updateMovies={this.updateMovies} />
          <MovieList movies={movies} addNewMovie={this.addNewMovie} />
        </Online>
        <Offline>
          <span>Sorry not connection</span>
        </Offline>
      </div>
    );
  }
}
