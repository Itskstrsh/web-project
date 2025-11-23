// router/AppRouter.tsx
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import AdminLayout from '../components/Admin/AdminLayout';

// Lazy components
const LazyHomePage = React.lazy(() => import('../components/HomePage/HomePage'));
const LazyAssortmentPage = React.lazy(() => import('../components/Menu/AssortmentPage'));
const LazyAdminPage = React.lazy(() => import('../components/Admin/AdminPage'));
const LazyAddProductForm = React.lazy(() => import('../components/Admin/AddProductForm'));
const LazyAddCategoryForm = React.lazy(() => import('../components/Admin/AddCategoryForm'));

const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LazyHomePage />} />
        <Route path="/assortment" element={<LazyAssortmentPage />} />
        <Route path="/assortment/:category" element={<LazyAssortmentPage />} />
        
        {/* Redirect old routes to assortment with filters */}
        <Route path="/pelmeni" element={<Navigate to="/assortment/pelmeni" replace />} />
        <Route path="/vareniki" element={<Navigate to="/assortment/vareniki" replace />} />
        <Route path="/bakery" element={<Navigate to="/assortment/bakery" replace />} />
        <Route path="/desserts" element={<Navigate to="/assortment/desserts" replace />} />
        <Route path="/polupoker" element={<Navigate to="/assortment/polupoker" replace />} />
        
        {/* Admin routes - separate layout without Header/Footer */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<LazyAdminPage />} />
          <Route path="product/add" element={<LazyAddProductForm />} />
          <Route path="category/add" element={<LazyAddCategoryForm />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;