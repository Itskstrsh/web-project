import { Box } from '@mui/material';
import React, { useState, useMemo } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { reviewsData } from '../../data/reviewsData';
import { SectionContainer } from '../components/FAQ/FaqSection';
import ReviewsCarousel from '../components/Reviews/ReviewsCarousel';
import ReviewsNavigation from '../components/Reviews/ReviewsNavigation';
import ReviewsTitle from '../components/Reviews/ReviewsTitle';
import ViewAllButton from '../components/Reviews/ViewAllButton';

const ReviewsScreen: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const itemsPerPage = isMobile ? 1 : 3;
    
    const shuffledReviews = useMemo(() => {
        const shuffled = [...reviewsData];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, []);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalPages = Math.ceil(shuffledReviews.length / itemsPerPage);
    const currentReviews = shuffledReviews.slice(currentIndex * itemsPerPage, currentIndex * itemsPerPage + itemsPerPage);

    return (
        <SectionContainer id="reviews">
            <ReviewsTitle />
            <Box sx={{ position: 'relative', mb: 4, px: { xs: 6, md: 8 } }}>
                <ReviewsCarousel reviews={currentReviews} currentIndex={currentIndex} />
                {shuffledReviews.length > 0 && totalPages > 1 && (
                    <ReviewsNavigation
                        onPrev={() => setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)}
                        onNext={() => setCurrentIndex((prev) => (prev + 1) % totalPages)}
                    />
                )}
            </Box>
            <ViewAllButton />
        </SectionContainer>
    );
};

export default ReviewsScreen;