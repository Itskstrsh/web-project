import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import React from 'react';

const MapSection: React.FC = () => {
  // Массив точек магазинов
const locations = [
    {
    id: 1,
    name: 'ВИНЕГРЕТ – Центральный рынок',
    coords: [45.0393, 38.9787],
    address: 'г. Краснодар, ул. Северная, 325',
    },
    {
    id: 2,
    name: 'ВИНЕГРЕТ – ул. Московская',
    coords: [45.0355, 39.0914],
    address: 'г. Краснодар, ул. Московская, 64',
    },
    {
    id: 3,
    name: 'ВИНЕГРЕТ – ТЦ Галерея',
    coords: [45.0359, 38.9762],
    address: 'г. Краснодар, ул. Красная, 131',
    },
];

return (
    <section
    id="contacts"
    className="bg-[#F5FCE8] py-16 border-t border-green-200"
    >
    <div className="container mx-auto px-6 text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-4">
          Наши магазины
        </h2>
        <p className="text-green-800/80 text-lg">
          Найдите ближайший «ВИНЕГРЕТ» на карте
        </p>
      </div>

      <div className="container mx-auto rounded-3xl overflow-hidden shadow-lg border border-green-100">
        <YMaps query={{ lang: 'ru_RU', apikey: 'ВАШ_API_КЛЮЧ_ЯНДЕКС' }}>
          <Map
            defaultState={{
              center: [45.0393, 38.9787],
              zoom: 12,
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
      </div>
    </section>
  );
};

export default MapSection;
