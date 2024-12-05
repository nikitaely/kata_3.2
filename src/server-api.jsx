function getMovieInfo(id) {
  const _apiBase = 'https://api.themoviedb.org/3/movie/';
  const url = _apiBase + id;
  const options = {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDcyZTEyZjNhMjQ1Y2E0ZDBlODEyODE3OGQ0MmQ1ZCIsIm5iZiI6MTczMjc4OTc3NC40NzEsInN1YiI6IjY3NDg0NjBlOTQyMTVkY2Q2ZDZiYjFkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-sTVBEfglf_uiTn5p4wVaM54qAm27DINdypS0FdV1VY',
    },
  };

  return fetch(url, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      return res.json();
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

function getListMovie() {
  const url = 'https://api.themoviedb.org/3/movie/changes?page=1';
  const options = {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDcyZTEyZjNhMjQ1Y2E0ZDBlODEyODE3OGQ0MmQ1ZCIsIm5iZiI6MTczMjc4OTc3NC40NzEsInN1YiI6IjY3NDg0NjBlOTQyMTVkY2Q2ZDZiYjFkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-sTVBEfglf_uiTn5p4wVaM54qAm27DINdypS0FdV1VY',
    },
  };

  return fetch(url, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      return res.json();
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

function getListMovieInfo() {
  return getListMovie()
    .then(result => {
      // Берём только нужные фильмы
      const movies = result.results;

      // Получаем информацию по каждому фильму
      const data = Promise.all(
        movies.map(movie => getMovieInfo(movie.id))
      );
      return data
    })
    .catch(err => {
      console.error(err);
      throw err; // Прокидываем ошибку дальше
    });
}

export default getListMovieInfo;


