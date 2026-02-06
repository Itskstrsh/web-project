import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  deleteCategory,
  getCategoryKey,
  setProducts,
  setSearchQuery,
  setSelectedCategory,
  updateCategory,
} from '../../store/slices/adminSlice';
import { fetchProducts } from '../../store/slices/productSlice';
import CategoryCard from './CategoryCard';
import EditCategoryDialog from './EditCategoryDialog';
import ProductList from './ProductList';
import type { AdminCategory } from '../../store/slices/adminSlice';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, categories, searchQuery, selectedCategory } = useAppSelector(
    (state) => state.admin
  );
  const { items: allProducts } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const hasSavedData = localStorage.getItem('adminState');
    if (allProducts.length > 0 && products.length === 0 && !hasSavedData) {
      dispatch(setProducts(allProducts));
    }
  }, [allProducts, dispatch, products.length]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== null) {
      const category = categories.find((c) => c.id === selectedCategory);
      if (category) {
        const categoryKey = getCategoryKey(category);
        filtered = filtered.filter((product) => product.category === categoryKey);
      } else {
        filtered = [];
      }
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, categories]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleCategoryClick = (categoryId: number | null) => {
    dispatch(setSelectedCategory(selectedCategory === categoryId ? null : categoryId));
  };

  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);

  const handleCategoryDelete = (categoryId: number) => {
    dispatch(deleteCategory(categoryId));
    dispatch(fetchProducts());
  };

  const handleCategoryEdit = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      setEditingCategory(category);
    }
  };

  const handleCategorySave = (updatedCategory: AdminCategory) => {
    dispatch(updateCategory(updatedCategory));
    dispatch(fetchProducts());
    setEditingCategory(null);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: '#f5f5f0', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <TextField
          placeholder="Поиск"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            width: '400px',
            bgcolor: 'white',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/category/add')}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Добавить категорию
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/product/add')}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Добавить товар
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Box
          sx={{
            gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' }
          }}
        >
          <CategoryCard
            category={{ id: null, name: 'Все категории' }}
            isSelected={selectedCategory === null}
            onClick={() => handleCategoryClick(null)}
            showEdit={false}
            showDelete={false}
          />
        </Box>
        {categories.map((category) => (
          <Box
            key={category.id}
            sx={{
              gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' }
            }}
          >
            <CategoryCard
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => handleCategoryClick(category.id)}
              onDelete={handleCategoryDelete}
              onEdit={handleCategoryEdit}
              showDelete={true}
              showEdit={true}
            />
          </Box>
        ))}
      </Grid>

      <Box>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            px: 1,
            fontWeight: 700,
            color: '#5C4A37',
            fontSize: '1.5rem',
          }}
        >
          Все товары
        </Typography>
        <ProductList products={filteredProducts} />
      </Box>

      {editingCategory && (
        <EditCategoryDialog
          category={editingCategory}
          open={!!editingCategory}
          onClose={() => setEditingCategory(null)}
          onSave={handleCategorySave}
        />
      )}
    </Container>
  );
};

export default AdminPage;