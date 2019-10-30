var baseUrl = 'http://hbte.vaiwan.com/hbte-dingding'
var url = encodeURIComponent(baseUrl + '/login')
var obj = DDLogin({
  id: 'login_content', // 这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
  goto: encodeURIComponent('https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoa5zqcexnevugli82w&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=' + url), // 请参考注释里的方式
  style: 'border:none;background-color:#FFFFFF;',
  width: '365',
  height: '400'
})

var request = {}

request.success = function (data) {
  console.log(data)
  if (data.result === 'ok') {
    console.log('request success.')
  }
}

request.error = function (data) {
  console.log('request failed.')
}

var handleMessage = function (event) {
  var origin = event.origin

  console.log('origin', event.origin)
  if (origin === 'https://login.dingtalk.com') { // 判断是否来自ddLogin扫码事件。
    var loginTmpCode = event.data // 拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
    console.log('loginTmpCode', loginTmpCode)

    window.location.href = 'https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoa5zqcexnevugli82w&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=' + baseUrl + '/login' + '&loginTmpCode=' + loginTmpCode
  }
}
if (typeof window.addEventListener !== 'undefined') {
  window.addEventListener('message', handleMessage, false)
} else if (typeof window.attachEvent !== 'undefined') {
  window.attachEvent('onmessage', handleMessage)
}
