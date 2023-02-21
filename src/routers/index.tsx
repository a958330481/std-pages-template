import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { globalStore } from '@/store/global';
import Kdl from '@/pages/kdl';
import KdlNext from '@/pages/kdl-next';

const AppRouter = () => {
  useEffect(() => {
    if (!window?.config?.commitInfo) {
      const commitInfo = process.env.COMMIT_INFO;
      commitInfo && globalStore.updateCommitInfo(commitInfo);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Kdl />} />
        <Route path='/next' element={<KdlNext />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
