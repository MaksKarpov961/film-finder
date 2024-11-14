import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCastMovie } from '../../services/api';
import s from './MovieCast.module.css';

const MovieCast = () => {
  const [movieCast, setMovieCast] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCastMovie = async () => {
      try {
        const { cast } = await getCastMovie(movieId);
        setMovieCast(cast);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCastMovie();
  }, [movieId]);
  if (!movieCast) return;

  const showMore = () => {
    setVisibleCount(prevCount => prevCount + 10);
  };

  return (
    <>
      <ul>
        {movieCast
          .slice(0, visibleCount)
          .map(({ id, name, profile_path, character }) => (
            <li key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                alt=""
              />
              <h3>{name}</h3>
              <h4>{character}</h4>
            </li>
          ))}
      </ul>
      {visibleCount < movieCast.length && (
        <button className={s.load_more} onClick={showMore}>
          LoadMore
        </button>
      )}
    </>
  );
};

export default MovieCast;
