import { Link, useLocation } from 'react-router-dom';
import noteFaundImg from '../../assets/notefaund.jpg';
import s from './MovieList.module.css';

const MovieList = ({ movieList, query }) => {
  const location = useLocation();
  if (!movieList) {
    return;
  }
  function formatReleaseDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'short' });
    return `${year} ${month}`;
  }

  return (
    <ul className={s.movi_list}>
      {movieList.map(({ id, title, release_date, poster_path }) => {
        return (
          <li className={s.item} key={id}>
            <Link
              to={`/movies/${id}`}
              className={s.link}
              state={{ from: location.pathname, query }}
            >
              <img
                className={s.img}
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w200/${poster_path}`
                    : noteFaundImg
                }
                alt={title}
              />
              <div className={s.wrapper_text}>
                <h2 className={s.title}>{title}</h2>
                <p className={s.descr}>{formatReleaseDate(release_date)}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
