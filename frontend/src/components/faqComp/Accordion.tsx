import React from 'react';
import { Box } from '@mui/material';
import AccordionItem from './AccordionItem';
import type {FaqItem} from '../../types/faq';

interface AccordionProps {
    items: FaqItem[];
    expanded: (panel: string) => boolean;
    onChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const Accordion: React.FC<AccordionProps> = ({ items, expanded, onChange }) => {
    return (
        <Box>
            {items.map((item) => (
                <AccordionItem
                    key={item.id}
                    item={item}
                    expanded={expanded(item.id)}
                    onChange={onChange(item.id)}
                />
            ))}
        </Box>
    );
};

export default Accordion;