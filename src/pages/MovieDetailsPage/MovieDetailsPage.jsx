import { useEffect, useState } from 'react';
import s from './MovieDetailsPage.module.css';
import { Link, useParams } from 'react-router-dom';
import { getDetailsMovieData } from '../../services/api';
const MovieDetailsPage = () => {
  const [detailMoviData, setDetailMovieData] = useState(null);
  const { movieId } = useParams();

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
  } = detailMoviData;

  function getReleseData(release_date) {
    const date = new Date(release_date);

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
  }

  return (
    <div>
      <div>
        <Link to={'/'}></Link>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
            alt={title}
          />
        </div>
        <div>
          <h2>{title}</h2>
          <p>{`${((vote_average / 10) * 100).toFixed(0)}%`}</p>
          <div>
            <h3>Overviev</h3>
            <p>{overview}</p>
          </div>
          <div>
            <h3>Genres</h3>
            <p>{genres.map(item => item.name).join(', ')}</p>
          </div>
          <div>
            <h3>Runtime</h3>
            <p>{`${runtime} min`}</p>
          </div>
          <div>
            <h3>Release date</h3>
            <p>{getReleseData(release_date)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
