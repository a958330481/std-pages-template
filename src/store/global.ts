/**
 * 全局store
 */
import { makeObservable, observable, action, autorun, toJS } from 'mobx';

interface IConfig {
  commitInfo: string;
}

export class GlobalStore {
  @observable
  config: IConfig = {
    commitInfo: '',
  };

  constructor() {
    makeObservable(this);
    autorun(() => {
      const _config = toJS<IConfig>(this.config);
      window.config = _config;
    });
  }

  @action
  updateCommitInfo(commitInfo: string) {
    // 更新commitInfo
    this.config.commitInfo = commitInfo;
  }
}

const globalStore = new GlobalStore();

export { globalStore };
