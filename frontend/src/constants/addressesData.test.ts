import { addressesData } from './addressesData';

describe('addressesData', () => {
  it('should be defined', () => {
    expect(addressesData).toBeDefined();
  });

  it('should have 2 addresses', () => {
    expect(addressesData).toHaveLength(2);
  });

  it('should have address with required fields', () => {
    addressesData.forEach(address => {
      expect(address.address).toBeDefined();
      expect(address.workingHours).toBeDefined();
      expect(address.image).toBeDefined();
      expect(address.addressHref).toBeDefined();
    });
  });

  it('should contain Novorossiysk addresses', () => {
    expect(addressesData[0].address).toContain('Новороссийск');
    expect(addressesData[1].address).toContain('Новороссийск');
  });
});
