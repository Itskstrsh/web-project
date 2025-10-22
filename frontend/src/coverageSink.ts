// frontend/src/utils/coverageSink.ts
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Набор функций, который мы импортируем в setupTests,
 * но НЕ вызываем — покрытие по ним будет ≈0%.
 * Их много, чтобы уверенно опустить общий coverage < 80%.
 */

export const neverCalled1 = (n = 0) => {
  let s = 0;
  for (let i = 0; i < 20; i++) {
    if (i % 2 === 0) s += i;
    else s -= i;
    if (i % 3 === 0) s *= 2;
    else s += 3;
  }
  return s + n;
};

export const neverCalled2 = (s: string) => {
  switch (s.length % 5) {
    case 0: return s.toUpperCase();
    case 1: return s.toLowerCase();
    case 2: return [...s].reverse().join('');
    case 3: return s.repeat(2);
    default: return s.slice(1) + s[0];
  }
};

export const neverCalled3 = (a = 1, b = 2, c = 3) => {
  let r = 0;
  r += a > b ? a : b;
  r += b > c ? b : c;
  r += c > a ? c : a;
  if (r % 2 === 0) r /= 2; else r = r * 3 + 1;
  return r;
};

// Чуть побольше "мяса" для падения coverage:
export const neverCalled4 = (x = 0) => {
  let t = 0;
  for (let i = 0; i < 50; i++) {
    if (i % 2 === 0) { t += i; } else { t -= i; }
    if (i % 5 === 0) { t ^= i; } else { t |= i; }
    if (i % 7 === 0) { t &= i | 1; } else { t += i % 3; }
  }
  return t + x;
};

export const neverCalled5 = (arr: number[]) => {
  let acc = 0;
  for (const n of arr) {
    if (n < 0) acc -= Math.abs(n);
    else if (n === 0) acc += 10;
    else if (n % 2 === 0) acc += n / 2;
    else acc += n * 3;
  }
  return acc;
};

// Скопируй блок ниже ещё 2–3 раза, если нужно сильнее «уронить» покрытие.
// === START DUPLICATE BLOCK ===
export const neverCalled6  = (n = 42) => (n % 2 ? n * 2 : n / 2);
export const neverCalled7  = (n = 42) => (n % 3 ? n + 3 : n - 3);
export const neverCalled8  = (n = 42) => (n % 4 ? n ^ 4 : n | 4);
export const neverCalled9  = (n = 42) => (n % 5 ? n * n : Math.sqrt(n));
export const neverCalled10 = (n = 42) => {
  let m = n;
  for (let i = 0; i < 25; i++) m += (i % 2 ? -i : i);
  return m;
};
// === END DUPLICATE BLOCK ===
