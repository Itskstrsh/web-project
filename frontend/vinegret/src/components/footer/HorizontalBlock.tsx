import { Box, Link, Typography } from '@mui/material';
import vinegretLogo from '../../images/vinegretLogo.webp';

interface HorizontalBlockProps {
    logo?: string;
    logoHref?: string;
    rightImages?: Array<{
        src: string;
        href: string;
        alt: string;
        width?: number;
        height?: number;
    }>;
    phoneNumber?: {
        number: string;
        href: string;
    };
}

const HorizontalBlock = ({
                             logo = vinegretLogo,
                             rightImages = [],
                             phoneNumber
                         }: HorizontalBlockProps) => {

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
        }}>
            {logo && (
                    <Box
                        component="img"
                        src={logo}
                        alt="Винегрет Лого"
                        sx={{
                            width: 185,
                            height: 55,
                            flexShrink: 0,
                            marginLeft: -4,
                            marginBottom: -2
                        }}
                    />
            )}

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexShrink: 0,
            }}>

                {phoneNumber && (
                    <Link
                        href={phoneNumber.href}
                        sx={{
                            textDecoration: 'none',
                            borderRadius: 50,
                            backgroundColor: '#4fbd79',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '14px',
                            width: 175,
                            height: 55,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                                backgroundColor: '#45a86c',
                                textDecoration: 'none',
                                color: 'inherit'
                            },
                            cursor: 'pointer'
                        }}
                    >
                        {phoneNumber.number}
                    </Link>
                )}

                {rightImages.map((image, index) => (
                    <Link key={index} href={image.href} sx={{ display: 'block', '&:hover': {
                            opacity: 0.8
                        } }}>
                        <Box
                            component="img"
                            src={image.src}
                            alt={image.alt}
                            sx={{
                                width: 55,
                                height: 55,
                                marginLeft: index === 0 ? -2.6 : 0,
                                cursor: 'pointer'
                            }}
                        />
                    </Link>
                ))}
            </Box>
        </Box>
    );
};

export default HorizontalBlock;