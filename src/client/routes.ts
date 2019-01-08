import Root from './Root';
import Home from './Home';
import About from './About';
import NotFound from './NotFound';

export const routes = [
  {
    component: Root,
    path: '/',
    routes: [
      {
        exact: true,
        path: '/home',
        component: Home,
      },
      {
        path: '/about',
        component: About,
      },
    ],
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;
