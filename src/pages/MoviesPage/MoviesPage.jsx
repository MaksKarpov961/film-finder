import { Field, Form, Formik } from 'formik';
import s from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import { getSearchMovie } from '../../services/api';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchMovie, setSearchMovie] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const initionalValues = {
    query: '',
  };
  const handleSubmit = (values, options) => {
    const newQuery = values.query.trim().toLowerCase();
    if (newQuery === query) {
      return alert('This request is currently on the screen');
    }
    setSearchMovie([]);
    setPage(1);
    setLoadMore(false);
    setSearchParams({ query: newQuery });

    setQuery(newQuery);
    options.resetForm();
  };

  const urlQuery = searchParams.get('query') || '';

  useEffect(() => {
    if (!urlQuery) return;
    setSearchMovie([]);
    setQuery(urlQuery);
  }, [urlQuery]);

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
        <Form className={s.form}>
          <Field className={s.input} name="query" placeholder="Search film" />
          <button className={s.btn_submite} type="submite">
            <FaSearch className={s.svg} />
          </button>
        </Form>
      </Formik>
      {query && <MovieList movieList={searchMovie} query={query} />}
      {loadMore && (
        <button className={s.load_more} type="button" onClick={handleLoadMore}>
          LoadMore
        </button>
      )}
    </div>
  );
};

export default MoviesPage;
