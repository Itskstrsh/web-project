import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface MenuSectionProps {
    title: string;
    items: Array<{
        label: string;
        to: string;
    }>;
}

const FooterMenu: React.FC<MenuSectionProps> = ({ title, items }) => {
    return (
        <Box>
            <Typography variant="h6" fontWeight="bold" color="white" gutterBottom>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {items.map((item, index) => (
                    <Link
                        key={index}
                        component={RouterLink}
                        to={item.to}
                        color="green.100"
                        sx={{
                            textDecoration: 'none',
                            '&:hover': { color: 'white' },
                            fontSize: '0.9rem'
                        }}
                    >
                        {item.label}
                    </Link>
                ))}
            </Box>
        </Box>
    );
};

export default FooterMenu;