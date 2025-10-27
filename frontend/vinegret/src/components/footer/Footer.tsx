import {Box, Container, Typography} from '@mui/material';
import HorizontalBlock from './HorizontalBlock';
import FooterColumns from './ColumnsBlock';
import phone from '../../images/phone.webp';
import whatsapp from '../../images/whatsapp.webp';
import telegram from '../../images/telegram.webp'

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                backgroundColor: '#20924B',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                fontFamily: '"Rubik", sans-serif',
                lineHeight: 1.2
            }}
        >
            <Container maxWidth="lg"
                       sx={{
                           height: '100%',
                           display: 'flex',
                           alignItems: 'center',
                       }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    width: '100%',
                    paddingTop: 8,
                    paddingBottom: 8,
                    minHeight: `calc(100% - 80px)`,
                }}>

                    <HorizontalBlock
                        phoneNumber={{
                            number: '+7 (988) 130-45-76',
                            href: 'tel:+79881304576'
                        }}
                        rightImages={[
                            {
                                src: phone,
                                href: 'tel:+79881304576',
                                alt: 'Phone',
                                width: 35,
                                height: 35
                            },
                            {
                                src: whatsapp,
                                href: 'https://wa.me/79881304576',
                                alt: 'WhatsApp',
                                width: 35,
                                height: 35
                            },
                            {
                                src: telegram,
                                href: 'https://t.me/username',
                                alt: 'Telegram',
                                width: 35,
                                height: 35
                            },
                        ]}
                    />

                    <FooterColumns />

                    <Typography
                        sx={{
                            fontFamily: '"Rubik", sans-serif',
                            color: 'white',
                            fontSize: '14px',
                            textAlign: 'left',
                        }}
                    >
                        © 2025 Винегрет. Все права защищены.
                    </Typography>

                </Box>
            </Container>
        </Box>
    );
};

export default Footer;