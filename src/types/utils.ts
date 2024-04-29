import type { Dayjs } from 'dayjs';

/** делает из snake_case строки camelCase */
type CamelCase<T extends string> = T extends `${infer Head}_${infer Tail}`
  ? `${Lowercase<CamelCase<Head>>}${Capitalize<CamelCase<Tail>>}`
  : Lowercase<T>;

/**  Меняет ключи объекта camelCase */
type CamelizeObject<T extends object> = {
  [K in keyof T & string as CamelCase<K>]: T[K];
};

/** Если ключ начинается с date, то меняет тип на Dayjs */
type WithDate<T extends object> = {
  [K in keyof T]: K extends `date${string}` ? Dayjs : T[K];
};

export type { CamelCase, CamelizeObject, WithDate };
