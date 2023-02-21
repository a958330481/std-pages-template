import { BaseModel } from '../request';
import { IDictData } from '../interfaces/dictionary';

enum DictionaryType {
  PropertyDataType = 'propertyDataType', // 类属性类型
  LabelNameType = 'labelNameType', // 标签名称内容
  LabelStyle = 'labelStyle', // 标签样式
  AnchorPosition = 'anchorPosition', // 锚点位置
}

class DictionaryModel extends BaseModel<null> {
  public constructor() {
    super(window.location.origin);
  }

  /**
   * 通用字典接口
   */
  public async query(type: string): Promise<IDictData[]> {
    return this.request<IDictData[]>({
      url: `/dws/config/dict-data`,
      hideProxyLogin: true,
      params: {
        type,
      },
    });
  }
}

const dictionaryModel = new DictionaryModel();

export { dictionaryModel, DictionaryType };
