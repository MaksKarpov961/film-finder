import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { getTopMovie } from '../../services/api.js';
import s from './HomePage.module.css';

const HomePage = () => {
  const [topMovie, setTopMovie] = useState([]);
  const [selectedOpt, setSelectedOpt] = useState('day');

  useEffect(() => {
    const fetchTopMovie = async () => {
      try {
        const movieData = await getTopMovie(selectedOpt);
        setTopMovie(movieData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopMovie();
  }, [selectedOpt]);

  const handleChange = event => {
    setSelectedOpt(event.target.value);
  };

  return (
    <div className={s.container}>
      <div className={s.wrapper_title}>
        <h2 className={s.title_page}>Top movies</h2>
        <select
          className={s.select}
          name="options"
          id="options"
          onChange={handleChange}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
        </select>
      </div>
      <MovieList movieList={topMovie} />
    </div>
  );
};

export default HomePage;
