// Function called when page has loaded
function init() {
  //註冊裝置備妥處理事件
   document.addEventListener("deviceready", onDeviceReady, false);
}

// Function called when phonegap is ready
function onDeviceReady() {
   checkConnection();
} 

function checkConnection() {
    var networkState = navigator.network.connection.type;
     
   //定義網路名稱類型
    var states = {};
    states[Connection.UNKNOWN]  = '未知的網路型態';
    states[Connection.ETHERNET] = '乙太網路';
    states[Connection.WIFI]     = 'WiFi';
    states[Connection.CELL_2G]  = '行動網路-2G';
    states[Connection.CELL_3G]  = '行動網路-3G';
    states[Connection.CELL_4G]  = '行動網路-4G';
    states[Connection.NONE]     = '無網路';\
    document.getElementById('status').innerHTML = states[networkState];
}