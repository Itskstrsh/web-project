import { Avatar, Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import type { Review } from '../../types/review';
import PhotoModal from './PhotoModal';
import ImageWithError from './ImageWithError';

const StyledCard = styled(Box)<{ $compact?: boolean }>(({ theme, $compact }) => ({
    borderRadius: '20px',
    padding: '24px',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    transition: 'box-shadow 0.3s ease',
    ...($compact ? {
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: '100%',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
        },
    } : {
        height: '420px',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            minHeight: 'auto',
            height: 'auto',
        },
    }),
    '&:hover': {
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    },
}));

const StyledAvatar = styled(Avatar)({
    width: 56,
    height: 56,
    backgroundColor: '#4caf50',
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: 600,
});

const StarsContainer = styled(Box)({
    display: 'flex',
    gap: '4px',
    marginTop: '8px',
    marginBottom: '8px',
});

interface ReviewCardProps {
    review: Review;
    compact?: boolean;
    showPhotosInline?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, compact = false, showPhotosInline = false }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isExpanded, setIsExpanded] = useState(false);
    const [photoModalOpen, setPhotoModalOpen] = useState(false);
    const APPROX_CHARS_PER_4_LINES = 200;
    const shouldTruncate = !compact && review.text.length > APPROX_CHARS_PER_4_LINES;
    const hasPhotos = review.photos && review.photos.length > 0;

    const getInitials = (name: string) => {
        const parts = name.split(' ');
        return (parts.length >= 2 ? parts[0][0] + parts[1][0] : name[0]).toUpperCase();
    };

    const renderStars = () => Array.from({ length: 5 }, (_, i) => {
        const filled = i + 1 <= review.rating;
        const Icon = filled ? StarIcon : StarBorderIcon;
        return <Icon key={i + 1} sx={{ color: filled ? '#ffc107' : '#e0e0e0', fontSize: '20px' }} />;
    });

    const photoBoxStyles = {
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.02)' },
    };

    const renderPhotosInline = () => {
        if (!hasPhotos) return null;
        
        const photos = review.photos!;
        const photoCount = photos.length;
        const containerStyles = isMobile 
            ? { width: '80%', alignSelf: 'center' as const }
            : { flex: '0 0 200px', minWidth: '200px' };

        if (photoCount === 1) {
            return (
                <Box
                    {...containerStyles}
                    sx={{
                        minHeight: isMobile ? '180px' : '200px',
                        maxHeight: isMobile ? '220px' : undefined,
                        flex: isMobile ? undefined : '0 0 250px',
                        minWidth: isMobile ? undefined : '250px',
                        ...photoBoxStyles,
                    }}
                    onClick={() => setPhotoModalOpen(true)}
                >
                    <ImageWithError
                        src={photos[0]}
                        alt="Фото из отзыва"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: isMobile ? '180px' : '200px' }}
                    />
                </Box>
            );
        }

        if (photoCount === 2) {
            return (
                <Box {...containerStyles} sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                    {photos.slice(0, 2).map((photo, i) => (
                        <Box key={i} onClick={() => setPhotoModalOpen(true)} sx={{ flex: 1, maxHeight: isMobile ? '160px' : 'none', ...photoBoxStyles }}>
                            <ImageWithError src={photo} alt={`Фото ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                    ))}
                </Box>
            );
        }

        return (
            <Box {...containerStyles} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box onClick={() => setPhotoModalOpen(true)} sx={{ flex: '0 0 60%', ...photoBoxStyles }}>
                    <ImageWithError src={photos[0]} alt="Фото 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
                    {photos.slice(1, 3).map((photo, i) => (
                        <Box key={i} onClick={() => setPhotoModalOpen(true)} sx={{ flex: 1, position: 'relative', ...photoBoxStyles }}>
                            <ImageWithError src={photo} alt={`Фото ${i + 2}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            {i === 1 && photoCount > 3 && (
                                <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                    +{photoCount - 3}
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
        );
    };

    const renderHeader = () => (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
            <StyledAvatar>
                {review.avatar ? (
                    <img src={review.avatar} alt={review.authorName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    getInitials(review.authorName)
                )}
            </StyledAvatar>
            <Box sx={{ flex: 1 }}>
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        color: '#064e3b',
                        mb: 0.5,
                    }}
                >
                    {review.authorName}
                </Typography>
                {review.authorBadge && (
                    <Typography
                        variant="caption"
                        sx={{
                            color: '#666',
                            fontSize: '0.85rem',
                            display: 'block',
                            mb: 0.5,
                        }}
                    >
                        {review.authorBadge}
                    </Typography>
                )}
                <StarsContainer>{renderStars()}</StarsContainer>
                <Typography
                    variant="caption"
                    sx={{
                        color: '#999',
                        fontSize: '0.85rem',
                    }}
                >
                    {review.date}
                </Typography>
            </Box>
        </Box>
    );

    const renderText = () => (
        <Typography
            sx={{
                color: '#333',
                lineHeight: 1.6,
                fontSize: '1rem',
                flex: 1,
                ...(compact && !isMobile && {
                    maxHeight: '96px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                }),
            }}
        >
            {review.text}
        </Typography>
    );

    if (showPhotosInline && compact) {
        return (
            <>
                <StyledCard $compact={!isMobile}>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                        {renderHeader()}
                        {renderText()}
                        {hasPhotos && isMobile && (
                            <Box sx={{ mt: 2 }}>
                                {renderPhotosInline()}
                            </Box>
                        )}
                    </Box>
                    {hasPhotos && !isMobile && renderPhotosInline()}
                </StyledCard>
                {hasPhotos && <PhotoModal photos={review.photos!} open={photoModalOpen} onClose={() => setPhotoModalOpen(false)} />}
            </>
        );
    }

    return (
        <StyledCard $compact={false}>
            {renderHeader()}
            {hasPhotos && !showPhotosInline && (
                <Box sx={{ mb: 2 }}>
                    <Button
                        startIcon={<PhotoCameraIcon />}
                        onClick={() => setPhotoModalOpen(true)}
                        sx={{
                            textTransform: 'none',
                            color: '#4caf50',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            padding: '6px 12px',
                            '&:hover': {
                                backgroundColor: 'rgba(76, 175, 80, 0.08)',
                            },
                        }}
                    >
                        Посмотреть изображение{review.photos!.length > 1 && ` (${review.photos!.length})`}
                    </Button>
                </Box>
            )}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: shouldTruncate ? 'pointer' : 'default',
                        minHeight: 0,
                        ...(isExpanded && !isMobile && {
                            maxHeight: '200px',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            pr: 1,
                            '&::-webkit-scrollbar': {
                                width: '6px',
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: '#f1f1f1',
                                borderRadius: '3px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#888',
                                borderRadius: '3px',
                                '&:hover': {
                                    backgroundColor: '#555',
                                },
                            },
                        }),
                    }}
                    onClick={() => shouldTruncate && setIsExpanded(!isExpanded)}
                >
                    <Typography
                        sx={{
                            color: '#333',
                            lineHeight: 1.6,
                            fontSize: '1rem',
                            ...((shouldTruncate && !isExpanded || compact) && {
                                maxHeight: '96px',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: 'vertical',
                                ...(shouldTruncate && !isExpanded && { minHeight: '96px' }),
                            }),
                        }}
                    >
                        {review.text}
                    </Typography>
                </Box>
                {shouldTruncate && (
                    <Box
                        component="span"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                        }}
                        sx={{
                            color: '#4caf50',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            marginTop: '4px',
                            cursor: 'pointer',
                            display: 'inline-block',
                            flexShrink: 0,
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        {isExpanded ? 'свернуть' : 'ещё'}
                    </Box>
                )}
            </Box>
            {hasPhotos && <PhotoModal photos={review.photos!} open={photoModalOpen} onClose={() => setPhotoModalOpen(false)} />}
        </StyledCard>
    );
};

export default ReviewCard;