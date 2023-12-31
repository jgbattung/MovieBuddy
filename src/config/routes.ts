import IRoute from "../interfaces/routes";
import Favorites from "../pages/FavoritesPage";
import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";

const routes: IRoute[] = [
  {
    path: '/',
    name: 'Landing Page',
    component: LandingPage,
    exact: true,
  },
  {
    path: '/login',
    name: 'Login Page',
    component: LoginPage,
    exact: true,
  },
  {
    path: '/registration',
    name: 'Registration Page',
    component: RegistrationPage,
    exact: true,
  },
  {
    path: '/homepage',
    name: 'Home Page',
    component: HomePage,
    exact: true,
  },
  {
    path: '/favorites',
    name: 'Favorites Page',
    component: Favorites,
    exact: true,
  },
  {
    path: '/moviedetail/:movieId',
    name: 'Movie Detail Page',
    component: MovieDetailPage,
    exact: true,
  },
]

export default routes;