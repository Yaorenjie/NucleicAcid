import request from './request'

// 如果说比较懒，或者是不想这么麻烦，也可直接用这两个，调用的时候第一个参数换成接口地址即可
export function httpGet(url, params) {
  return new Promise((resolve, reject)=>{
      request.get(url, params).then((result)=>{
          resolve(result)
      }).catch(err=>{
          reject(err)
      });
  });
}

export function httpPost(url, params, contentType) {
  return new Promise((resolve, reject)=>{
      request.post(url, params, contentType).then((result)=>{
          resolve(result)
      }).catch(err=>{
          reject(err)
      });
  });
}
export function httpPut(url, params) {
  return new Promise((resolve, reject)=>{
      request.put(url, params).then((result)=>{
          resolve(result)
      }).catch(err=>{
          reject(err)
      });
  });
}