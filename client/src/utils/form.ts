export const isNumber = (input: string) => input !== '' && !isNaN(Number(input));

export const isPositive = (input: string) => Number(input) > 0;

export const isPositiveNumber = (input: string) => isNumber(input) && isPositive(input);

export const isISODate = (input: string) => RegExp(/\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])/g).test(input);
