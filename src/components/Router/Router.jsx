// Router.jsx
import { createBrowserRouter } from 'react-router-dom';
import App from '../../App.jsx'
import HomePage from '../../pages/HomePage/HomePage.jsx';
import CountryPage from '../../pages/CountryPage/CountryPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // OBS: App här innehåller INTE BrowserRouter längre
    errorElement: <div>Error loading page</div>,
    children: [
      {
        index: true, // motsvarar path: '/'
        element: <HomePage />,
        errorElement: <div>Error loading countries</div>,
        shouldRevalidate: () => false
      },
      {
        path: 'country/:countryName',
        element: <CountryPage />,
        errorElement: <div>Error loading country</div>,
      },
    ],
  },
]);

export default router;