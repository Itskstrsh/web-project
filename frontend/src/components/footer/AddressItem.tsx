import { Box, Typography, Link } from '@mui/material';

interface AddressItemProps {
    address: string;
    workingHours: string;
    image?: string;
    imageSize?: number;
    addressFontSize?: string | number;
    hoursFontSize?: string | number;
    addressFontWeight?: number | string;
    hoursFontWeight?: number | string;
    gap?: number;
    addressHref?: string;
}

const AddressItem = ({
                         address,
                         workingHours,
                         image,
                         imageSize = 20,
                         addressFontSize = '16px',
                         hoursFontSize = '14px',
                         addressFontWeight = 400,
                         hoursFontWeight = 300,
                         addressHref
                     }: AddressItemProps) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'start', gap: 2.5, mb: 2 }}>
            {image && (
                <Box
                    component="img"
                    src={image}
                    alt=""
                    sx={{
                        width: imageSize,
                        height: imageSize,
                        flexShrink: 0,
                        alignSelf: 'flex-start',
                        marginTop: -1,
                    }}
                />
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {addressHref ? (
                    <Link
                        href={addressHref}
                        sx={{
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'none',
                                opacity: 0.8
                            },
                            cursor: 'pointer',
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: '"Rubik", sans-serif',
                                fontSize: addressFontSize,
                                fontWeight: addressFontWeight,
                                color: 'white',
                                lineHeight: 1.3
                            }}
                        >
                            {address}
                        </Typography>
                    </Link>
                ) : (
                    <Typography
                        sx={{
                            fontFamily: '"Rubik", sans-serif',
                            fontSize: addressFontSize,
                            fontWeight: addressFontWeight,
                            color: 'white',
                            lineHeight: 1.3
                        }}
                    >
                        {address}
                    </Typography>
                )}

                <Typography
                    sx={{
                        fontFamily: '"Rubik", sans-serif',
                        fontSize: hoursFontSize,
                        fontWeight: hoursFontWeight,
                        color: 'white',
                        opacity: 0.8,
                        whiteSpace: 'pre-line',
                        lineHeight: 1.1
                    }}
                >
                    {workingHours}
                </Typography>
            </Box>
        </Box>
    );
};

export default AddressItem;