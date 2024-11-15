import axios from 'axios';

const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWQ2NzNlYTRlNDFkMTBhMTQ0ZjZkMzQ4MGE1YTU0YiIsIm5iZiI6MTczMDg4NTUxNC4xODUwNjMsInN1YiI6IjY3MmIzMWFlNDI0Y2M2YTNiZTJlNDhhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PuAlADCQSs25Ms_5GGNhz3CWFTiGV00548cHqXa360E';

export const getTopMovie = async value => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/${value}`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  return data.results;
};

export const getDetailsMovieData = async moveId => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${moveId}`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  return data;
};

export const getCastMovie = async moveId => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${moveId}/credits`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  return data;
};

export const getReviewsMovie = async moveId => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${moveId}/reviews`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  return data;
};

export const getSearchMovie = async (query, page) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie`,
    {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        query: query,
        include_adult: 'true',
        language: 'en-US',
        page: page,
      },
    }
  );
  return data;
};
