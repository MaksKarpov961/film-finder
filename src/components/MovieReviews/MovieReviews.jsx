import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewsMovie } from '../../services/api';
import s from './MovieReviews.module.css';

const MovieReviews = () => {
  const [reviewsData, setReviewsData] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const data = await getReviewsMovie(movieId);
        setReviewsData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieReviews();
  }, [movieId]);
  if (!reviewsData) return;
  const { results } = reviewsData;

  const getData = isoDate => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDate;
  };

  return (
    <>
      {results.length === 0 ? (
        <div>There are currently no reviews</div>
      ) : (
        <ul className={s.list}>
          {results.map(({ id, author, content, created_at, updated_at }) => (
            <li key={id}>
              <h3>
                Author: <span>{author}</span>
              </h3>
              <h4>
                Data created <span>{getData(created_at)}</span>
              </h4>
              <p>{content}</p>
              {updated_at && <p>{`Data Updated ${getData(updated_at)}`}</p>}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
