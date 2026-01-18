// router/AppRouter.tsx
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../components/Admin/AdminLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import ProtectedRoute from './ProtectedRoute';

// Public pages (NO lazy)
import HomePage from '../components/HomePage/HomePage';
import AssortmentPage from '../components/Menu/AssortmentPage';

// Reviews (lazy)
const LazyAllReviewsPage = React.lazy(() => import('../components/Reviews/AllReviewsPage'));

// Cart (lazy)
const LazyCartPage = React.lazy(() => import('../components/Cart/CartPage'));

// Admin (lazy)
const LazyAdminPage = React.lazy(() => import('../components/Admin/AdminPage'));
const LazyAddProductForm = React.lazy(() => import('../components/Admin/AddProductForm'));
const LazyAddCategoryForm = React.lazy(() => import('../components/Admin/AddCategoryForm'));
const LazyAdminLogin = React.lazy(() => import('../components/Admin/AdminLogin'));

const AppRouter: React.FC = () => {
    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<HomePage />} />

            {/* Assortment */}
            <Route path="/assortment" element={<AssortmentPage />} />
            <Route path="/assortment/:category" element={<AssortmentPage />} />

            {/* Reviews */}
            <Route
                path="/reviews"
                element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <LazyAllReviewsPage />
                    </Suspense>
                }
            />

            {/* Cart */}
            <Route
                path="/cart"
                element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <LazyCartPage />
                    </Suspense>
                }
            />

            {/* Category aliases (NO Navigate → NO lag) */}
            <Route path="/pelmeni" element={<AssortmentPage />} />
            <Route path="/vareniki" element={<AssortmentPage />} />
            <Route path="/bakery" element={<AssortmentPage />} />
            <Route path="/desserts" element={<AssortmentPage />} />
            <Route path="/polupoker" element={<AssortmentPage />} />

            {/* Admin login */}
            <Route
                path="/admin/login"
                element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <LazyAdminLogin />
                    </Suspense>
                }
            />

            {/* Admin */}
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

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;