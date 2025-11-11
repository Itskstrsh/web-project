import React, { useState } from 'react';
import { SectionContainer } from '../../components/faqComp/FaqSection';
import Accordion from '../../components/faqComp/Accordion';
import { faqData } from '../../constants/faqData';
import { Box } from '@mui/material';
import CategoryHeader from '../../components/categoriesComp/CategoryHeader';

const FaqScreen: React.FC = () => {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (isExpanded) {
                newSet.add(panel);
            } else {
                newSet.delete(panel);
            }
            return newSet;
        });
    };

    // Функция для проверки, открыт ли конкретный элемент
    const isExpanded = (panel: string) => expandedItems.has(panel);

    // Разделяем вопросы на две колонки
    const half = Math.ceil(faqData.length / 2);
    const firstColumn = faqData.slice(0, half);
    const secondColumn = faqData.slice(half);

    return (
        <SectionContainer>
            <CategoryHeader title="ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ" />

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 4,
                alignItems: 'flex-start'
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Accordion
                        items={firstColumn}
                        expanded={isExpanded}
                        onChange={handleChange}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Accordion
                        items={secondColumn}
                        expanded={isExpanded}
                        onChange={handleChange}
                    />
                </Box>
            </Box>
        </SectionContainer>
    );
};

export default FaqScreen;