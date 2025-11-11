import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import type { Product } from '../../types/data.ts';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                }
            }}
        >
            <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                    aspectRatio: '1/1', // Квадратное изображение
                    objectFit: 'cover',
                    width: '100%'
                }}
            />

            <CardContent sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                p: 2
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: '"Rubik", sans-serif',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: 1.3,
                        mb: 1,
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {product.name}
                </Typography>

                {product.composition && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mb: 2,
                            fontSize: '12px',
                            lineHeight: 1.2,
                            minHeight: '60px',
                            display: 'flex',
                            alignItems: 'flex-start'
                        }}
                    >
                        Состав: {product.composition}
                    </Typography>
                )}

                <Box sx={{ mt: 'auto', pt: 1 }}>
                    {product.nutrition && (
                        <>
                            <Typography variant="body2" sx={{ fontSize: '11px', mb: 0.5 }}>
                                Б: {product.nutrition.protein}г · Ж: {product.nutrition.fat}г · У: {product.nutrition.carbs}г
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '11px', color: 'text.secondary' }}>
                                {product.nutrition.calories} ккал/100г
                            </Typography>
                        </>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;