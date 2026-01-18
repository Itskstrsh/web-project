import { Box, Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React, { useState } from 'react';

interface PhotoModalProps {
    photos: string[];
    open: boolean;
    onClose: () => void;
    initialIndex?: number;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ photos, open, onClose, initialIndex = 0 }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [imageError, setImageError] = useState(false);

    const handleIndexChange = (newIndex: number) => {
        setImageError(false);
        setCurrentIndex(newIndex);
    };

    const handleNext = () => handleIndexChange((currentIndex + 1) % photos.length);
    const handlePrev = () => handleIndexChange((currentIndex - 1 + photos.length) % photos.length);
    const handleClose = () => {
        setCurrentIndex(initialIndex);
        setImageError(false);
        onClose();
    };
    const handleImageError = () => setImageError(true);

    if (photos.length === 0) return null;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={false}
            PaperProps={{
                sx: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    boxShadow: 'none',
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    width: 'auto',
                    height: 'auto',
                },
            }}
        >
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 3,
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {photos.length > 1 && (
                    <>
                        {[
                            { Icon: ChevronLeftIcon, onClick: handlePrev, sx: { left: 8 } },
                            { Icon: ChevronRightIcon, onClick: handleNext, sx: { right: 8 } },
                        ].map(({ Icon, onClick, sx }, i) => (
                            <IconButton
                                key={i}
                                onClick={onClick}
                                sx={{
                                    position: 'absolute',
                                    ...sx,
                                    color: 'white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    zIndex: 3,
                                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                                }}
                            >
                                <Icon />
                            </IconButton>
                        ))}
                    </>
                )}

                <Box
                    sx={{
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '300px',
                    }}
                >
                    {imageError ? (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                padding: 4,
                            }}
                        >
                            <Typography sx={{ fontSize: '1.1rem' }}>
                                упс, что-то пошло не так :(
                            </Typography>
                        </Box>
                    ) : (
                        <img
                            src={photos[currentIndex]}
                            alt={`Фото ${currentIndex + 1} из ${photos.length}`}
                            onError={handleImageError}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '90vh',
                                objectFit: 'contain',
                            }}
                        />
                    )}
                </Box>

                {photos.length > 1 && (
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: '4px 12px',
                            borderRadius: '16px',
                            fontSize: '0.875rem',
                        }}
                    >
                        {currentIndex + 1} / {photos.length}
                    </Box>
                )}
            </Box>
        </Dialog>
    );
};

export default PhotoModal;