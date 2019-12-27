// 阿里云 前置地址
export const oosUrl = "http://gass.oss-cn-shanghai.aliyuncs.com/";

// 去除空格
export function Trim(a) {
  return a.replace(/\s*/g,"");
}
//笛卡尔积 算法
export function calcDescartes (array) {
  if (array.length < 2) return array[0] || [];
  return [].reduce.call(array, function (col, set) {
    var res = [];
    col.forEach(function (c) {
      set.forEach(function (s) {
        var t = [].concat(Array.isArray(c) ? c : [c]);
        t.push(s);
        res.push(t);
      })
    });
    return res;
  });
}
