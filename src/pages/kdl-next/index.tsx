import React, { useState } from 'react';
import { Button } from 'antd';
import { dictionaryModel, DictionaryType } from '@/services/apis/dictionary';
import './index.less';

function KdlNext() {
  const [info, setInfo] = useState<string>('');
  const queryDictionaryData = (type: DictionaryType) => {
    dictionaryModel
      .query(type)
      .then((res) => {
        console.log('res', res);
        setInfo(JSON.stringify(res));
      })
      .catch((error) => {
        setInfo(JSON.stringify(error));
      });
  };

  return (
    <div className='kdl-next'>
      <h2>kdl-next-page</h2>
      <Button
        type='primary'
        size='large'
        onClick={() => {
          queryDictionaryData(DictionaryType.LabelStyle);
        }}
      >
        获取数据
      </Button>
      {info ? <div className='info'>{info}</div> : null}
    </div>
  );
}

export default KdlNext;
