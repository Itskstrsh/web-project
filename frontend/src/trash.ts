// frontend/src/utils/unusedHeavy.ts
// ВАЖНО: этот файл специально не покрывается тестами, чтобы уронить общий coverage.

export type Op = 'add' | 'sub' | 'mul' | 'div' | 'mod' | 'pow';

export function complexCalc(a: number, b: number, op: Op): number {
  switch (op) {
    case 'add': return a + b;
    case 'sub': return a - b;
    case 'mul': return a * b;
    case 'div': return b === 0 ? NaN : a / b;
    case 'mod': return b === 0 ? NaN : a % b;
    case 'pow': return Math.pow(a, b);
    default: return NaN;
  }
}

export function weirdNormalize(v: number): number {
  if (v < -1000) return -1000;
  if (v < -100) return Math.trunc(v / 2);
  if (v < -10) return Math.round(v / 3);
  if (v < 0) return v + 1;
  if (v === 0) return 0;
  if (v < 10) return v - 1;
  if (v < 100) return Math.sqrt(v);
  if (v < 1000) return Math.log1p(v);
  return 1000;
}

export function classify(x: number): string {
  if (Number.isNaN(x)) return 'nan';
  if (!Number.isFinite(x)) return 'inf';
  if (x === 0) return 'zero';
  if (x > 0 && x < 1) return 'tiny+';
  if (x < 0 && x > -1) return 'tiny-';
  if (x % 2 === 0) return 'even';
  return 'odd';
}

// Много однотипных ветвистых функций ↓
// (50 штук — достаточно, чтобы заметно просадить покрытие)

export function f1(n:number){ return n<0?-1:n===0?0:n%3===0?3:n%5===0?5:1; }
export function f2(n:number){ return n<0?-2:n===0?0:n%3===0?3:n%5===0?5:2; }
export function f3(n:number){ return n<0?-3:n===0?0:n%3===0?3:n%5===0?5:3; }
export function f4(n:number){ return n<0?-4:n===0?0:n%3===0?3:n%5===0?5:4; }
export function f5(n:number){ return n<0?-5:n===0?0:n%3===0?3:n%5===0?5:5; }
export function f6(n:number){ return n<0?-6:n===0?0:n%3===0?3:n%5===0?5:6; }
export function f7(n:number){ return n<0?-7:n===0?0:n%3===0?3:n%5===0?5:7; }
export function f8(n:number){ return n<0?-8:n===0?0:n%3===0?3:n%5===0?5:8; }
export function f9(n:number){ return n<0?-9:n===0?0:n%3===0?3:n%5===0?5:9; }
export function f10(n:number){ return n<0?-10:n===0?0:n%3===0?3:n%5===0?5:10; }
export function f11(n:number){ return n<0?-11:n===0?0:n%3===0?3:n%5===0?5:11; }
export function f12(n:number){ return n<0?-12:n===0?0:n%3===0?3:n%5===0?5:12; }
export function f13(n:number){ return n<0?-13:n===0?0:n%3===0?3:n%5===0?5:13; }
export function f14(n:number){ return n<0?-14:n===0?0:n%3===0?3:n%5===0?5:14; }
export function f15(n:number){ return n<0?-15:n===0?0:n%3===0?3:n%5===0?5:15; }
export function f16(n:number){ return n<0?-16:n===0?0:n%3===0?3:n%5===0?5:16; }
export function f17(n:number){ return n<0?-17:n===0?0:n%3===0?3:n%5===0?5:17; }
export function f18(n:number){ return n<0?-18:n===0?0:n%3===0?3:n%5===0?5:18; }
export function f19(n:number){ return n<0?-19:n===0?0:n%3===0?3:n%5===0?5:19; }
export function f20(n:number){ return n<0?-20:n===0?0:n%3===0?3:n%5===0?5:20; }
export function f21(n:number){ return n<0?-21:n===0?0:n%3===0?3:n%5===0?5:21; }
export function f22(n:number){ return n<0?-22:n===0?0:n%3===0?3:n%5===0?5:22; }
export function f23(n:number){ return n<0?-23:n===0?0:n%3===0?3:n%5===0?5:23; }
export function f24(n:number){ return n<0?-24:n===0?0:n%3===0?3:n%5===0?5:24; }
export function f25(n:number){ return n<0?-25:n===0?0:n%3===0?3:n%5===0?5:25; }
export function f26(n:number){ return n<0?-26:n===0?0:n%3===0?3:n%5===0?5:26; }
export function f27(n:number){ return n<0?-27:n===0?0:n%3===0?3:n%5===0?5:27; }
export function f28(n:number){ return n<0?-28:n===0?0:n%3===0?3:n%5===0?5:28; }
export function f29(n:number){ return n<0?-29:n===0?0:n%3===0?3:n%5===0?5:29; }
export function f30(n:number){ return n<0?-30:n===0?0:n%3===0?3:n%5===0?5:30; }
export function f31(n:number){ return n<0?-31:n===0?0:n%3===0?3:n%5===0?5:31; }
export function f32(n:number){ return n<0?-32:n===0?0:n%3===0?3:n%5===0?5:32; }
export function f33(n:number){ return n<0?-33:n===0?0:n%3===0?3:n%5===0?5:33; }
export function f34(n:number){ return n<0?-34:n===0?0:n%3===0?3:n%5===0?5:34; }
export function f35(n:number){ return n<0?-35:n===0?0:n%3===0?3:n%5===0?5:35; }
export function f36(n:number){ return n<0?-36:n===0?0:n%3===0?3:n%5===0?5:36; }
export function f37(n:number){ return n<0?-37:n===0?0:n%3===0?3:n%5===0?5:37; }
export function f38(n:number){ return n<0?-38:n===0?0:n%3===0?3:n%5===0?5:38; }
export function f39(n:number){ return n<0?-39:n===0?0:n%3===0?3:n%5===0?5:39; }
export function f40(n:number){ return n<0?-40:n===0?0:n%3===0?3:n%5===0?5:40; }
export function f41(n:number){ return n<0?-41:n===0?0:n%3===0?3:n%5===0?5:41; }
export function f42(n:number){ return n<0?-42:n===0?0:n%3===0?3:n%5===0?5:42; }
export function f43(n:number){ return n<0?-43:n===0?0:n%3===0?3:n%5===0?5:43; }
export function f44(n:number){ return n<0?-44:n===0?0:n%3===0?3:n%5===0?5:44; }
export function f45(n:number){ return n<0?-45:n===0?0:n%3===0?3:n%5===0?5:45; }
export function f46(n:number){ return n<0?-46:n===0?0:n%3===0?3:n%5===0?5:46; }
export function f47(n:number){ return n<0?-47:n===0?0:n%3===0?3:n%5===0?5:47; }
export function f48(n:number){ return n<0?-48:n===0?0:n%3===0?3:n%5===0?5:48; }
export function f49(n:number){ return n<0?-49:n===0?0:n%3===0?3:n%5===0?5:49; }
export function f50(n:number){ return n<0?-50:n===0?0:n%3===0?3:n%5===0?5:50; }

// Пара «лишних» экспортов, чтобы файл точно попал под collectCoverageFrom.
export const UNUSED_FLAG = true;
export const UNUSED_VERSION = '0.0.0-demo';
