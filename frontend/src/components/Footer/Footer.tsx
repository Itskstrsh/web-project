// components/Footer/Footer.tsx
import {
    Email,
    Instagram,
    LocationOn,
    Phone,
    Telegram,
    WhatsApp,
} from '@mui/icons-material';
import {
    Box,
    Container,
    Divider,
    Grid,
    IconButton,
    Link,
    Paper,
    Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Paper 
      component="footer" 
      sx={{
        background: 'linear-gradient(135deg, #14532d 0%, #166534 50%, #065f46 100%)',
        color: 'white',
        mt: 'auto',
      }}
      elevation={0}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          
          {/* Логотип и описание */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  background: 'linear-gradient(135deg, #16a34a 0%, #10b981 100%)',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  boxShadow: 3,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="white">
                  V
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="black" color="white">
                  ВИНЕГРЕТ
                </Typography>
                <Typography variant="caption" color="green.200">
                  МАГАЗИН – КУЛИНАРИЯ
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="body2" color="green.100" sx={{ mb: 3, lineHeight: 1.6 }}>
              Пространство, где вкус сочетается с заботой и вдохновением. 
              Свежие продукты и готовые блюда для вашего стола.
            </Typography>

            {/* Социальные сети */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                  color: 'white',
                }}
                aria-label="WhatsApp "
              >
                <WhatsApp  />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                  color: 'white',
                }}
                aria-label="Facebook"
              >
                <Instagram />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                  color: 'white',
                }}
                aria-label="Twitter"
              >
                <Telegram />
              </IconButton>
            </Box>
          </Grid>

          {/* Меню */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="h6" fontWeight="bold" color="white" gutterBottom>
              Меню
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component={RouterLink}
                to="/"
                color="green.100"
                sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                Главная
              </Link>
              <Link
                component={RouterLink}
                to="/assortment"
                color="green.100"
                sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                Ассортимент
              </Link>
              <Link
                component={RouterLink}
                to="/assortment/pelmeni"
                color="green.100"
                sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                Пельмени
              </Link>
              <Link
                component={RouterLink}
                to="/assortment/vareniki"
                color="green.100"
                sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                Вареники
              </Link>
            </Box>
          </Grid>

          {/* Категории */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="h6" fontWeight="bold" color="white" gutterBottom>
              Категории
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component={RouterLink}
                to="/assortment/pelmeni"
                color="green.100"
                sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                Пельмени
              </Link>
              <Link
                component={RouterLink}
                to="/assortment/vareniki"
                color="green.100"
                sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                Вареники
              </Link>
              <Link
                component={RouterLink}
                to="/assortment/bakery"
                color="green.100"
                sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                Выпечка
              </Link>
              <Link
                component={RouterLink}
                to="/assortment/desserts"
                color="green.100"
                sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                Десерты
              </Link>
            </Box>
          </Grid>

          {/* Контакты */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" fontWeight="bold" color="white" gutterBottom>
              Контакты
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Телефон */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Phone sx={{ color: 'green.300', fontSize: 20 }} />
                <Box>
                  <Typography variant="body2" color="green.100">
                    +7 (988) 130-45-76
                  </Typography>
                  <Typography variant="caption" color="green.200">
                    Ежедневно с 9:00 до 21:00
                  </Typography>
                </Box>
              </Box>

              {/* Email */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Email sx={{ color: 'green.300', fontSize: 20 }} />
                <Typography variant="body2" color="green.100">
                  order@vinegret.ru
                </Typography>
              </Box>

              {/* Адрес */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <LocationOn sx={{ color: 'green.300', fontSize: 20, mt: 0.5 }} />
                <Typography variant="body2" color="green.100">
                  г. Новороссийск ул. МЫсхакское Шоссе 71А
                  <br />
                  <Typography variant="caption" color="green.200">
                    ПТ - ПН с 9:00 до 19:30
                  </Typography>
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <LocationOn sx={{ color: 'green.300', fontSize: 20, mt: 0.5 }} />
                <Typography variant="body2" color="green.100">
                  г. Новороссийск, ул. Хворостянского, 4
                  <br />
                  <Typography variant="caption" color="green.200">
                    Ежедневно с 9:00 до 20:00
                  </Typography>
                </Typography>
            </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.2)' }} />

        {/* Нижняя часть */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="body2" color="green.200">
            © {currentYear} ВИНЕГРЕТ. Все права защищены.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              href="#"
              color="green.100"
              variant="body2"
              sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="#"
              color="green.100"
              variant="body2"
              sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}
            >
              Условия использования
            </Link>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer;