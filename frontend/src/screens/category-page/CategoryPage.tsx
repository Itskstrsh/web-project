import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import type { Category, Product } from '../../types/data';
import { CATEGORIES_DATA, PRODUCTS_DATA } from '../../constants/mockData';
import CategoryHeader from '../../components/categoriesComp/CategoryHeader';
import CategoryTabs from '../../components/categoriesComp/CategoryTabs';
import ProductsGrid from '../../components/categoriesComp/ProductsGrid';
import LoadingState from '../../components/state/LoadingState';
import ErrorState from '../../components/state/ErrorState';

const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const navigate = useNavigate();
    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [tabValue, setTabValue] = useState<number>(0);

    useEffect(() => {
        const loadData = async (): Promise<void> => {
            setLoading(true);

            window.scrollTo(0, 0);

            setTimeout(() => {
                if (categoryId) {
                    const id = parseInt(categoryId);
                    setCategory(CATEGORIES_DATA[id] || null);
                    setProducts(PRODUCTS_DATA[id] || []);
                }
                setLoading(false);
            }, 300);
        };

        loadData();
    }, [categoryId]);

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return <LoadingState />;
    }

    if (!category) {
        return <ErrorState />;
    }

    return (
        <Box sx={{ py: 6, minHeight: '80vh', backgroundColor: 'white' }}>
            <Container maxWidth="lg">
                <Button
                    onClick={handleBack}
                    sx={{
                        mb: 2,
                        fontFamily: '"Rubik", sans-serif',
                        color: '#1f924b',
                        '&:hover': {
                            backgroundColor: 'rgba(31, 146, 75, 0.1)'
                        }
                    }}
                    startIcon={<ArrowBack />}
                >
                    Назад
                </Button>

                <CategoryHeader title={category.name} />

                <CategoryTabs
                    value={tabValue}
                    onChange={setTabValue}
                    categoryId={parseInt(categoryId!)}
                />

                <ProductsGrid
                    products={products}
                    tabValue={tabValue}
                    categoryId={parseInt(categoryId!)}
                />
            </Container>
        </Box>
    );
};

export default CategoryPage;