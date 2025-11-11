import { Box, Container, Typography } from '@mui/material';
import GreenContentBlock from '../../components/forWhyChooseUs/GreenContentBlock';
import leftYellowAntennae from '../../images/stripesImages/leftYellowAntennae.png';
import rightYellowAntennae from '../../images/stripesImages/rightYellowAntennae.png';

const WhyChooseUs = () => {
    return (
        <Box
            component="section"
            sx={{
                py: 15,
                backgroundColor: 'white',
            }}
        >
            <Container maxWidth="lg">
                {/* Оригинальный заголовок секции */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 6 }}>
                    <Box
                        component="img"
                        src={leftYellowAntennae}
                        alt=""
                        sx={{
                            width: 50,
                            height: 'auto',
                            marginBottom: 10,
                        }}
                    />
                    <Typography sx={{
                        mx: -1,
                        textAlign: 'center',
                        fontFamily: '"Rubik", sans-serif',
                        fontWeight: 700,
                        color: '#333',
                        maxWidth: '550px',
                        wordWrap: 'break-word',
                        fontSize: '40px',
                        lineHeight: 1.1
                    }}>
                        ПОЧЕМУ{' '}
                        <Box component="span" sx={{ color: '#20924B' }}>
                            НАС ВЫБИРАЮТ
                        </Box>{' '}
                        КАЖДЫЙ ДЕНЬ
                    </Typography>
                    <Box
                        component="img"
                        src={rightYellowAntennae}
                        alt=""
                        sx={{
                            width: 50,
                            height: 'auto',
                            marginBottom: 10,
                        }}
                    />
                </Box>

                {/* Зеленый блок с контентом */}
                <GreenContentBlock />
            </Container>
        </Box>
    );
};

export default WhyChooseUs;