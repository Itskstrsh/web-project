import { Email, LocationOn, Phone } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { contacts, workingHours } from '../../constants/contacts';

export const FooterContacts: React.FC = () => {
    return (
        <Box>
            <Typography variant="h6" fontWeight="bold" color="white" gutterBottom>
                Контакты
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Телефон */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Phone sx={{ color: 'green.300', fontSize: 20 }} />
                    <Box>
                        <Typography variant="body2" color="green.100">
                            {contacts.phone}
                        </Typography>
                        <Typography variant="caption" color="green.200">
                            {workingHours.phone}
                        </Typography>
                    </Box>
                </Box>

                {/* Email */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Email sx={{ color: 'green.300', fontSize: 20 }} />
                    <Typography variant="body2" color="green.100">
                        {contacts.email}
                    </Typography>
                </Box>

                {contacts.addresses.map((address, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <LocationOn sx={{ color: 'green.300', fontSize: 20, mt: 0.5 }} />
                        <Typography variant="body2" color="green.100">
                            {address.address}
                            <br />
                            <Typography variant="caption" color="green.200">
                                {address.hours}
                            </Typography>
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
