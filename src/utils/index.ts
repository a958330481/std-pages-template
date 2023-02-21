/**
 * 获取url参数
 * @param name
 * @returns
 */
function getQueryString(name: string) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}


export {
  getQueryString
};
