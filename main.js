function send(service, method, params) {
    var ip = document.getElementById("ip").value;
    var psk = document.getElementById("psk").value;
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var resp = xhr.responseText;
      log('-- ' + service + '.' + method + '(' + (params ? JSON.stringify(params) : '') + ') --'
      + '\nstatus: ' + xhr.status
      + '\n' + JSON.stringify(JSON.parse(xhr.response), null, '  '))
    };
    xhr.open('POST', 'http://' + ip + '/sony/' + service);
    if (psk) {
      xhr.setRequestHeader('X-Auth-PSK', psk);
    }
  
    xhr.send(JSON.stringify({
      method: method,
      version: '1.0',
      id: 1,
      params: params ? [params] : [],
    }));
  }
  function power(status) {
    send('system', 'setPowerStatus', {status: status});
  }
  function extInput() {
    var kind = document.getElementById("kind").value;
    var port = document.getElementById("port").value;
    var uri = 'extInput:' + kind + '?port=' + port;
    send('avContent', 'setPlayContent', {uri: uri});
  }
  function app(url) {
    var apptype = document.getElementById("apptype").value;
    var url = document.getElementById("url").value;
    var uri = 'localapp://webappruntime?' + apptype + '=' + url;
    send('appControl', 'setActiveApp', {uri: uri, data:''});
  }
  function mute(on) {
    send('audio', 'setAudioMute', {status:on});
  }
  function volume(val) {
    send('audio', 'setAudioVolume', {target:'speaker', volume:val});
  }
  function getWebAppStatus() {
    send('appControl', 'getWebAppStatus', null);
  }
  function terminateApps() {
    send('appControl', 'terminateApps', null);
  }
  function log(text) {
    var log = document.getElementById("log");
    log.innerHTML = text + '\n' + log.innerHTML;
  }
  function empty() {
    document.getElementById("log").innerHTML = '';
  }