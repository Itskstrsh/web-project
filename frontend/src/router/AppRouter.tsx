import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../components/Admin/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../components/HomePage/HomePage';
import AssortmentPage from '../components/Menu/AssortmentPage';

const LazyAllReviewsPage = React.lazy(() => import('../components/Reviews/AllReviewsPage'));
const LazyAdminPage = React.lazy(() => import('../components/Admin/AdminPage'));
const LazyAddProductForm = React.lazy(() => import('../components/Admin/AddProductForm'));
const LazyAddCategoryForm = React.lazy(() => import('../components/Admin/AddCategoryForm'));
const LazyAdminLogin = React.lazy(() => import('../components/Admin/AdminLogin'));

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assortment" element={<AssortmentPage />} />
            <Route path="/assortment/:category" element={<AssortmentPage />} />
            <Route
                path="/reviews"
                element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <LazyAllReviewsPage />
                    </Suspense>
                }
            />
            <Route path="/pelmeni" element={<AssortmentPage />} />
            <Route path="/vareniki" element={<AssortmentPage />} />
            <Route path="/bakery" element={<AssortmentPage />} />
            <Route path="/desserts" element={<AssortmentPage />} />
            <Route path="/polupoker" element={<AssortmentPage />} />
            <Route
                path="/admin/login"
                element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <LazyAdminLogin />
                    </Suspense>
                }
            />
            <Route
                path="/admin"
                element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    </Suspense>
                }
            >
                <Route index element={<LazyAdminPage />} />
                <Route path="product/add" element={<LazyAddProductForm />} />
                <Route path="category/add" element={<LazyAddCategoryForm />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;