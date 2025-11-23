import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { deleteProduct, updateProduct, updateProductQuantity } from '../../store/slices/adminSlice';
import { fetchProducts } from '../../store/slices/productSlice';
import type { Product } from '../../types/product';
import EditProductDialog from './EditProductDialog';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const dispatch = useAppDispatch();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  // Инициализируем inputValues из продуктов при загрузке
  useEffect(() => {
    const initialInputValues: Record<string, string> = {};
    products.forEach((product) => {
      initialInputValues[product.id] = (product.quantity || 0).toString();
    });
    setInputValues(initialInputValues);
  }, [products]);

  const getQuantity = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    return product?.quantity || 0;
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    const newQuantity = Math.max(0, getQuantity(productId) + delta);
    dispatch(updateProductQuantity({ id: productId, quantity: newQuantity }));
    setInputValues((prev) => ({
      ...prev,
      [productId]: newQuantity.toString(),
    }));
  };

  const handleInputChange = (productId: string, value: string) => {
    // Сохраняем сырое значение ввода
    setInputValues((prev) => ({
      ...prev,
      [productId]: value,
    }));

    // Проверяем, является ли значение числом
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      dispatch(updateProductQuantity({ id: productId, quantity: numValue }));
    } else if (value === '') {
      // Если поле пустое, устанавливаем 0
      dispatch(updateProductQuantity({ id: productId, quantity: 0 }));
    }
  };

  const handleInputBlur = (productId: string) => {
    const currentValue = inputValues[productId];
    if (currentValue === '' || isNaN(parseInt(currentValue, 10))) {
      // Если значение некорректное, сбрасываем к 0
      setInputValues((prev) => ({
        ...prev,
        [productId]: '0',
      }));
      dispatch(updateProductQuantity({ id: productId, quantity: 0 }));
    } else {
      // Нормализуем значение (убираем лишние нули и т.д.)
      const normalizedValue = parseInt(currentValue, 10).toString();
      const numValue = parseInt(currentValue, 10);
      setInputValues((prev) => ({
        ...prev,
        [productId]: normalizedValue,
      }));
      dispatch(updateProductQuantity({ id: productId, quantity: numValue }));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      dispatch(deleteProduct(productId));
      dispatch(fetchProducts());
    }
  };

  const handleSaveEdit = (updatedProduct: Product) => {
    dispatch(updateProduct(updatedProduct));
    dispatch(fetchProducts());
    setEditingProduct(null);
  };

  if (products.length === 0) {
    return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Товары не найдены
          </Typography>
        </Box>
    );
  }

  return (
      <>
        <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 'none',
            }}
        >
          <Table>
            <TableBody>
              {products.map((product) => (
                  <TableRow
                      key={product.id}
                      sx={{
                        bgcolor: '#F0E1D6',
                        '&:hover': { bgcolor: '#dfcfc6' },
                        '&:not(:last-child)': {
                          borderBottom: '1px solid #E0D0B8',
                        }
                      }}
                  >
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500, color: '#5C4A37' }}>
                        {product.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                        <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(product.id, -1)}
                            disabled={getQuantity(product.id) === 0}
                            sx={{
                              bgcolor: 'white',
                              '&:hover': { bgcolor: '#f5f5f5' },
                              '&:disabled': { bgcolor: '#f0f0f0' },
                            }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <TextField
                            value={inputValues[product.id] || getQuantity(product.id).toString()}
                            onChange={(e) => handleInputChange(product.id, e.target.value)}
                            onBlur={() => handleInputBlur(product.id)}
                            inputProps={{
                              style: {
                                textAlign: 'center',
                                padding: '8px 4px',
                                width: '60px',
                              },
                              min: 0,
                              type: 'text', // Используем text чтобы обрабатывать пустые значения
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'transparent',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#ccc',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#5C4A37',
                                  borderWidth: '1px',
                                },
                              },
                              '& .MuiInputBase-input': {
                                fontWeight: 600,
                                color: '#5C4A37',
                                fontSize: '0.875rem',
                              },
                            }}
                            variant="outlined"
                            size="small"
                        />

                        <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(product.id, 1)}
                            sx={{
                              bgcolor: 'white',
                              '&:hover': { bgcolor: '#f5f5f5' },
                            }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ py: 2 }}>
                      <IconButton
                          onClick={() => handleEdit(product)}
                          sx={{
                            color: '#5C4A37',
                            '&:hover': { bgcolor: 'rgba(92, 74, 55, 0.1)' },
                          }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                          onClick={() => handleDelete(product.id)}
                          sx={{
                            color: '#d32f2f',
                            '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.1)' },
                          }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {editingProduct && (
            <EditProductDialog
                product={editingProduct}
                open={!!editingProduct}
                onClose={() => setEditingProduct(null)}
                onSave={handleSaveEdit}
            />
        )}
      </>
  );
};

export default ProductList;