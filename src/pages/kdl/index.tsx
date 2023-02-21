import React from 'react';
import KdlComponent from '@/components/kdl';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.less';

function Kdl() {
  const navigate = useNavigate();

  return (
    <div className='kdl'>
      <KdlComponent />
      <Button
        className='next-btn'
        type='primary'
        size='large'
        onClick={() => {
          navigate(`/next`);
        }}
      >
        跳转下一页
      </Button>
    </div>
  );
}

export default Kdl;
