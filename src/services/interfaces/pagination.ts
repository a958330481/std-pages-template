/**
 * 分页通用接口定义
 */

export interface IPagination<T> {
  first: boolean;
  currentElements: number;
  size: number;
  totalPages: number;
  last: boolean;
  content: T[];
  number: number;
  numberOfElements: number;
  totalElements: number;
}
