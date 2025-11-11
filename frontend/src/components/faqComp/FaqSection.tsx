import React from 'react';
import { Box, type BoxProps } from '@mui/material';

interface SectionContainerProps extends BoxProps {
    children: React.ReactNode;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({ children, ...props }) => {
    return (
        <Box
            sx={{
                py: 15,
                px: 2,
                maxWidth: 1200,
                margin: '0 auto',
                ...props.sx
            }}
            {...props}
        >
            {children}
        </Box>
    );
};