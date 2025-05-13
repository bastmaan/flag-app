// Router.jsx
import { createBrowserRouter } from 'react-router-dom';
import App from '../../App.jsx'
import HomePage from '../../pages/HomePage/HomePage.jsx';
import { homeLoader } from '../../pages/loaders.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // OBS: App här innehåller INTE BrowserRouter längre
    children: [
      {
        index: true, // motsvarar path: '/'
        element: <HomePage />,
        loader: homeLoader,
      },
    ],
  },
]);

export default router;