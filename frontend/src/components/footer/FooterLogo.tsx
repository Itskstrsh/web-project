import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { WhatsApp, Instagram, Telegram } from '@mui/icons-material';
import { contacts } from '../../constants/contacts';

const FooterLogo: React.FC = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        background: 'linear-gradient(135deg, #16a34a 0%, #10b981 100%)',
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        boxShadow: 3,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" color="white">
                        V
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h5" fontWeight="black" color="white">
                        ВИНЕГРЕТ
                    </Typography>
                    <Typography variant="caption" color="green.200">
                        МАГАЗИН – КУЛИНАРИЯ
                    </Typography>
                </Box>
            </Box>

            <Typography variant="body2" color="green.100" sx={{ mb: 3, lineHeight: 1.6 }}>
                Пространство, где вкус сочетается с заботой и вдохновением.
                Свежие продукты и готовые блюда для вашего стола.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                    component="a"
                    href={contacts.socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                        color: 'white',
                    }}
                    aria-label="WhatsApp"
                >
                    <WhatsApp />
                </IconButton>
                <IconButton
                    component="a"
                    href={contacts.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                        color: 'white',
                    }}
                    aria-label="Instagram"
                >
                    <Instagram />
                </IconButton>
                <IconButton
                    component="a"
                    href={contacts.socialLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                        color: 'white',
                    }}
                    aria-label="Telegram"
                >
                    <Telegram />
                </IconButton>
            </Box>
        </Box>
    );
};

export default FooterLogo;