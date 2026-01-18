import { contacts } from './contacts';

describe('contacts', () => {
  it('should export contacts object', () => {
    expect(typeof contacts).toBe('object');
    expect(contacts).not.toBeNull();
  });

  it('should have phone number', () => {
    expect(contacts).toHaveProperty('phone');
    expect(typeof contacts.phone).toBe('string');
    expect(contacts.phone).toContain('+7');
  });

  it('should have address', () => {
    expect(contacts).toHaveProperty('address');
    expect(typeof contacts.address).toBe('string');
    expect(contacts.address.length).toBeGreaterThan(0);
  });

  it('should have email', () => {
    expect(contacts).toHaveProperty('email');
    expect(typeof contacts.email).toBe('string');
    expect(contacts.email).toContain('@');
  });

  it('should have social links', () => {
    expect(contacts).toHaveProperty('social');
    expect(typeof contacts.social).toBe('object');
    expect(contacts.social).toHaveProperty('instagram');
    expect(contacts.social).toHaveProperty('telegram');
    expect(contacts.social).toHaveProperty('whatsapp');
  });

  it('should have valid social URLs', () => {
    expect(contacts.social.instagram).toContain('instagram.com');
    expect(contacts.social.telegram).toContain('t.me');
    expect(contacts.social.whatsapp).toContain('wa.me');
  });
});
