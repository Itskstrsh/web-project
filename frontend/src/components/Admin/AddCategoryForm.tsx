import {
  Box,
  Button,
  Container,
  TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { addCategory } from '../../store/slices/adminSlice';
import { fetchProducts } from '../../store/slices/productSlice';
import type { AdminCategory } from '../../store/slices/adminSlice';
import ImageEditor from './ImageEditor';

const AddCategoryForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<Omit<AdminCategory, 'id'>>({
    name: '',
    image: '',
  });

  const handleChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({
      ...prev,
      image: '',
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newCategory: AdminCategory = {
      ...formData,
      id: Date.now(),
    };
    dispatch(addCategory(newCategory));
    dispatch(fetchProducts());
    navigate('/admin');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4, bgcolor: '#f5f5f0', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin')}
          sx={{
            color: '#826C5C',
            textTransform: 'none',
          }}
        >
          Назад
        </Button>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <ImageEditor
          image={formData.image}
          onImageChange={handleImageUpload}
          onImageRemove={handleImageRemove}
          width="100%"
          height="300px"
        />

        <TextField
          label="Название"
          value={formData.name}
          onChange={handleChange('name')}
          fullWidth
          required
          sx={{ bgcolor: 'white', borderRadius: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            alignSelf: 'center',
            textTransform: 'none',
            px: 4,
            py: 1.5,
          }}
        >
          Сохранить
        </Button>
      </Box>
    </Container>
  );
};

export default AddCategoryForm;