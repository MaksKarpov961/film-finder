import { Field, Form, Formik } from 'formik';
import s from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import { getSearchMovie } from '../../services/api';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchMovie, setSearchMovie] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setISError] = useState(false);
  const [errorCode, setErrorCode] = useState('');

  const handleClear = () => {
    setSearchMovie([]);
    setQuery('');
    setPage(1);
    setSearchParams({});
    localStorage.removeItem('query');
    setLoadMore(false);
    setISError(false);
  };

  const initionalValues = {
    query: '',
  };
  const handleSubmit = (values, options) => {
    const newQuery = values.query.trim().toLowerCase();
    if (newQuery === query) {
      return toast.error('This request is currently on the screen');
    }
    setSearchMovie([]);
    setPage(1);
    setLoadMore(false);
    setSearchParams({ query: newQuery });

    setQuery(newQuery);
    localStorage.setItem('query', newQuery);
    options.resetForm();
  };

  useEffect(() => {
    const oldQuery = localStorage.getItem('query');
    if (oldQuery) {
      setSearchParams({ query: oldQuery });
    } else {
      return;
    }
  }, [setSearchParams]);

  const urlQuery = searchParams.get('query') || '';

  useEffect(() => {
    if (!urlQuery) {
      setSearchMovie([]);
      setQuery('');
      return;
    }
    setQuery(urlQuery);
    localStorage.setItem('query', urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    if (!query) return;
    setISError(false);
    setErrorCode('');
    const fetchSearchMovie = async () => {
      try {
        setIsLoader(true);
        const { total_pages, results } = await getSearchMovie(query, page);
        setLoadMore(page < total_pages);

        setSearchMovie(prevResult => [...prevResult, ...results]);
      } catch (error) {
        toast.error(error.message);
        setISError(true);
        setErrorCode(`${error.status}`);
      } finally {
        setIsLoader(false);
      }
    };
    fetchSearchMovie();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={s.container}>
      <div className={s.form_wrapper}>
        <Formik initialValues={initionalValues} onSubmit={handleSubmit}>
          <Form className={s.form}>
            <Field className={s.input} name="query" placeholder="Search film" />
            <button className={s.btn_submite} type="submite">
              <FaSearch className={s.svg} />
            </button>
          </Form>
        </Formik>
        <button className={s.clear} type="button" onClick={handleClear}>
          Clear
        </button>
      </div>

      {query && <MovieList movieList={searchMovie} query={query} />}
      {isLoader && <Loader type={'magnifyingGlass'} />}
      {isError && <ErrorMessage type={errorCode} />}
      {loadMore && (
        <button className={s.load_more} type="button" onClick={handleLoadMore}>
          LoadMore
        </button>
      )}
    </div>
  );
};

export default MoviesPage;
