// Mock for orderSlice.ts to avoid import.meta.env issues in Jest
export const createOrder = jest.fn();
export const setCurrentOrder = jest.fn();

const mockOrderSlice = {
  name: 'order',
  initialState: { currentOrder: null, loading: false, error: null },
  reducers: {},
};

export default mockOrderSlice;
