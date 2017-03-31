/**
* 时间对象的格式化
*/
Date.prototype.format = function(format){
var y=this.getFullYear(),
    M=this.getMonth(),
    d=this.getDate(),
    h=this.getHours(),
    m=this.getMinutes(),
    s=this.getSeconds(),
    ms=this.getMilliseconds(),
    z= this.getTimezoneOffset(),
    wd=this.getDay(),
    me=new Date(y,M,0).getDate(),
    w=["\u65E5","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D"];
var h12=h>12?h-12:h;
var o = {
"y+" : y,                        //年份
"M+" : M+1,                        //月份
"d+" : d,                        //月份中的天数 
"H+" : h,                        //小时24H制            
"h+" : h12==0?12:h12,            //小时12H制
"m+" : m,                        //分钟
"s+" : s,                        //秒
"ms" : ms,                        //毫秒
"a+" : h>12||h==0?"PM":"AM",    //AM/PM 标记 
"w+" : wd,                        //星期 数字格式
"W+" : w[wd],                    //星期 中文格式
"q+" : Math.floor((m+3)/3),        //一月中的第几周
"e+" : me,                        //月份中的最大天数,如1月有31天,返回31 
"z+" : z                        //时区
}
if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4- RegExp.$1.length));
for (var i in o)
if (new RegExp("(" + i + ")").test(format))
    format = format.replace(RegExp.$1, RegExp.$1.length == 1? o[i]: ("00" + o[i]).substr(("" + o[i]).length));
return format;
};

  /**
   * jtime for  jQuery 显示时间插件
   * 功能：以不同的形式显示时间
   * @author 马德成
   * @version 1.0
   * @date 2013-01-10
   * @email xiaosefengqi@163.com
   * @qq 310851010
   * @param options 插件配置
   */
$.fn.jtime=function(options){
    var thisV=$(this);
    var defaults={
    date:new Date(),                            //起始时间
    loop:true,                                    //是否循环
    ontime:$.noop,                                //当时间变动时执行的函数
    format:"yyyy-MM-dd HH:mm:ss \u661F\u671FW"    //日期格式
    }
    var options = $.extend(defaults, options);
    options.date=(typeof options.date=="string")? new Date(Date.parse(options.date)):new Date(options.date);
    options.format=(typeof options.format=="undefined")||($.trim(options.format)=="")||typeof options.format !="string"?"yyyy-MM-dd HH:mm:ss 星期W":options.format;
    var date=options.date;
    var dateString=date.format(options.format);
    typeof thisV.attr("value")=="undefined"?thisV.text(dateString):thisV.val(dateString);
    if(options.loop){
        if(options.ontime) options.ontime(dateString);
        start();
        
    }
    function start(){
            date=new Date(options.date.setSeconds(options.date.getSeconds()+1));
            dateString=date.format(options.format);
            typeof thisV.attr("value")=="undefined"?thisV.text(dateString):thisV.val(dateString);
            if(options.ontime) options.ontime(dateString);
            window.setTimeout(start,1000);
        }
    return  thisV;
};

$(function(){
$(".jtime").jtime();
$("#jtime").jtime();
});


/**
 *
参数	    	默认值					描述

date		new Date()				起始时间
loop		true	    			是否变动
ontime		$.noop	    			当时间变动时执行的函数
format		"yyyy-MM-dd HH:mm:ss 	\u661F\u671FW"	日期格式
 *  
 */

