import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

interface ImageWithErrorProps {
    src: string;
    alt: string;
    style?: React.CSSProperties;
    className?: string;
}

const ImageWithError: React.FC<ImageWithErrorProps> = ({ src, alt, style, className }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                    color: '#999',
                    padding: 2,
                    textAlign: 'center',
                    ...style,
                }}
                className={className}
            >
                <Typography sx={{ fontSize: '0.9rem' }}>
                    упс, что-то пошло не так :(
                </Typography>
            </Box>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            style={style}
            className={className}
            onError={() => setHasError(true)}
        />
    );
};

export default ImageWithError;