import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import type { AdminCategory } from '../../store/slices/adminSlice';

interface EditCategoryDialogProps {
  category: AdminCategory | null;
  open: boolean;
  onClose: () => void;
  onSave: (category: AdminCategory) => void;
}

const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({
  category,
  open,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Omit<AdminCategory, 'id'>>({
    name: '',
    image: '',
    categoryKey: '',
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        image: category.image || '',
        categoryKey: category.categoryKey || '',
      });
    }
  }, [category]);

  const handleChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSave = () => {
    if (category && formData.name.trim()) {
      const updatedCategory: AdminCategory = {
        ...category,
        ...formData,
      };
      onSave(updatedCategory);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Редактировать категорию</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Название"
            value={formData.name}
            onChange={handleChange('name')}
            fullWidth
            required
          />
          <TextField
            label="Изображение (URL)"
            value={formData.image}
            onChange={handleChange('image')}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSave} variant="contained" disabled={!formData.name.trim()}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategoryDialog;