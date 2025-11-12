// router/AppRouter.tsx
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

// Lazy components
const LazyHomePage = React.lazy(() => import('../components/HomePage/HomePage'));
const LazyAssortmentPage = React.lazy(() => import('../components/Menu/AssortmentPage'));

const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<LazyHomePage />} />
        <Route path="/assortment" element={<LazyAssortmentPage />} />
        <Route path="/assortment/:category" element={<LazyAssortmentPage />} />
        
        {/* Redirect old routes to assortment with filters */}
        <Route path="/pelmeni" element={<Navigate to="/assortment/pelmeni" replace />} />
        <Route path="/vareniki" element={<Navigate to="/assortment/vareniki" replace />} />
        <Route path="/bakery" element={<Navigate to="/assortment/bakery" replace />} />
        <Route path="/desserts" element={<Navigate to="/assortment/desserts" replace />} />
        <Route path="/polupoker" element={<Navigate to="/assortment/polupoker" replace />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;