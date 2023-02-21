/*
 * @Description: HTTP请求模块封装
 * @Author: zhangkai13699@cvte.com
 * @Date: 2022-12-22 15:30:23
 * @LastEditors: zhangkai13699@cvte.com
 * @LastEditTime: 2023-02-01 19:33:17
 */
import axios, { AxiosInstance, AxiosRequestConfig as __AxiosRequestConfig } from 'axios';
import { message as Message } from 'antd';
import * as STATUS_CODE from './code';
export interface AxiosRequestConfig extends __AxiosRequestConfig {
  hideRequestHeader?: boolean; // 隐藏自定义请求头
  hideProxyLogin?: boolean; // 禁止跳转到登录
  hideDeepStatusCodeJudge?: boolean; // 隐藏接口response中的statusCode判断
  hideMsg?: boolean; // 隐藏接口统一提示信息
}

export class BaseModel<T> {
  private base: string;

  public constructor(base?: string) {
    this.base = base || '';
  }

  public async request<U = T>(options: AxiosRequestConfig): Promise<U> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const instance: AxiosInstance = axios.create({
        baseURL: this.base,
        withCredentials: true,
      });
      if (!options?.hideRequestHeader) {
        instance.interceptors.request.use(
          (req: any) => {
            req.headers['x-auth-refer'] = 'dws-web';
            req.headers['x-kish-token-key'] = 'x-token';
            return req;
          },
          (err) => {
            throw err;
          },
        );
      }
      try {
        const res: any = await instance({ ...options });
        const { status, data } = res;
        const { hideProxyLogin, hideDeepStatusCodeJudge, hideMsg } = options;
        console.log('hideProxyLogin', hideProxyLogin);
        let message = null;
        switch (status) {
          case STATUS_CODE.success:
            if (!hideProxyLogin && STATUS_CODE.unLogin.includes(data?.statusCode)) {
              Message.info('您尚未登录').then(() => {
                window.location.href = '/login';
              });
              return;
            }
            if (hideDeepStatusCodeJudge) {
              resolve(data);
            } else {
              if (data.statusCode === STATUS_CODE.success) {
                resolve(data.data);
              } else {
                reject(data);
                !hideMsg && Message.info(data.message);
              }
            }
            break;
          default:
            message = `业务错误，错误码：${status}，${data.message}`;
            reject(data);
            Message.error(message);
            console.error('http error', options.url, data);
            break;
        }
      } catch (e: any) {
        const { response, request, message } = e;
        // 请求失败时,根据业务判断状态
        if (response) {
          const { data, status } = response;
          const msg = `请求失败: ${status}`;
          Message.error(msg);
          reject({ code: status, msg, data });
        } else if (request) {
          // 接口超时提醒
          if (message.indexOf('timeout') !== -1) {
            Message.error('接口请求超时，请重试！', 0);
            reject({ msg: message });
          } else {
            Message.error(message);
            reject({ msg: message });
          }
        }
      }
    });
  }

  public async all<U = T>(queue: Promise<U>[]) {
    return axios.all(queue);
  }
}
