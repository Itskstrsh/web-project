// Mock for HeaderNav.tsx to avoid import.meta.env issues in Jest
import React from 'react';

export const HeaderNav: React.FC<{ items: any[] }> = () => null;
export default HeaderNav;
