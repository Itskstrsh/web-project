import {Typography, Box, Grid2} from '@mui/material';
import type { Product } from '../../types/data.ts';
import ProductCard from './ProductCard.tsx';
import { getTabsConfig } from '../../constants/tabsConfig.ts';

interface ProductsGridProps {
    products: Product[];
    tabValue: number;
    categoryId: number;
}

const filterProductsByTab = (products: Product[], tabValue: number, categoryId: number): Product[] => {
    if (tabValue === 0) return products; // "ВСЕ"

    const tabsConfig = getTabsConfig(categoryId);
    const selectedTab = tabsConfig[tabValue];

    if (!selectedTab || selectedTab.value === 'all') return products;

    return products.filter(product => product.type === selectedTab.value);
};

const ProductsGrid = ({ products, tabValue, categoryId }: ProductsGridProps) => {
    const filteredProducts = filterProductsByTab(products, tabValue, categoryId);

    if (filteredProducts.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ fontFamily: '"Rubik", sans-serif' }}
                >
                    Здесь пока ничего нет
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 1, fontFamily: '"Rubik", sans-serif' }}
                >
                    Скоро появятся новые товары
                </Typography>
            </Box>
        );
    }

    return (
        <Grid2 container spacing={2}>
            {filteredProducts.map((product) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
                    <ProductCard product={product} />
                </Grid2>
            ))}
        </Grid2>
    );
};

export default ProductsGrid;