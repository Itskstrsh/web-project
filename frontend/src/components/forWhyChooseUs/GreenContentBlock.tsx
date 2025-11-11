import { Box, Typography } from '@mui/material';
import { whyChooseUsData } from '../../constants/whyChooseUsData.ts';
import FeatureCard from './FeatureCard.tsx';
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
                        position: 'absolute',
                        top: '0px',
                        right: '0px',
                        width: '62px',
                        height: '61px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <svg width="17" height="18" viewBox="0 0 17 18">
                        <path
                            d="M16.074225 0.5C16.112275 0.5 16.1918 0.5075 16.311525 0.6855475C16.430325 0.86227 16.5 1.0849725 16.5 1.3759775C16.49995 1.66598 16.430875 1.8886875 16.3125 2.066405L6.004875 17.31445C5.881825 17.495025 5.80305 17.5 5.771475 17.5C5.7404 17.5 5.662625 17.49545 5.541025 17.315425L0.677735 10.1172C0.560825 9.94005 0.4948075 9.719025 0.5 9.43165C0.5053275 9.137875 0.57864 8.91295 0.69922 8.73535C0.818415 8.559925 0.8983525 8.549875 0.9394525 8.5498C0.9705775 8.5498 1.0241025 8.5557 1.09961 8.6328L1.1826175 8.736325L5.357425 14.9463L5.771475 15.561525L6.186525 14.947275L15.8291 0.68457C15.95155 0.5104975 16.0333 0.5000675 16.074225 0.5Z"
                            fill="white"
                            stroke="white"
                        />
                    </svg>
                </Box>
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