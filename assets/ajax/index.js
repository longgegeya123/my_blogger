import { state } from '~/store'
export default function Ajax (mathod = 'GET', url = '', data = {}) {
  console.log('222222222222');
  console.log(state, 'state-------------------');
  const cookie = require('cookie')
  console.log(cookie.parse('token'), '---------------------------cookie');
  return new Promise((resolve, reject) => {
    const baseUrl = ''
    const token = '7f92518a677b408f9554ac8bab282e47_eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqaWNhaSIsInN1YiI6ImppY2FpIiwiaWF0IjoxNjY2MzM3MTE1fQ.CXrVs9tv4455nUQsT4Tcu3t_eXSxCq7cATdTLmRBvWA'
    const xml = new XMLHttpRequest()
    xml.open(mathod, baseUrl + url, true)
    xml.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xml.setRequestHeader("X-AUTH-TOKEN", token);
    xml.send(JSON.stringify(data))
    xml.onreadystatechange = function () {
      if (xml.readyState === 4) { // 成功完成
        if (xml.status === 200) {
          // 成功，通过responseText拿到响应的文本:
          resolve(xml.responseText);
        } else {
          // 失败，根据响应码判断失败原因:
          reject(xml.status);
        }
      } else {
        console.log('请求还在继续。。。。')
      }
    }
  })
}
