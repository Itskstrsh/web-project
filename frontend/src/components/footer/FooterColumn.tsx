import { Box, Typography, Link } from '@mui/material';

interface FooterColumnProps {
    title?: string;
    items?: Array<{
        text: string;
        href?: string;
        image?: string;
        imageSize?: number;
    }>;
    textAlign?: 'left' | 'center' | 'right';
    children?: React.ReactNode;
    width?: string | number;
    itemGap?: number;
    fontWeight?: number;
    fontSize?: number;
}

const FooterColumn = ({
                          title,
                          items = [],
                          textAlign = 'left',
                          children,
                          width = 'auto',
                          itemGap = 1,
                          fontWeight = 400,
                          fontSize = 16,
                      }: FooterColumnProps) => {
    return (
        <Box sx={{ width: width, textAlign: textAlign }}>
            {title && (
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        fontFamily: '"Rubik", sans-serif',
                        fontWeight: 600,
                        color: 'white',
                    }}
                >
                    {title}
                </Typography>
            )}

            {children || (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: itemGap }}>
                    {items.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt=""
                                    width={item.imageSize || 24}
                                    height={item.imageSize || 24}
                                />
                            )}

                            {item.href ? (
                                <Link
                                    href={item.href}
                                    color="inherit"
                                    sx={{
                                        textDecoration: 'none',
                                        '&:hover': { textDecoration: 'none', opacity: 0.8, color: 'inherit' },
                                        fontFamily: '"Rubik", sans-serif',
                                        fontWeight: fontWeight,
                                        fontSize: fontSize,
                                        display: 'block',
                                        width: '100%',
                                        textAlign: textAlign,
                                        cursor: 'pointer',
                                    }}
                                >
                                    {item.text}
                                </Link>
                            ) : (
                                <Typography
                                    sx={{
                                        fontFamily: '"Rubik", sans-serif',
                                        color: 'white',
                                        fontSize: fontSize,
                                        display: 'block',
                                        width: '100%',
                                        textAlign: textAlign,
                                    }}
                                >
                                    {item.text}
                                </Typography>
                            )}
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default FooterColumn;