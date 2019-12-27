import { oosUrl } from './common'
import { Message } from 'element-ui';
// 上传图片到阿里云 方法疯转
export function on_click_upload_file(f){
    // let that = this;
   return new Promise((resolve,reject)=>{
     var client = new OSS.Wrapper({
       region : 'oss-cn-shanghai',
       accessKeyId : 'LTAIRbASt5lc1j85',
       accessKeySecret : '7tAzN8p6PbI13v3wHF0AbOhvISr3Aj',
       bucket : 'gass' // 需要分 文件夹
     });
     var val= f.name;
     var suffix = val.substr(val.indexOf("."));
     var obj=timestamp();  // 这里是生成文件名
     var storeAs = 'a/'+obj+suffix;  //命名空间
     client.multipartUpload(storeAs, f).then(function (result) {
       //console.log(oosUrl+result.name) ////返回链接
       resolve(oosUrl+result.name);
     }).catch(function (err) {
       Message.error('err');
       return
       //reject(err);
     });
   })

  }
  function timestamp(){
    var time = new Date();
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    //console.log(y);

    return ""+y+add0(m)+add0(d)+add0(h)+add0(mm)+add0(s);
  }

  function add0(m){
    return m<10?'0'+m : m;
  }

