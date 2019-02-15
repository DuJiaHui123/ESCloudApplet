// 格式化时间
function formatTime(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  returnArr.push(date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
  returnArr.push(date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
  returnArr.push(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  returnArr.push(date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}


module.exports = {
  formatTime
}