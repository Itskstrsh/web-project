import { Typography } from '@mui/material';

interface CategoryHeaderProps {
    title: string;
}

const CategoryHeader = ({ title }: CategoryHeaderProps) => {
    return (
        <Typography
            sx={{
                color: '#20924b',
                fontSize: '40px',
                fontFamily: 'Rubik, sans-serif',
                fontWeight: 600,
                textAlign: 'center',
                mb: 6,
                mt: 2,
            }}
        >
            {title}
        </Typography>
    );
};

export default CategoryHeader;