import { Box, Typography } from '@mui/material';

const LoadingState = () => {
    return (
        <Box sx={{
            py: 8,
            textAlign: 'center',
            minHeight: '80vh',
            backgroundColor: 'white'
        }}>
            <Typography>Загрузка...</Typography>
        </Box>
    );
};

export default LoadingState;