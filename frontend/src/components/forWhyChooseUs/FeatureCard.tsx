import { Box, Typography } from '@mui/material';

interface FeatureCardProps {
    title: string;
    centerText?: boolean;
}

const FeatureCard = ({ title, centerText = false }: FeatureCardProps) => (
    <Box sx={{
        p: 1.2,
        borderRadius: 50,
        backgroundColor: 'rgb(255,255,255)',
        transition: 'all 0.3s ease',
        px: 4,
        '&:hover': {
            transform: 'translateY(-2px)',
        }
    }}>
        <Typography
            sx={{
                fontFamily: '"Rubik", Arial, sans-serif',
                fontWeight: 500,
                color: 'black',
                textAlign: centerText ? 'center' : 'left',
                fontSize: '16px',
                lineHeight: '20px',
                paddingLeft: centerText ? 0 : 2,
                width: '100%',
            }}
        >
            {title}
        </Typography>
    </Box>
);

export default FeatureCard;