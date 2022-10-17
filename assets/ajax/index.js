export default function Ajax (mathod = 'GET', url = '', data = {}) {
  return new Promise((resolve, reject) => {
    const xml = new XMLHttpRequest()
    xml.open(mathod, url, true)
    xml.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xml.setRequestHeader("X-AUTH-TOKEN", "7f92518a677b408f9554ac8bab282e47_eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqaWNhaSIsInN1YiI6ImppY2FpIiwiaWF0IjoxNjY1OTcyNjE1fQ.AHlzBv03ExBG37qeBtJR248oIqht0sxGNVU4qYT8QOA");
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
