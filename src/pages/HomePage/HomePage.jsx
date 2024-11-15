import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { getTopMovie } from '../../services/api.js';
import s from './HomePage.module.css';
import Loader from '../../components/Loader/Loader.jsx';
import toast from 'react-hot-toast';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';

const HomePage = () => {
  const [topMovie, setTopMovie] = useState([]);
  const [selectedOpt, setSelectedOpt] = useState('day');
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setISError] = useState(false);
  const [errorCode, setErrorCode] = useState('');

  useEffect(() => {
    setISError(false);
    setErrorCode('');
    const fetchTopMovie = async () => {
      try {
        setIsLoader(true);
        const movieData = await getTopMovie(selectedOpt);
        setTopMovie(movieData);
      } catch (error) {
        toast.error(error.message);

        setISError(true);
        setErrorCode(`${error.status}`);
      } finally {
        setIsLoader(false);
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
      {isLoader && <Loader type={'colorRing'} />}
      {isError && <ErrorMessage type={errorCode} />}
    </div>
  );
};

export default HomePage;
