import React, { Component } from 'react';
import MovieList from './movie-list';
import getListMovieInfo from './server-api';
import './app.css'

export default class App extends Component {
  constructor(props) {
    super(props);

    // Инициализируем state
    this.state = {
      movies: [], // По умолчанию массив пустой
    };
  }

  componentDidMount() {
    // Вызываем асинхронную функцию после монтирования компонента
    getListMovieInfo()
      .then((movies) => {
        this.setState({ movies }); // Обновляем state с данными фильмов
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }

  render() {
    const { movies } = this.state; // Извлекаем данные из state
    return <div cassName='app'>
      <MovieList movie={movies} />
      </div>; // Передаём их как пропс
  }
}