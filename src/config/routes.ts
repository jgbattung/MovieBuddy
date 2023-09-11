import IRoute from "../interfaces/routes";
import AuthPage from "../pages/AuthPage";
import Favorites from "../pages/Favorites";
import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import UserProfile from "../pages/UserProfile";

const routes: IRoute[] = [
  {
    path: '/',
    name: 'Landing Page',
    component: LandingPage,
    exact: true,
  },
  {
    path: '/authentication',
    name: 'Authentication Page',
    component: AuthPage,
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