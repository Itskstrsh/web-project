import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearError, createProductOnServer } from '../../store/slices/adminSlice';
import { fetchProducts } from '../../store/slices/productSlice';

interface FormData {
  name: string;
  category: string;
  price: string;
  description: string;
  weight: string;
}

const AddProductForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categories, error } = useAppSelector((state) => state.admin);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    price: '',
    description: '',
    weight: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState<'idle' | 'converting' | 'uploading' | 'complete'>('idle');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [conversionProgress, setConversionProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleInputChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));

    if (validationErrors.category) {
      setValidationErrors(prev => ({
        ...prev,
        category: undefined
      }));
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите файл изображения (JPEG, PNG, GIF, WebP)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Размер файла не должен превышать 5MB');
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadstart = () => {
        console.log('Начало конвертации файла');
        setConversionProgress(0);
      };

      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
          setConversionProgress(percent);
          console.log(`Прогресс конвертации: ${percent.toFixed(1)}%`);
        }
      };

      reader.onload = () => {
        setConversionProgress(100);
        console.log('Конвертация завершена');
        resolve(reader.result as string);
      };

      reader.onerror = () => {
        console.error('Ошибка конвертации файла');
        reject(new Error('Ошибка чтения файла'));
      };

      reader.readAsDataURL(file);
    });
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      errors.name = 'Введите название товара';
    }

    if (!formData.category) {
      errors.category = 'Выберите категорию';
    }

    if (!formData.price || Number(formData.price) <= 0) {
      errors.price = 'Укажите цену больше 0';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setUploadStage('converting');
    setUploadProgress(10);
    setErrorMessage('');

    try {
      console.log('=== НАЧАЛО СОЗДАНИЯ ТОВАРА ===');
      console.log('Данные формы:', formData);
      console.log('Файл изображения:', imageFile ? `${imageFile.name} (${imageFile.size} байт)` : 'нет');

      let imageBase64 = '';

      if (imageFile) {
        try {
          console.log('Начинаю конвертацию изображения...');
          setUploadStage('converting');

          const startTime = Date.now();
          imageBase64 = await convertFileToBase64(imageFile);
          const convertTime = Date.now() - startTime;

          console.log(`Конвертация завершена за ${convertTime}мс`);
          console.log(`Длина base64: ${imageBase64.length} символов`);
        } catch (convertError) {
          console.error('Ошибка конвертации:', convertError);
          setErrorMessage('Ошибка обработки изображения');
          setShowErrorDialog(true);
          setIsSubmitting(false);
          setUploadStage('idle');
          return;
        }
      }

      const productData = {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        description: formData.description || '',
        weight: formData.weight || '',
        quantity: 0,
        imageUrl: '',
        image: '',
      };

      console.log('Отправляю данные на сервер...');
      setUploadStage('uploading');
      setUploadProgress(50);

      const result = await dispatch(createProductOnServer({
        productData,
        imageFile: imageFile || undefined,
      }));

      console.log('Результат dispatch:', result);

      if (createProductOnServer.fulfilled.match(result)) {
        console.log('Товар успешно создан:', result.payload);
        setUploadStage('complete');
        setUploadProgress(100);

        await new Promise(resolve => setTimeout(resolve, 500));

        setShowSuccessDialog(true);

        dispatch(fetchProducts());

      } else if (createProductOnServer.rejected.match(result)) {
        console.error('Ошибка при создании товара:', result.payload);
        setUploadStage('idle');
        setErrorMessage(result.payload as string || 'Произошла ошибка при создании товара');
        setShowErrorDialog(true);
      }

    } catch (error) {
      console.error('Непредвиденная ошибка:', error);
      setUploadStage('idle');
      setErrorMessage('Произошла непредвиденная ошибка');
      setShowErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessDialog(false);
    navigate('/admin');
  };

  const handleErrorClose = () => {
    setShowErrorDialog(false);
    setErrorMessage('');
    dispatch(clearError());
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      description: '',
      weight: '',
    });
    setImageFile(null);
    setImagePreview('');
    setValidationErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadAreaClick = () => {
    if (!imagePreview && fileInputRef.current) {
      fileInputRef.current.click();
    }
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
        <Typography variant="h6" sx={{ color: '#5C4A37', fontWeight: 600 }}>
          Добавление нового товара
        </Typography>
      </Box>

      {(uploadStage !== 'idle' || isSubmitting) && (
        <Box sx={{ mb: 3, p: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
            {uploadStage === 'converting' && (
              <>
                <CircularProgress size={16} />
                Конвертация изображения...
              </>
            )}
            {uploadStage === 'uploading' && (
              <>
                <CircularProgress size={16} />
                Отправка данных на сервер...
              </>
            )}
            {uploadStage === 'complete' && (
              <>
                <CheckCircleIcon color="success" fontSize="small" />
                Готово!
              </>
            )}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              mb: 1
            }}
          />

          {uploadStage === 'converting' && conversionProgress > 0 && (
            <Typography variant="caption" color="text.secondary">
              Конвертация: {conversionProgress.toFixed(0)}%
            </Typography>
          )}

          {uploadStage === 'uploading' && (
            <Typography variant="caption" color="text.secondary">
              Отправка: {uploadProgress}%
            </Typography>
          )}
        </Box>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: '0 0 300px' }}>
          <Card
            sx={{
              height: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'white',
              borderRadius: 2,
              overflow: 'hidden',
              position: 'relative',
              cursor: imagePreview ? 'default' : 'pointer',
              border: '2px dashed',
              borderColor: imagePreview ? 'transparent' : '#ccc',
              '&:hover': {
                borderColor: imagePreview ? 'transparent' : '#1976d2',
              },
            }}
            onClick={handleUploadAreaClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              style={{ display: 'none' }}
              disabled={isSubmitting}
            />

            {imagePreview ? (
              <>
                <CardMedia
                  component="img"
                  image={imagePreview}
                  alt="Превью"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.7)',
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageRemove();
                  }}
                  disabled={isSubmitting}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            ) : (
              <>
                <CloudUploadIcon sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
                <Typography color="textSecondary" align="center">
                  Нажмите для загрузки изображения
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                  PNG, JPG, GIF до 5MB
                </Typography>
              </>
            )}
          </Card>

          {imageFile && (
            <Box sx={{ mt: 2, p: 1.5, bgcolor: 'white', borderRadius: 2 }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Файл:</strong> {imageFile.name}
              </Typography>
              <Typography variant="body2">
                <strong>Размер:</strong> {(imageFile.size / 1024).toFixed(1)} KB
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl
            fullWidth
            sx={{ bgcolor: 'white', borderRadius: 2 }}
            error={!!validationErrors.category}
            disabled={isSubmitting}
          >
            <InputLabel>Выберите категорию *</InputLabel>
            <Select
              value={formData.category}
              onChange={handleSelectChange}
              label="Выберите категорию *"
              sx={{ borderRadius: 2 }}
            >
              {categories.map((category) => {
                const categoryValue = category.categoryKey || category.name.toLowerCase().replace(/\s+/g, '-');
                return (
                  <MenuItem key={category.id} value={categoryValue}>
                    {category.name}
                  </MenuItem>
                );
              })}
            </Select>
            {validationErrors.category && (
              <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                {validationErrors.category}
              </Typography>
            )}
          </FormControl>

          <TextField
            label="Введите название товара *"
            value={formData.name}
            onChange={handleInputChange('name')}
            fullWidth
            disabled={isSubmitting}
            error={!!validationErrors.name}
            helperText={validationErrors.name}
            sx={{ bgcolor: 'white', borderRadius: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Цена *"
              type="number"
              value={formData.price}
              onChange={handleInputChange('price')}
              fullWidth
              disabled={isSubmitting}
              error={!!validationErrors.price}
              helperText={validationErrors.price}
              InputProps={{
                inputProps: {
                  min: 0,
                  step: 0.01,
                  placeholder: "0.00"
                }
              }}
              sx={{ bgcolor: 'white', borderRadius: 2 }}
            />
            <TextField
              label="Вес/граммы"
              value={formData.weight}
              onChange={handleInputChange('weight')}
              fullWidth
              disabled={isSubmitting}
              placeholder="500 г"
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
            disabled={isSubmitting}
            placeholder="Опишите ваш товар..."
            sx={{ bgcolor: 'white', borderRadius: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              type="button"
              variant="outlined"
              onClick={handleResetForm}
              disabled={isSubmitting}
              sx={{ textTransform: 'none', px: 3 }}
            >
              Очистить форму
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate('/admin')}
              disabled={isSubmitting}
              sx={{ textTransform: 'none', px: 3 }}
            >
              Отмена
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                flex: 1,
                textTransform: 'none',
                px: 4,
                position: 'relative',
              }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress
                    size={24}
                    sx={{
                      color: 'inherit',
                      position: 'absolute',
                      left: '50%',
                      marginLeft: '-12px',
                    }}
                  />
                  <span style={{ opacity: 0 }}>Сохранить</span>
                </>
              ) : (
                'Сохранить товар'
              )}
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={showSuccessDialog}
        onClose={handleSuccessClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}>
          <CheckCircleIcon color="success" />
          Товар успешно создан!
        </DialogTitle>
        <DialogContent>
          <Typography>
            Товар "<strong>{formData.name}</strong>" был успешно добавлен в систему.
          </Typography>
          {imageFile && (
            <Typography sx={{ mt: 1 }}>
              Изображение товара загружено.
            </Typography>
          )}
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            Вы будете перенаправлены на страницу администрирования.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSuccessClose}
            variant="contained"
            autoFocus
            sx={{ textTransform: 'none' }}
          >
            Вернуться в админку
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showErrorDialog}
        onClose={handleErrorClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}>
          <ErrorIcon color="error" />
          Ошибка при создании товара
        </DialogTitle>
        <DialogContent>
          <Typography color="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
          <Typography variant="body2">
            Возможные причины:
          </Typography>
          <ul style={{ marginTop: 8, marginBottom: 16, paddingLeft: 20 }}>
            <li><Typography variant="body2">Проблемы с подключением к интернету</Typography></li>
            <li><Typography variant="body2">Слишком большое изображение</Typography></li>
            <li><Typography variant="body2">Проблемы на сервере</Typography></li>
            <li><Typography variant="body2">Неверный формат данных</Typography></li>
          </ul>
          <Typography variant="body2" color="text.secondary">
            Попробуйте снова или обратитесь к администратору.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleErrorClose}
            color="primary"
            sx={{ textTransform: 'none' }}
          >
            Закрыть
          </Button>
          <Button
            onClick={() => {
              handleErrorClose();
              handleSubmit(new Event('submit') as unknown as React.FormEvent);
            }}
            variant="contained"
            sx={{ textTransform: 'none' }}
          >
            Попробовать снова
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error && !showErrorDialog}
        autoHideDuration={6000}
        onClose={() => dispatch(clearError())}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          onClose={() => dispatch(clearError())}
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddProductForm;