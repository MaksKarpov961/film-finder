import { useEffect, useRef, useState } from 'react';
import s from './MovieDetailsPage.module.css';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { getDetailsMovieData } from '../../services/api';
import { TiArrowBack } from 'react-icons/ti';
const MovieDetailsPage = () => {
  const [detailMoviData, setDetailMovieData] = useState(null);
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialLocationState = useRef(location.state);
  const query = initialLocationState.current?.query;

  useEffect(() => {
    const fetchDetailsMovie = async () => {
      try {
        const detailsMovi = await getDetailsMovieData(movieId);
        setDetailMovieData(detailsMovi);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetailsMovie();
  }, [movieId]);

  if (!detailMoviData) {
    return;
  }
  const {
    genres,
    overview,
    poster_path,
    release_date,
    runtime,
    vote_average,
    title,
    status,
  } = detailMoviData;

  function getReleseData(release_date) {
    const date = new Date(release_date);

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
  }

  const handleGoBack = () => {
    const from = initialLocationState.current?.from;
    if (from === '/movies') {
      navigate(`${from}?query=${query}`);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <div className={s.container}>
        <button className={s.wrapper_back} onClick={handleGoBack}>
          <TiArrowBack className={s.svg} />
          Go Back
        </button>
        <div className={s.wrapper_all}>
          <img
            className={s.img}
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
            alt={title}
          />
          <div className={s.wrapper_info_all}>
            <h2 className={s.title}>{title}</h2>
            <p className={s.score}>{`User Score: ${(
              (vote_average / 10) *
              100
            ).toFixed(0)}%`}</p>
            <p className={s.status}>{`Status: ${status}`}</p>
            <div className={s.wrapper_overiev}>
              <h3 className={s.overview_title}>Overviev</h3>
              <p className={s.overview}>{overview}</p>
            </div>
            <div className={s.wrapper_genres}>
              <h3 className={s.genres_title}>Genres</h3>
              <p className={s.genres}>
                {genres.map(item => item.name).join(', ')}
              </p>
            </div>
            <div className={s.wrapper_runtime}>
              <h3 className={s.runtime_title}>Runtime</h3>
              <p className={s.runtime}>{`${runtime} min`}</p>
            </div>
            <div className={s.wrapper_relise}>
              <h3 className={s.release_title}>Release date</h3>
              <p className={s.release}>{getReleseData(release_date)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={s.line}></div>
      <div className={s.wrapper_link}>
        <Link className={s.link} to="cast">
          Cast
        </Link>
        <Link className={s.link} to="reviews">
          Reviews
        </Link>
      </div>
      <div className={s.wrapper_cast_reviews}>
        <Outlet />
      </div>
    </>
  );
};

export default MovieDetailsPage;
