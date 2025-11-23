import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select, type SelectChangeEvent,
  TextField
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addProduct, getCategoryKey } from '../../store/slices/adminSlice';
import { fetchProducts } from '../../store/slices/productSlice';
import type { Product } from '../../types/product';
import ImageEditor from './ImageEditor';

const AddProductForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.admin);

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    category: '',
    price: 0,
    image: '',
    description: '',
    weight: '',
  });

  // Обработчик для TextField
  const handleInputChange = (field: keyof typeof formData) => (
      event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'price' ? Number(value) : value,
    }));
  };

  // Отдельный обработчик для Select
  const handleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      category: value,
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

    if (!formData.category) {
      alert('Пожалуйста, выберите категорию');
      return;
    }

    const newProduct: Product = {
      ...formData,
      id: Date.now().toString(),
      quantity: 0, // Начальное количество
    };

    dispatch(addProduct(newProduct));
    dispatch(fetchProducts());
    navigate('/admin');
  };

  return (
      <Container maxWidth="md" sx={{ py: 4, bgcolor: '#f5f5f0', minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/admin')}
              sx={{
                color: '#5C4A37',
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(92, 74, 55, 0.1)' },
              }}
          >
            Назад
          </Button>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 4 }}>
          <Box sx={{ flex: '0 0 300px' }}>
            <ImageEditor
                image={formData.image}
                onImageChange={handleImageUpload}
                onImageRemove={handleImageRemove}
                width="100%"
                height="300px"
            />
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth sx={{ bgcolor: 'white', borderRadius: 2 }}>
              <InputLabel>Выберите категорию</InputLabel>
              <Select
                  value={formData.category}
                  onChange={handleSelectChange}
                  label="Выберите категорию"
                  sx={{ borderRadius: 2 }}
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
                label="Введите название товара"
                value={formData.name}
                onChange={handleInputChange('name')}
                fullWidth
                required
                sx={{ bgcolor: 'white', borderRadius: 2 }}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                  label="Цена"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange('price')}
                  fullWidth
                  required
                  sx={{ bgcolor: 'white', borderRadius: 2 }}
              />
              <TextField
                  label="Граммы"
                  value={formData.weight}
                  onChange={handleInputChange('weight')}
                  fullWidth
                  sx={{ bgcolor: 'white', borderRadius: 2 }}
              />
            </Box>

            <TextField
                label="Описание товара"
                value={formData.description}
                onChange={handleInputChange('description')}
                multiline
                rows={6}
                fullWidth
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
        </Box>
      </Container>
  );
};

export default AddProductForm;