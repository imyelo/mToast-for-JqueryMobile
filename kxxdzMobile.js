/**
 * mToast @yelo 2012.10.11
 *     toast for jquerymobile
 * @type {Object}
 *       -{function}    alert       使用jqm的popup代替alert , 消息框不会自动消失
 *       -{function}    confirm     使用jqm的popup代替confirm , 消息框不会自动消失
 *       -{function}    error       使用jqm的错误提示框 , 样式在$.extend设置
 *                                  (pageLoadErrorMessageTheme) , 消息框自动消失
 *                                  
 * e.g. :   mToast.confirm("something here","confirm",function(){mToast.alert("Alert")});
 *          mToast.error("Error");
 */
var mToast = {
    /**
     * mToast.alert()
     * @param  {string} content       [弹窗内容]
     * @param  {object} popup_options [popup(jqm)的options, 参数列表参考jqm文档:
     * http://jquerymobile.com/demos/1.2.0/docs/pages/popup/options.html ]
     */
    alert   : function(content, popup_options){
        var html = "<div data-role='popup' id='mToast_alert'><p>" + content + "</p></div>";
        if($("div#mToast_alert").length > 0){
            $("div#mToast_alert").remove();
        }
        var options = popup_options ? popup_options : {
            overlayTheme    : "a",
            theme           : "e"
        };
        $(html).appendTo("div[data-role=page]:first");
        $("div#mToast_alert").trigger('create')
            .trigger('refresh')
            .popup(options);
        $("div#mToast_alert").popup('open');
    },
    /**
     * mToast.confirm()
     * @param  {string} content [内容 可为html]
     * @param  {string} title   [标题]
     * @param  {function} yes   [点击确定时执行的动作]
     */
    confirm : function(content, title, yes){
        var html = "<div data-role='popup' id='mToast_confirm' data-theme='d' data-overlay-theme='b' style='max-width:340px;overflow:hidden;'><div class='ui-header ui-bar-a ui-corner-top'><h1 class='ui-title'>" + title + "</h1></div><div class='ui-content'><p></p>" + content + "<p></p><a data-role='button' data-inline='true' data-rel='back' data-mini='true'>取消</a><a id='mToast_confirm_yes' data-role='button' data-theme='b' data-icon='check' data-inline='true' data-mini='true'>确定</a></div></div>";
        if($("div#mToast_confirm").length > 0){
            $("div#mToast_confirm").remove();
        }
        $(html).appendTo("div[data-role=page]:first");
        $("div#mToast_confirm").trigger('create')
            .trigger('refresh')
            .popup()
            .find("#mToast_confirm_yes").on('tap', function(){
                $("div#mToast_confirm").popup('close');
                yes();
            });
        $("div#mToast_confirm").popup('open');
    },
    /**
     * mToast.error()
     * @param  {string} content [消息内容]
     * @param  {int} timeout    [消失停留的时间]
     */
    error   : function(content, timeout){
        var time = timeout ? timeout : 1500;
        $.mobile.showPageLoadingMsg($.mobile.pageLoadErrorMessageTheme, content, true);
        setTimeout(function(){
            $.mobile.hidePageLoadingMsg();
        }, time);
    }
}