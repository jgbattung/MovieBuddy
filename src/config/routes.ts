import IRoute from "../interfaces/routes";
import Favorites from "../pages/Favorites";
import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import UserProfile from "../pages/UserProfile";
import LoginPage from "../pages/LoginPage";

const routes: IRoute[] = [
  {
    path: '/',
    name: 'Landing Page',
    component: LandingPage,
    exact: true,
  },
  {
    path: '/login',
    name: 'Authentication Page',
    component: LoginPage,
    exact: true,
  },
  {
    path: '/homepage',
    name: 'Home Page',
    component: HomePage,
    exact: true,
  },
  {
    path: '/profile',
    name: 'Profile Page',
    component: UserProfile,
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