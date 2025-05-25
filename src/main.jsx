import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from '../src/components/Router/Router';
import SkeletonLoaders from './components/SkeletonLoaders/SkeletonLoaders';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<SkeletonLoaders />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);