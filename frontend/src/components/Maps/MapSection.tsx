import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { addressesData } from '../../constants/addressesData';

const MapSection: React.FC = () => {
  const [showMap, setShowMap] = useState(false);
  const holderRef = useRef<HTMLDivElement | null>(null);

  const locations = [
    { id: 1, name: 'ВИНЕГРЕТ', coords: [44.691977, 37.760306] as [number, number], address: addressesData[0].address },
    { id: 2, name: 'ВИНЕГРЕТ', coords: [44.68098, 37.791729] as [number, number], address: addressesData[1].address },
  ];

  const mapCenter: [number, number] = [44.70625, 37.76635];

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShowMap(true);
          io.disconnect();
        }
      },
      { root: null, threshold: 0.15, rootMargin: '200px' } // подгрузит чуть заранее
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

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
        <Box ref={holderRef} sx={{ width: '100%', height: '500px' }}>
          {showMap ? <LazyYandexMap locations={locations} mapCenter={mapCenter} /> : <MapPlaceholder />}
        </Box>
      </Container>
    </Box>
  );
};

export default MapSection;

// --- ВАЖНО: карта грузится только когда showMap=true ---
const LazyYandexMap: React.FC<{
  locations: { id: number; name: string; coords: [number, number]; address: string }[];
  mapCenter: [number, number];
}> = ({ locations, mapCenter }) => {
  const [lib, setLib] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const m = await import('@pbe/react-yandex-maps');
      if (!cancelled) setLib(m);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!lib) return <MapPlaceholder />;

  const { YMaps, Map, Placemark } = lib;

  return (
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
            options={{ iconColor: '#7AC65C' }}
          />
        ))}
      </Map>
    </YMaps>
  );
};

const MapPlaceholder: React.FC = () => (
  <Box
    sx={{
      width: '100%',
      height: '500px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(90deg, rgba(0,0,0,0.04), rgba(0,0,0,0.08), rgba(0,0,0,0.04))',
    }}
  >
    <Typography sx={{ color: 'rgba(6, 78, 59, 0.8)', fontWeight: 600 }}>
      Загружаем карту…
    </Typography>
  </Box>
);
