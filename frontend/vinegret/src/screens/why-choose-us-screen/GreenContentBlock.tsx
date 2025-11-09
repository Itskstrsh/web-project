import { Box, Typography } from '@mui/material';
import { whyChooseUsData } from './whyChooseUsData';
import FeatureCard from './FeatureCard';
import greenBackground from '../../images/greenBackground.webp';
import ourFoodCat from '../../images/ourFoodCat.webp';

const GreenContentBlock = () => {
    return (
        <Box
            sx={{
                backgroundImage: `url(${greenBackground})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                maxWidth: 658,
                py: 6,
                position: 'relative',
                mb: 3,
            }}
        >

            <Box
                sx={{
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    width: '61px',
                    height: '61px',
                    borderRadius: '50%',
                    backgroundColor: '#20924B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '18px',
                        height: '7px',
                        borderLeft: '2px solid white',
                        borderBottom: '2px solid white',
                        transform: 'rotate(-45deg)',
                        marginTop: '-5px',
                    }}
                />
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                mb: 5,
                mt: -4.5,
                width: '100%',
                pl: 13
            }}>
                <Typography sx={{
                    textAlign: 'center',
                    fontFamily: '"Rubik", sans-serif',
                    fontWeight: 700,
                    color: 'white',
                    fontSize: '28px',
                    lineHeight: 1.1,
                }}>
                    НАША ЕДА
                </Typography>
                <Box
                    component="img"
                    src={ourFoodCat}
                    alt="Наша еда"
                    sx={{
                        width: 117,
                    }}
                />
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                width: '85%',
            }}>
                {whyChooseUsData.map((row, rowIndex) => (
                    <Box key={rowIndex}>
                        {row.length === 2 ? (
                            <Box sx={{
                                display: 'flex',
                                gap: '10px',
                            }}>
                                {row.map((title, itemIndex) => (
                                    <Box key={itemIndex} sx={{
                                        flex: 1,
                                    }}>
                                        <FeatureCard
                                            title={title}
                                            centerText
                                        />
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <FeatureCard
                                title={row[0]}
                                centerText={false}
                            />
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default GreenContentBlock;