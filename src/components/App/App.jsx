import { Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import Navigation from '../Navigation/Navigation';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <>
      <Toaster />
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
