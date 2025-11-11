import {Box, Container, Typography, Grid2} from '@mui/material';
import CategoryCard from '../../components/assortmentComp/CategoryCard.tsx';
import { CATEGORIES } from '../../constants/categories.ts';
import underlineYellow1 from '../../images/stripesImages/underlineYellow1.png'
import underlineYellow2 from '../../images/stripesImages/underlineYellow2.png'
import { useNavigate } from 'react-router-dom';

const Assortment = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (categoryId: number) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <Box component="section" sx={{ py: 15, backgroundColor: 'white' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 12 }}>
                    <Typography
                        sx={{
                            display: 'inline-block',
                            fontFamily: '"Rubik", sans-serif',
                            fontWeight: 700,
                            color: 'white',
                            backgroundColor: '#472C2C',
                            borderRadius: 50,
                            px: 3,
                            py: 1,
                            fontSize: '0.9rem',
                            mb: 2
                        }}
                    >
                        АССОРТИМЕНТ
                    </Typography>

                    <Typography component="div" sx={{ fontFamily: '"Rubik", sans-serif', fontWeight: 700, color: '#472C2C', fontSize: '40px', lineHeight: 1 }}>
                        <Box>
                            ПРОДУКЦИЯ{' '}
                            <Box component="span" sx={{ color: '#20924B', position: 'relative' }}>
                                В НАЛИЧИИ
                                <Box component="img" src={underlineYellow1} sx={{ position: 'absolute', bottom: 4, left: -30, width: '115%'}} />
                            </Box>
                        </Box>

                        <Box sx={{ position: 'relative' }}>
                            В НАШИХ МАГАЗИНАХ
                            <Box component="img" src={underlineYellow2} sx={{ position: 'absolute', bottom: -3, left: '28%', width: '30%' }} />
                        </Box>
                    </Typography>
                </Box>

                <Grid2 container spacing={2}>
                    {CATEGORIES.map((category) => (
                        <Grid2 key={category.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <CategoryCard
                                image={category.image}
                                title={category.title}
                                subtitle={category.subtitle}
                                onClick={() => handleCategoryClick(category.id)}
                            />
                        </Grid2>
                    ))}
                </Grid2>
            </Container>
        </Box>
    );
};

export default Assortment;