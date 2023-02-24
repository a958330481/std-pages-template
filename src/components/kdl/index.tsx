import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { autorun, toJS } from 'mobx';
import { globalStore } from '@/store/global';
import DemoGif from '@/assets/images/demo.gif';
import { Button } from 'antd';
import './index.less';

function KdlComponent() {
  const [commitInfo, setCommitInfo] = useState<string>('');

  useEffect(() => {
    autorun(() => {
      const _commitInfo = toJS(globalStore.config.commitInfo);
      if (_commitInfo) {
        setCommitInfo(_commitInfo);
      }
    });
  }, []);

  return (
    <div className='kdl-info'>
      <img src={DemoGif} />
      <h2>基于webpack5+antd+mobx+react+ts+git-flow 的多页面脚手架</h2>
      <div className='btn-container'>
        <Button
          onClick={() => {
            const COMMIT_INFO = process.env.COMMIT_INFO;
            COMMIT_INFO && globalStore.updateCommitInfo(COMMIT_INFO);
          }}
        >
          获取提交信息
        </Button>
      </div>
      {commitInfo ? (
        <div className='commit-info'>
          <p>{JSON.stringify(commitInfo)}</p>
        </div>
      ) : null}
    </div>
  );
}

export default observer(KdlComponent);
