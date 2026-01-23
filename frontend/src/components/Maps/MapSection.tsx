import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { addressesData } from '../../constants/addressesData';

const MapSection: React.FC = () => {
  const locations = [
    {
      id: 1,
      name: 'ВИНЕГРЕТ',
      coords: [44.691977, 37.760306],
      address: addressesData[0].address,
    },
    {
      id: 2,
      name: 'ВИНЕГРЕТ',
      coords: [44.680980, 37.791729],
      address: addressesData[1].address,
    },
  ];

  const mapCenter: [number, number] = [44.70625, 37.76635];

  return (
    <Box
      component="section"
      id="contacts"
      sx={{
        backgroundColor: '#F5FCE8',
        py: 8,
        borderTop: '1px solid #c8e6c9',
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center', mb: 5 }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 800,
            color: '#064e3b',
            mb: 2,
          }}
        >
          Наши магазины
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(6, 78, 59, 0.8)',
            fontSize: '1.125rem',
          }}
        >
          Найдите ближайший «ВИНЕГРЕТ» на карте
        </Typography>
      </Container>

      <Container
        maxWidth="lg"
        sx={{
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid #c8e6c9',
        }}
      >
        <YMaps query={{ lang: 'ru_RU', apikey: 'ВАШ_API_КЛЮЧ_ЯНДЕКС' }}>
          <Map
            defaultState={{
              center: mapCenter,
              zoom: 13,
              controls: ['zoomControl', 'fullscreenControl'],
            }}
            modules={['control.ZoomControl', 'control.FullscreenControl']}
            width="100%"
            height="500px"
          >
            {locations.map((loc) => (
              <Placemark
                key={loc.id}
                geometry={loc.coords}
                properties={{
                  balloonContentHeader: `<b>${loc.name}</b>`,
                  balloonContentBody: loc.address,
                }}
                options={{
                  iconColor: '#7AC65C',
                }}
              />
            ))}
          </Map>
        </YMaps>
      </Container>
    </Box>
  );
};

export default MapSection;
