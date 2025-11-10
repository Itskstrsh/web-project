import { Box, Typography, Card } from '@mui/material';

interface CategoryCardProps {
    image: string;
    title: string;
    subtitle: string;
}

const CategoryCard = ({ image, title, subtitle }: CategoryCardProps) => {
    return (
        <Card
            sx={{
                cursor: 'pointer',
                transition: 'transform 0.3s',
                borderRadius: '20px',
                '&:hover': {
                    transform: 'translateY(-2px)'
                }
            }}
        >
            <Box sx={{
                position: 'relative',
                paddingBottom: '100%',
            }}>
                <Box
                    component="img"
                    src={image}
                    alt={title}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />

                {/* Текст поверх картинки */}
                <Box sx={{
                    position: 'absolute',
                    px: 3,
                    py: 2,
                    color: 'white'
                }}>
                    <Typography
                        sx={{
                            fontSize: '0.7rem',
                            mb: 2,
                            fontFamily: '"Rubik", sans-serif',
                            fontWeight: 700,
                            backgroundColor: 'white',
                            color: '#20924B',
                            borderRadius: '20px',
                            display: 'inline-block', // ← это заставляет обводку быть по длине текста
                            px: 2, // ← отступы справа и слева
                            py: 0.2, // ← отступы сверху и снизу
                        }}
                    >
                        {subtitle}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: '"Rubik", sans-serif',
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            lineHeight: 1.1
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default CategoryCard;