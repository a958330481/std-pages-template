/**
 * 获取git提交信息
 *
 * rule:
 * git show -s --format=以下的代码
 * 如： git show -s --format=%cn
 * %H: commit hash
 * %h: 缩短的commit hash
 * %T: tree hash
 * %t: 缩短的 tree hash
 * %P: parent hashes
 * %p: 缩短的 parent hashes
 * %an: 作者名字
 * %aN: mailmap的作者名字 (.mailmap对应，详情参照git-shortlog(1)或者git-blame(1))
 * %ae: 作者邮箱
 * %aE: 作者邮箱 (.mailmap对应，详情参照git-shortlog(1)或者git-blame(1))
 * %ad: 日期 (--date= 制定的格式)
 * %aD: 日期, RFC2822格式
 * %ar: 日期, 相对格式(1 day ago)
 * %at: 日期, UNIX timestamp
 * %ai: 日期, ISO 8601 格式
 * %cn: 提交者名字
 * %cN: 提交者名字 (.mailmap对应，详情参照git-shortlog(1)或者git-blame(1))
 * %ce: 提交者 email
 * %cE: 提交者 email (.mailmap对应，详情参照git-shortlog(1)或者git-blame(1))
 * %cd: 提交日期 (--date= 制定的格式)
 * %cD: 提交日期, RFC2822格式
 * %cr: 提交日期, 相对格式(1 day ago)
 * %ct: 提交日期, UNIX timestamp
 * %ci: 提交日期, ISO 8601 格式
 * %d: ref名称
 * %e: encoding
 * %s: commit信息标题
 * %f: sanitized subject line, suitable for a filename
 * %b: commit信息内容
 * %N: commit notes
 * %gD: reflog selector, e.g., refs/stash@{1}
 * %gd: shortened reflog selector, e.g., stash@{1}
 * %gs: reflog subject
 * %Cred: 切换到红色
 * %Cgreen: 切换到绿色
 * %Cblue: 切换到蓝色
 * %Creset: 重设颜色
 * %C(...): 制定颜色, as described in color.branch.* config option
 * %m: left, right or boundary mark
 * %n: 换行
 * %%: a raw %
 * %x00: print a byte from a hex code
 * %w([[,[,]]]): switch line wrapping, like the -w option of git-shortlog(1).
 */
const child_process = require('child_process');
const packageJson = require('../../package.json');

function generateCommitInfo() { 
  const version = packageJson.version;
  const name = packageJson.name;
  try {
    const hash = child_process.execSync('git show -s --format=%H').toString().trim();
    const shortHash = child_process.execSync('git show -s --format=%h').toString().trim();
    const subject = child_process.execSync('git show -s --format=%s').toString().trim();
    const timestamp = child_process.execSync('git show -s --format=%ct').toString().trim();
    const commitDateObj = new Date(child_process.execSync(`git show -s --format=%cd`).toString());
    const date = `${commitDateObj.getFullYear() +
      '-' +
      (commitDateObj.getMonth() + 1) +
      '-' +
      commitDateObj.getDate() +
      ' ' +
      commitDateObj.getHours() +
      ':' +
      commitDateObj.getMinutes()
      }`;
    return {
      name,
      hash,
      shortHash,
      subject,
      date,
      version,
      timestamp,
    }
  } catch { 
    return {
      name,
      hash:'',
      shortHash:'',
      subject:'',
      date:null,
      version,
      timestamp:null,
    }
  }
}

module.exports = generateCommitInfo;
