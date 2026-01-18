import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from 'react';

interface ReviewsNavigationProps {
    onPrev: () => void;
    onNext: () => void;
}

const ReviewsNavigation: React.FC<ReviewsNavigationProps> = ({ onPrev, onNext }) => {
    const buttonStyles = {
        position: 'absolute' as const,
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        '&:hover': { backgroundColor: '#f5f5f5' },
        zIndex: 2,
    };

    return (
        <>
            <IconButton onClick={onPrev} sx={{ ...buttonStyles, left: { xs: 0, md: -20 } }}>
                <ChevronLeftIcon />
            </IconButton>
            <IconButton onClick={onNext} sx={{ ...buttonStyles, right: { xs: 0, md: -20 } }}>
                <ChevronRightIcon />
            </IconButton>
        </>
    );
};

export default ReviewsNavigation;
