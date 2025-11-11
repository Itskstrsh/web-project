import { Box, Typography, Card } from '@mui/material';

interface CategoryCardProps {
    image: string;
    title: string;
    subtitle: string;
    onClick?: () => void;
}

const CategoryCard = ({ image, title, subtitle, onClick }: CategoryCardProps) => {
    return (
        <Card
            onClick={onClick}
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
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />

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
                            display: 'inline-block',
                            px: 2,
                            py: 0.2,
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