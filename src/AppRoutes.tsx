import { Suspense, lazy } from 'react';
import { Outlet, RouteObject, useRoutes } from 'react-router-dom';
const Login = lazy(() => import('./Pages/Login'));
const Register = lazy(() => import('./Pages/Register'));
const Cart = lazy(() => import('./Pages/Cart'));
const Home = lazy(() => import('./Pages/Home'));
const MainLayout = lazy(() => import('./components/MainLayout'));

const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      path: '',
      element: (
        <Suspense fallback={<h1>loading</h1>}>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </Suspense>
      ),
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: '/cart',
          element: <Cart />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
      ],
    },
    {
      path: '*',
      element: <h1>Not found</h1>,
    },
  ];
  return useRoutes(routes);
};

export default AppRoutes;
