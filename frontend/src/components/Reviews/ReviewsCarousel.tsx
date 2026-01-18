import { Box } from '@mui/material';
import React from 'react';
import type { Review } from '../../types/review';
import ReviewCard from './ReviewCard';

interface ReviewsCarouselProps {
    reviews: Review[];
    currentIndex: number;
}

const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({ reviews, currentIndex }) => {
    if (reviews.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 8, color: '#999', fontSize: '1.1rem' }}>
                Отзывов пока нет
            </Box>
        );
    }

    return (
        <Box
            key={currentIndex}
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: 4,
                animation: 'fadeIn 0.6s ease-in-out',
                '@keyframes fadeIn': {
                    from: { opacity: 0, transform: 'translateY(20px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
            }}
        >
            {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} compact={false} />
            ))}
        </Box>
    );
};

export default ReviewsCarousel;
