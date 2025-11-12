import { Container, Grid, Paper } from '@mui/material';
import React from 'react';
import FooterContacts from '../components/Footer/FooterContacts';
import FooterLogo from '../components/Footer/FooterLogo';
import FooterMenu from '../components/Footer/FooterMenu';
import { categoriesMenu, mainMenu } from '../constants/menuItems';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Paper
            component="footer"
            sx={{
                background: 'linear-gradient(135deg, #14532d 0%, #166534 50%, #065f46 100%)',
                color: 'white',
                mt: 'auto',
                borderRadius: 0,
            }}
            elevation={0}
        >
            <Container maxWidth="lg" sx={{ py: 8, px: { xs: 3, sm: 4, md: 2 } }}>
                <Grid container spacing={8}>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <FooterLogo />
                    </Grid>

                    <Grid size={{ xs: 6, md: 2 }}>
                        <FooterMenu title="Меню" items={mainMenu} />
                    </Grid>

                    <Grid size={{ xs: 6, md: 2 }}>
                        <FooterMenu title="Категории" items={categoriesMenu} />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <FooterContacts />
                    </Grid>
                </Grid>

            </Container>
        </Paper>
    );
};

export default Footer