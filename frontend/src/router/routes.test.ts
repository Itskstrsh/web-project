import { routes } from './routes';

describe('routes', () => {
  it('should be defined', () => {
    expect(routes).toBeDefined();
  });

  it('should have 6 routes', () => {
    expect(routes).toHaveLength(6);
  });

  it('should have home route', () => {
    expect(routes[0].path).toBe('/');
    expect(routes[0].name).toBe('Главная');
  });

  it('should have assortment route', () => {
    expect(routes[1].path).toBe('/assortment');
    expect(routes[1].name).toBe('Ассортимент');
  });

  it('should have pelmeni route', () => {
    expect(routes[2].path).toBe('/pelmeni');
    expect(routes[2].name).toBe('Пельмени');
  });

  it('should have vareniki route', () => {
    expect(routes[3].path).toBe('/vareniki');
    expect(routes[3].name).toBe('Вареники');
  });

  it('should have bakery route', () => {
    expect(routes[4].path).toBe('/bakery');
    expect(routes[4].name).toBe('Выпечка');
  });

  it('should have desserts route', () => {
    expect(routes[5].path).toBe('/desserts');
    expect(routes[5].name).toBe('Десерты');
  });
});
