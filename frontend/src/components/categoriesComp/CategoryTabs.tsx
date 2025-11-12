import { Box, Tabs, Tab } from '@mui/material';
import { getTabsConfig } from '../../constants/tabsConfig';

interface CategoryTabsProps {
    value: number;
    onChange: (newValue: number) => void;
    categoryId: number;
}

const CategoryTabs = ({ value, onChange, categoryId }: CategoryTabsProps) => {
    const tabs = getTabsConfig(categoryId);

    const handleTabChange = (_: unknown, newValue: number) => {
        onChange(newValue);
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs
                value={value}
                onChange={handleTabChange}
                centered
                sx={{
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#1f924b',
                        height: 3
                    },
                    '& .MuiTab-root': {
                        fontFamily: '"Rubik", sans-serif',
                        fontWeight: 600,
                        fontSize: '16px',
                        textTransform: 'none',
                        minWidth: 'auto',
                        px: 3,
                        py: 2,
                        color: 'text.secondary',
                        '&.Mui-selected': {
                            color: '#1f924b',
                        },
                        '&:focus': {
                            outline: 'none'
                        }
                    }
                }}
            >
                {tabs.map((tab) => (
                    <Tab
                        key={tab.value}
                        label={tab.label}
                        disableRipple
                    />
                ))}
            </Tabs>
        </Box>
    );
};

export default CategoryTabs;