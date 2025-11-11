import { Box, Typography } from '@mui/material';

const ErrorState = () => {
    return (
        <Box sx={{
            py: 8,
            textAlign: 'center',
            minHeight: '80vh',
            backgroundColor: 'white'
        }}>
            <Typography variant="h4">Категория не найдена</Typography>
        </Box>
    );
};

export default ErrorState;