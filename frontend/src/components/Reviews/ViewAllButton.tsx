import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewAllButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
                variant="outlined"
                onClick={() => navigate('/reviews')}
                sx={{
                    borderColor: '#4caf50',
                    color: '#4caf50',
                    fontWeight: 600,
                    paddingX: 4,
                    paddingY: 1.5,
                    '&:hover': {
                        borderColor: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.04)',
                    },
                }}
            >
                Посмотреть все отзывы
            </Button>
        </Box>
    );
};

export default ViewAllButton;
