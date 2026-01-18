import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { getCategoryKey } from '../../store/slices/adminSlice';
import type { Product } from '../../types/product';

interface EditProductDialogProps {
  product: Product;
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({
  product,
  open,
  onClose,
  onSave,
}) => {
  const { categories } = useAppSelector((state) => state.admin);
  const [formData, setFormData] = useState<Product>(product);

  const handleChange = (field: keyof Product) => (
    event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const value = 'target' in event ? event.target.value : event.value;
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'price' ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    // Сохраняем quantity из исходного продукта, если оно не было изменено
    const updatedProduct: Product = {
      ...formData,
      quantity: formData.quantity !== undefined ? formData.quantity : (product.quantity || 0),
    };
    onSave(updatedProduct);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Редактировать товар</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Категория</InputLabel>
            <Select
              value={formData.category || ''}
              onChange={(e) => handleChange('category')(e as any)}
              label="Категория"
            >
              {categories.map((category) => {
                const categoryValue = getCategoryKey(category);
                return (
                  <MenuItem key={category.id} value={categoryValue}>
                    {category.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            label="Название"
            value={formData.name}
            onChange={handleChange('name')}
            fullWidth
          />
          <TextField
            label="Цена"
            type="number"
            value={formData.price}
            onChange={handleChange('price')}
            fullWidth
          />
          <TextField
            label="Описание"
            value={formData.description}
            onChange={handleChange('description')}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            label="Изображение (URL)"
            value={formData.image}
            onChange={handleChange('image')}
            fullWidth
          />
          <TextField
            label="Вес"
            value={formData.weight || ''}
            onChange={handleChange('weight')}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSave} variant="contained">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;