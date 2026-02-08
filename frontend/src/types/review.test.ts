import type { Review } from './review';

describe('Review type', () => {
  it('should have valid Review interface', () => {
    const review: Review = {
      id: '1',
      authorName: 'John Doe',
      rating: 5,
      date: '2024-01-01',
      text: 'Great product!',
    };
    expect(review.id).toBe('1');
    expect(review.authorName).toBe('John Doe');
    expect(review.rating).toBe(5);
    expect(review.date).toBe('2024-01-01');
    expect(review.text).toBe('Great product!');
  });

  it('should work with optional fields', () => {
    const review: Review = {
      id: '2',
      authorName: 'Jane Doe',
      authorBadge: 'Verified',
      avatar: 'avatar.jpg',
      photos: ['photo1.jpg', 'photo2.jpg'],
      rating: 4,
      date: '2024-01-02',
      text: 'Good product',
    };
    expect(review.authorBadge).toBe('Verified');
    expect(review.avatar).toBe('avatar.jpg');
    expect(review.photos).toHaveLength(2);
  });
});
