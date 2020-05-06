import * as chalk from 'chalk';
import { table } from 'table';
import { isArray, isUndefined, isObject } from 'util';

type ObjectArray = string[][];

const typeColors: Record<string, string> = {
  boolean: '#ff0',
  string: '#09f',
  number: '#9f9',
  undefined: '#999',
};

function type(val: any) {
  if (val instanceof Date) {
    return 'date';
  }
  if (isArray(val)) {
    return 'array';
  }
  return typeof val;
}

function valWithColor(val: any) {
  const t = type(val);
  try {
    return chalk.hex(typeColors[t] || '#fff')(val);
  } catch {
    return chalk.red(`{ non-primative }`);
  }
}

function formattedValue(val: any) {
  const t = type(val);
  const coloredValue = valWithColor(val);
  switch (t) {
    case 'date':
      return (val as Date).toISOString();
    case 'object':
      return cleanTable(objToArr(val));
    case 'array':
      return val.length === 0
        ? `(empty)`
        : cleanTable(
            val.map((v: any) => {
              return [formattedValue(v), chalk.dim(typeof v)];
            }),
          );
    case 'string':
      return `${chalk.dim('"')}${coloredValue}${chalk.dim('"')}`;
    default:
      return ` ${coloredValue}`;
  }
}

export function objToArr(obj: unknown | Record<string, any>): ObjectArray {
  if (isArray(obj)) {
    return obj.map((v: any) => {
      return [formattedValue(v), chalk.dim(typeof v)];
    });
  }

  const arr: ObjectArray = [];

  if (isUndefined(obj)) {
    arr.push([chalk.dim('undefined')]);
  } else if (isObject(obj)) {
    const o = obj as Record<string, any>;
    Object.keys(o).forEach(key => {
      const val = formattedValue(o[key]);
      const t = type(o[key]);
      arr.push([chalk.magenta(key), val, chalk.dim(t)]);
    });
  }
  return arr;
}

const color = `#444`;

const tableConfig = {
  border: {
    topBody: chalk.hex(color)(`─`),
    topJoin: chalk.hex(color)(`┬`),
    topLeft: chalk.hex(color)(`┌`),
    topRight: chalk.hex(color)(`┐`),

    bottomBody: chalk.hex(color)(`─`),
    bottomJoin: chalk.hex(color)(`┴`),
    bottomLeft: chalk.hex(color)(`└`),
    bottomRight: chalk.hex(color)(`┘`),

    bodyLeft: chalk.hex(color)(`│`),
    bodyRight: chalk.hex(color)(`│`),
    bodyJoin: chalk.hex(color)(`│`),

    joinBody: chalk.hex(color)(`─`),
    joinLeft: chalk.hex(color)(`├`),
    joinRight: chalk.hex(color)(`┤`),
    joinJoin: chalk.hex(color)(`┼`),
  },
};

function cleanTable(arr: any[]) {
  if (arr.length === 0) {
    return table(
      [[chalk.italic.hex('#999')('empty'), chalk.dim('array')]],
      tableConfig,
    );
  }
  return table(arr, tableConfig).trim();
}

export function logObj(val: any) {
  console.log(cleanTable(objToArr(val)));
}
