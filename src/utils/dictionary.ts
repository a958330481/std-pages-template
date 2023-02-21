import { IDictData } from '@/services/interfaces/dictionary';

/**
 * 根据字典value获取对应label(中文描述)
 * @param dictionaries
 * @param value
 * @returns
 */
function findDictionaryLabelByValue(dictionaries: IDictData[], value: string): string {
  const target: IDictData | undefined = dictionaries.find((dict) => dict.value === value);

  return target ? target.label : '--';
}

export { findDictionaryLabelByValue };
