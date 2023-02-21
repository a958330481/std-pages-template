/**
 * 接口基本数据结构
 */

interface IDwsBase<T> {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
}

interface IEnowBase<T> {
  data: T;
  message: string;
  error_code: number;
}

export type { IDwsBase, IEnowBase };
