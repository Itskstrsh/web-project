// theme/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#16a34a', // green-600
      light: '#4ade80', // green-400
      dark: '#15803d', // green-700
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981', // emerald-500
      light: '#34d399', // emerald-400
      dark: '#059669', // emerald-600
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937', // gray-800
      secondary: '#4b5563', // gray-600
    },
    green: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    } as any,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 900,
      fontSize: '3.75rem', // 60px
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 900,
      fontSize: '3rem', // 48px
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.875rem', // 30px
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem', // 24px
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.25rem', // 20px
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem', // 18px
      lineHeight: 1.4,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none', // Убираем CAPS
    },
  },
  shape: {
    borderRadius: 12, // rounded-xl
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #16a34a 0%, #10b981 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #15803d 0%, #059669 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, // rounded-3xl
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
          border: '1px solid #dcfce7', // green-100
        },
      },
    },
  },
});

// Расширяем тип Palette для кастомных цветов
declare module '@mui/material/styles' {
  interface Palette {
    green: Palette['primary'];
  }
  interface PaletteOptions {
    green?: PaletteOptions['primary'];
  }
}