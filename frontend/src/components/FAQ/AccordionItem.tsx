import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import type { FaqItem } from '../../types/faq';
import PlusIcon from './PlusIcon';

const StyledAccordion = styled(Accordion)({
    border: '1px solid #e0e0e0',
    borderRadius: '20px !important',
    marginBottom: '15px',
    boxShadow: 'none',
    '&:before': { display: 'none' },
    '&.Mui-expanded': {
        margin: '20px 0',
        minHeight: 'auto'
    },
});

const StyledAccordionSummary = styled(AccordionSummary)({
    padding: '20px 28px',
    '& .MuiAccordionSummary-content': {
        margin: '16px 0',
        '&.Mui-expanded': { margin: '16px 0' },
    },
});

const StyledAccordionDetails = styled(AccordionDetails)({
    padding: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #f0f0f0',
});

interface AccordionItemProps {
    item: FaqItem;
    expanded: boolean;
    onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, expanded, onChange }) => {
    return (
        <StyledAccordion expanded={expanded} onChange={onChange}>
            <StyledAccordionSummary
                expandIcon={<PlusIcon />}
                sx={{
                    '& .MuiAccordionSummary-expandIconWrapper': {
                        transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                    }
                }}
            >
                <Typography variant="h6" component="h3" sx={{
                    fontWeight: 600,
                    fontSize: '1.15rem',
                    lineHeight: 1.5,
                }}>
                    {item.question}
                </Typography>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
                <Typography sx={{
                    color: '#666',
                    lineHeight: 1.6,
                    fontSize: '1rem',
                    padding: '8px',
                }}>
                    {item.answer}
                </Typography>
            </StyledAccordionDetails>
        </StyledAccordion>
    );
};

export default AccordionItem;