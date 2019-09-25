import Root from './Root';
import Home from './Home';
import About from './About';
import Redirect from './Redirect';
import NotFound from './NotFound';

export const routes = [
  {
    component: Root,
    path: '/',
    routes: [
      {
        exact: true,
        path: '/',
        component: Home,
      },
      {
        exact: true,
        path: '/about',
        component: About,
      },
      {
        exact: true,
        path: '/404',
        component: NotFound,
      },
      {
        path: '*',
        component: Redirect,
      },
    ],
  },
];

export default routes;
