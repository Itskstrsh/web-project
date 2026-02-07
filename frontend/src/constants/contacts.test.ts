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

  it('should have addresses array', () => {
    expect(contacts).toHaveProperty('addresses');
    expect(Array.isArray(contacts.addresses)).toBe(true);
    expect(contacts.addresses.length).toBeGreaterThan(0);
  });

  it('should have email', () => {
    expect(contacts).toHaveProperty('email');
    expect(typeof contacts.email).toBe('string');
    expect(contacts.email).toContain('@');
  });

  it('should have social links', () => {
    expect(contacts).toHaveProperty('socialLinks');
    expect(typeof contacts.socialLinks).toBe('object');
    expect(contacts.socialLinks).toHaveProperty('instagram');
    expect(contacts.socialLinks).toHaveProperty('telegram');
    expect(contacts.socialLinks).toHaveProperty('whatsapp');
  });

  it('should have valid social URLs', () => {
    expect(contacts.socialLinks.instagram).toContain('instagram.com');
    expect(contacts.socialLinks.telegram).toContain('t.me');
    expect(contacts.socialLinks.whatsapp).toContain('wa.me');
  });
});
