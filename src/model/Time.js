
var time = {
    formatDateTime(date){
        var newdate = new Date(date);
        
        var y = newdate.getFullYear();
        var m = newdate.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = newdate.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = newdate.getHours();
        h= h < 10 ? ('0' + h) : h;
        var min = newdate.getMinutes();
        min= min < 10 ? ('0' + min) : min;
        var s = newdate.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + m + '-' + d+' ' + h+':'+min+':'+s
    },
    getNowFormatDate(){
        var date = new Date();
        let Str=date.getFullYear() + '/' +
        (date.getMonth() + 1) + '/' + 
        date.getDate() + ' ' + 
        date.getHours() + ':' + 
        date.getMinutes() + ':' + 
        date.getSeconds()
        return Str
        // var seperator1 = "-";
        // var year = date.getFullYear();
        // var month = date.getMonth() + 1;
        // var strDate = date.getDate();
        // if (month >= 1 && month <= 9) {
        //     month = "0" + month;
        // }
        // if (strDate >= 0 && strDate <= 9) {
        //     strDate = "0" + strDate;
        // }
        // var currentdate = year + seperator1 + month + seperator1 + strDate;
        // return currentdate;
    }
}



export default  time;
    
