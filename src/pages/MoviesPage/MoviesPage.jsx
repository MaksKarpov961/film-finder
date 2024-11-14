import { Field, Form, Formik } from 'formik';
import s from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import { getSearchMovie } from '../../services/api';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchMovie, setSearchMovie] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const initionalValues = {
    query: '',
  };
  const handleSubmit = (values, options) => {
    setQuery(values.query);
    options.resetForm();
  };

  useEffect(() => {
    const fetchSearchMovie = async () => {
      try {
        if (!query) {
          return;
        }
        const { total_pages, results } = await getSearchMovie(query, page);
        setLoadMore(page < total_pages);

        setSearchMovie(prevResult => [...prevResult, ...results]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSearchMovie();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  return (
    <div className={s.container}>
      <Formik initialValues={initionalValues} onSubmit={handleSubmit}>
        <Form>
          <Field name="query" placeholder="Search film" />
          <button type="submite">Search</button>
        </Form>
      </Formik>
      <MovieList movieList={searchMovie} />
      {loadMore && (
        <button className={s.load_more} type="button" onClick={handleLoadMore}>
          LoadMore
        </button>
      )}
    </div>
  );
};

export default MoviesPage;
