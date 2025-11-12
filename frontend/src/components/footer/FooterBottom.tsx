import { Box, Divider, Link, Typography } from '@mui/material';
import React from 'react';

interface FooterBottomProps {
    currentYear: number;
}

const FooterBottom: React.FC<FooterBottomProps> = ({ currentYear }) => {
    return (
        <>
            <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.2)' }} />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: 2,
                }}
            >
                <Typography variant="body2" color="green.200">
                    © {currentYear} ВИНЕГРЕТ. Все права защищены.
                </Typography>

                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Link
                        href="#"
                        color="green.100"
                        variant="body2"
                        sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}
                    >
                        Политика конфиденциальности
                    </Link>
                    <Link
                        href="#"
                        color="green.100"
                        variant="body2"
                        sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}
                    >
                        Условия использования
                    </Link>
                </Box>
            </Box>
        </>
    );
};

export default FooterBottom;