import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import PropertiesPage from '@/components/pages/PropertiesPage';
import PropertyDetailPage from '@/components/pages/PropertyDetailPage';
import TeamPage from '@/components/pages/TeamPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "sobre",
        element: <AboutPage />,
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "imoveis",
        element: <PropertiesPage />,
        routeMetadata: {
          pageIdentifier: 'properties',
        },
      },
      {
        path: "imoveis/:id",
        element: <PropertyDetailPage />,
        routeMetadata: {
          pageIdentifier: 'property-detail',
        },
      },
      {
        path: "equipe",
        element: <TeamPage />,
        routeMetadata: {
          pageIdentifier: 'team',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
