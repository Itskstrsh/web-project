import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Pagination, Radio, RadioGroup, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { reviewsData } from '../../../data/reviewsData';
import { SectionContainer } from '../FAQ/FaqSection';
import ReviewCard from './ReviewCard';

type SortType = 'random' | 'date_old' | 'date_new' | 'rating_high' | 'rating_low';

const AllReviewsPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState<SortType>('random');
    const [onlyWithPhotos, setOnlyWithPhotos] = useState(false);
    const reviewsPerPage = 10;

    // Парсинг даты
    const parseDate = (dateStr: string): Date => {
        const months: Record<string, number> = {
            'января': 0, 'февраля': 1, 'марта': 2, 'апреля': 3, 'мая': 4, 'июня': 5,
            'июля': 6, 'августа': 7, 'сентября': 8, 'октября': 9, 'ноября': 10, 'декабря': 11
        };
        const [day, monthStr, year] = dateStr.split(' ');
        const month = months[monthStr?.toLowerCase()];
        return (!isNaN(+day) && month !== undefined && !isNaN(+year)) 
            ? new Date(+year, month, +day) 
            : new Date(0);
    };

    // Рандомизация для сохранения порядка при 'random'
    const shuffledReviews = useMemo(() => {
        const shuffled = [...reviewsData];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, []);

    const filteredAndSortedReviews = useMemo(() => {
        const source = sortType === 'random' ? shuffledReviews : [...reviewsData];
        const filtered = source.filter(review => !onlyWithPhotos || review.photos?.length);

        const sortFns: Record<string, (a: typeof reviewsData[0], b: typeof reviewsData[0]) => number> = {
            date_old: (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime(),
            date_new: (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime(),
            rating_high: (a, b) => b.rating - a.rating,
            rating_low: (a, b) => a.rating - b.rating,
        };

        return sortFns[sortType] ? [...filtered].sort(sortFns[sortType]) : filtered;
    }, [sortType, onlyWithPhotos, shuffledReviews]);

    const totalPages = Math.ceil(filteredAndSortedReviews.length / reviewsPerPage);
    const currentReviews = filteredAndSortedReviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage);

    // Скролл вверх при загрузке страницы и при смене страницы
    useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [currentPage]);
    useEffect(() => setCurrentPage(1), [sortType, onlyWithPhotos]);

    const handlePageChange = (_: unknown, page: number) => setCurrentPage(page);

    const handleBackClick = () => {
        navigate('/');
        setTimeout(() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    };

    return (
        <SectionContainer>
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBackClick}
                    sx={{
                        color: '#064e3b',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                            backgroundColor: 'rgba(6, 78, 59, 0.08)',
                        },
                    }}
                >
                    Назад к отзывам
                </Button>
            </Box>
            <Typography
                variant="h2"
                component="h1"
                sx={{
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    color: '#064e3b',
                    mb: 4,
                }}
            >
                ВСЕ ОТЗЫВЫ
            </Typography>

            <Accordion
                sx={{
                    mb: 4,
                    borderRadius: '12px !important',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05) !important',
                    border: '1px solid #e0e0e0',
                    '&:before': {
                        display: 'none',
                    },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#064e3b' }} />}
                    sx={{
                        backgroundColor: '#f9f9f9',
                        borderRadius: '12px',
                        '&.Mui-expanded': {
                            borderRadius: '12px 12px 0 0',
                        },
                        '& .MuiAccordionSummary-content': {
                            alignItems: 'center',
                            gap: 1,
                        },
                    }}
                >
                    <FilterListIcon sx={{ color: '#064e3b' }} />
                    <Typography sx={{ fontWeight: 600, color: '#064e3b' }}>
                        Фильтры и сортировка
                    </Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        p: 3,
                        backgroundColor: '#f9f9f9',
                        borderRadius: '0 0 12px 12px',
                    }}
                >
                    <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
                        <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600, color: '#064e3b' }}>
                            Сортировка
                        </FormLabel>
                        <RadioGroup
                            value={sortType}
                            onChange={(e) => setSortType(e.target.value as SortType)}
                            sx={{ gap: 1 }}
                        >
                            <FormControlLabel value="random" control={<Radio />} label="Случайный порядок" />
                            <FormControlLabel value="date_new" control={<Radio />} label="По дате: сначала новые" />
                            <FormControlLabel value="date_old" control={<Radio />} label="По дате: сначала старые" />
                            <FormControlLabel value="rating_high" control={<Radio />} label="По оценке: сначала положительные" />
                            <FormControlLabel value="rating_low" control={<Radio />} label="По оценке: сначала отрицательные" />
                        </RadioGroup>
                    </FormControl>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={onlyWithPhotos}
                                onChange={(e) => setOnlyWithPhotos(e.target.checked)}
                            />
                        }
                        label="Только с фото"
                        sx={{
                            color: '#064e3b',
                            '& .MuiCheckbox-root': {
                                color: '#4caf50',
                                '&.Mui-checked': {
                                    color: '#4caf50',
                                },
                            },
                        }}
                    />
                </AccordionDetails>
            </Accordion>

            {filteredAndSortedReviews.length === 0 ? (
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 8,
                        color: '#999',
                        fontSize: '1.1rem',
                    }}
                >
                    {reviewsData.length === 0 ? 'Отзывов пока нет' : 'Не найдено отзывов'}
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        mb: 6,
                    }}
                >
                    {currentReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} compact={true} showPhotosInline={true} />
                    ))}
                </Box>
            )}

            {totalPages > 1 && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 6,
                    }}
                >
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: '#064e3b',
                                '&.Mui-selected': {
                                    backgroundColor: '#4caf50',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#45a049',
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(76, 175, 80, 0.08)',
                                },
                            },
                        }}
                    />
                </Box>
            )}
        </SectionContainer>
    );
};

export default AllReviewsPage;