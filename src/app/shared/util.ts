export function timeFormatter(value) {
    var format = 'yyyy-MM-dd hh:mm:ss';
     var date = {
         "M+": value.getMonth() + 1,
         "d+": value.getDate(),
         "h+": value.getHours(),
         "m+": value.getMinutes(),
         "s+": value.getSeconds(),
         "q+": Math.floor((value.getMonth() + 3) / 3),
         "S+": value.getMilliseconds()
     };
     if (/(y+)/i.test(format)) {
         format = format.replace(RegExp.$1, (value.getFullYear() + '').substr(4 - RegExp.$1.length));
     }
     for (var k in date) {
         if (new RegExp("(" + k + ")").test(format)) {
             format = format.replace(RegExp.$1, RegExp.$1.length == 1
                             ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
         }
     }
     return format;
 }