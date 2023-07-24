import IRoute from "../interfaces/routes";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";

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
]

export default routes;