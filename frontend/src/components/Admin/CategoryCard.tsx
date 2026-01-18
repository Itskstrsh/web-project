import { Card, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

interface CategoryCardProps {
    category: {
        id: number | null;
        name: string;
    };
    isSelected: boolean;
    onClick: () => void;
    onDelete?: (id: number) => void;
    onEdit?: (id: number) => void;
    showDelete?: boolean;
    showEdit?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
                                                       category,
                                                       isSelected,
                                                       onClick,
                                                       onDelete,
                                                       onEdit,
                                                       showDelete = false,
                                                       showEdit = false
                                                   }) => {
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (category.id !== null && onDelete) {
            if (window.confirm(`Вы уверены, что хотите удалить категорию "${category.name}"?`)) {
                onDelete(category.id);
            }
        }
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (category.id !== null && onEdit) {
            onEdit(category.id);
        }
    };

    return (
        <Card
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                bgcolor: isSelected ? '#826C5C' : '#b19988',
                color: isSelected ? '#F0E1D6' : 'white',
                transition: 'all 0.2s',
                borderRadius: 2,
                height: '100%',
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                },
            }}
        >
            {showEdit && category.id !== null && (
                <IconButton
                    onClick={handleEdit}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        bgcolor: 'rgba(92, 74, 55, 0.9)',
                        color: 'white',
                        zIndex: 2,
                        width: 32,
                        height: 32,
                        '&:hover': {
                            bgcolor: 'rgba(92, 74, 55, 1)',
                        },
                    }}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
            )}
            {showDelete && category.id !== null && (
                <IconButton
                    onClick={handleDelete}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'rgba(211, 47, 47, 0.9)',
                        color: 'white',
                        zIndex: 2,
                        width: 32,
                        height: 32,
                        '&:hover': {
                            bgcolor: 'rgba(211, 47, 47, 1)',
                        },
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            )}
            <CardContent sx={{ width: '100%', textAlign: 'center', py: 3 }}>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: isSelected ? 700 : 600,
                        fontSize: '1rem',
                        lineHeight: 1.4,
                    }}
                >
                    {category.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CategoryCard;