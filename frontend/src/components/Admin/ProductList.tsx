import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Skeleton,
  Stack,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { deleteProductOnServer } from '../../store/slices/adminSlice';
import type { Product } from '../../types/product';

interface ProductListProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  loading?: boolean;
  error?: string;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  onEdit, 
  loading = false,
  error 
}) => {
  const dispatch = useAppDispatch();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить товар "${name}"?`)) {
      try {
        await dispatch(deleteProductOnServer(id)).unwrap();
        // Можно добавить уведомление об успешном удалении
      } catch (error) {
        alert(`Ошибка при удалении: ${error}`);
      }
    }
  };

  const handleEdit = (product: Product) => {
    if (onEdit) {
      onEdit(product);
    }
  };

  const handleImageError = (productId: string, imageUrl: string) => {
    console.error(`Ошибка загрузки изображения для продукта ${productId}:`, imageUrl);
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  // Функция для получения полного URL изображения
const getImageUrl = (imagePath?: string) => {
  if (!imagePath) return null;
  
  console.log(`Обработка imagePath: ${imagePath}`);
  
  // Если путь начинается с /uploads, добавляем базовый URL бэкенда
  if (imagePath.startsWith('/uploads/')) {
    const fullUrl = `${imagePath}`;
    console.log(`Преобразовано в: ${fullUrl}`);
    return fullUrl;
  }
  
  // Если URL уже полный
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Если просто имя файла (без /uploads/)
  return `/uploads/${imagePath}`;
};

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
        {[...Array(6)].map((_, index) => (
          <Card key={index} sx={{ height: 400 }}>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" height={32} width="80%" sx={{ mb: 1 }} />
              <Skeleton variant="text" height={24} width="60%" sx={{ mb: 2 }} />
              <Skeleton variant="text" height={20} width="40%" />
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Товары не найдены
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
      {products.map((product) => {
        // ВАЖНО: Используем поле 'image' из ответа сервера, а не 'imageUrl'
        const imagePath = product.image || product.imageUrl;
        const fullImageUrl = getImageUrl(imagePath);
        const hasImageError = imageErrors[product.id];
        
        console.log(`Продукт: ${product.name}, Image path: ${imagePath}, Full URL: ${fullImageUrl}`);

        return (
          <Card
            key={product.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              },
            }}
          >
            {/* Изображение продукта */}
            <Box sx={{ position: 'relative', height: 200, overflow: 'hidden', bgcolor: '#f5f5f5' }}>
              {fullImageUrl && !hasImageError ? (
                <>
                  <CardMedia
                    component="img"
                    image={fullImageUrl}
                    alt={product.name}
                    sx={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                    onError={() => handleImageError(product.id, fullImageUrl)}
                    onLoad={() => console.log(`Изображение загружено: ${product.name}`)}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      display: 'flex',
                      gap: 0.5,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(product)}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.9)',
                        '&:hover': { bgcolor: 'white' },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(product.id, product.name)}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.9)',
                        '&:hover': { bgcolor: 'white' },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary" align="center">
                    {hasImageError ? 'Ошибка загрузки изображения' : 'Нет изображения'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 1 }}>
                    {fullImageUrl}
                  </Typography>
                </Box>
              )}
            </Box>

            <CardContent sx={{ flexGrow: 1, p: 2 }}>
              <Stack spacing={1}>
                {/* Название и категория */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#5C4A37' }}>
                    {product.name}
                  </Typography>
                  {product.category && (
                    <Chip
                      label={product.category}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(92, 74, 55, 0.1)',
                        color: '#5C4A37',
                        fontSize: '0.75rem',
                      }}
                    />
                  )}
                </Box>

                {/* Описание */}
                {product.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '40px',
                    }}
                  >
                    {product.description}
                  </Typography>
                )}

                {/* Вес/калории */}
                {product.weight && (
                  <Typography variant="caption" color="text.secondary">
                    Вес: {product.weight}
                  </Typography>
                )}

                {/* Цена и количество */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                    {product.price} ₽
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    В наличии: {product.quantity || 0} шт.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default ProductList;