export default async function filmSearch(query) {

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    const options = {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDcyZTEyZjNhMjQ1Y2E0ZDBlODEyODE3OGQ0MmQ1ZCIsIm5iZiI6MTczMjc4OTc3NC40NzEsInN1YiI6IjY3NDg0NjBlOTQyMTVkY2Q2ZDZiYjFkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-sTVBEfglf_uiTn5p4wVaM54qAm27DINdypS0FdV1VY',
      },
    };
  
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
  }