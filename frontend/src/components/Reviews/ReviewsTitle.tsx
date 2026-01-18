import { Typography } from '@mui/material';
import React from 'react';

const ReviewsTitle: React.FC = () => (
    <Typography
        variant="h2"
        component="h1"
        sx={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
            color: '#064e3b',
            mb: 6,
        }}
    >
        ОТЗЫВЫ
    </Typography>
);

export default ReviewsTitle;
