import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCastMovie } from '../../services/api';
import noteFaundImg from '../../assets/notefaund.jpg';
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
      {movieCast.length === 0 ? (
        <div>Unfortunately, there is no information about the cast</div>
      ) : (
        <ul className={s.list}>
          {movieCast
            .slice(0, visibleCount)
            .map(({ id, name, profile_path, character }) => (
              <li key={id} className={s.item}>
                <img
                  className={s.img}
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w200/${profile_path}`
                      : noteFaundImg
                  }
                  alt={name}
                />
                <div className={s.wrapper_text}>
                  <h3 className={s.name}>{name}</h3>
                  <h4 className={s.character}>{character}</h4>
                </div>
              </li>
            ))}
        </ul>
      )}
      {visibleCount < movieCast.length && (
        <button className={s.load_more} onClick={showMore}>
          LoadMore
        </button>
      )}
    </>
  );
};

export default MovieCast;
