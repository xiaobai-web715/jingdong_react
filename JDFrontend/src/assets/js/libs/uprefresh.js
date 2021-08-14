/*eslint-disable*/
//视频老师写的组件
(function (global,document,factory) {
    //这个判断支持模块化比如react和vue
    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = factory(global,document);
    } else if ( typeof define == 'function' && define.amd ) {
        define( function () { return factory(global,document); } );
    } else if(typeof global != "undefined") {
        global.UpRefresh = factory(global,document);
    }
})(window, document,function (global,document) {
    //因为老师使用的是类组件,我用函数组件直接调用好像会出现错误
    // var UpRefresh=function(){
    var UpRefresh=function(opts,callback){
        this.fnScrollBottom=null;
        //当new实例之后这里this.eventScroll()会执行
        this.eventScroll();
        //下面这行是我添加的，原本是没有的
        this.init(opts,callback);
    };
    UpRefresh.prototype={
        // init:function(){
        init:function(opts,callback){
            if(opts instanceof Object) {
                this.opts = opts;
                this.iMaxPage=this.opts.maxPage;
                this.fnCallback=callback;
                this.iOffsetBottom=this.opts.offsetBottom;
                this.iCurPage=this.opts.curPage;
            }

        },
        eventScroll:function(){
            var _this=this;
            //这里的this指向UpRefresh;
            //然后这里会执行scrollBottom()
            _this.fnScrollBottom=_this.scrollBottom().bind(this);
            global.addEventListener("scroll",_this.fnScrollBottom,false);
        },
        uneventSrcoll:function(){
            var _this=this;
            global.removeEventListener("scroll",_this.fnScrollBottom,false);
        },
        scrollBottom:function(){
            //因为bind的强制绑定,这里的this也指向UpRefresh
            var _this=this;
            var bScroll=true;
            return function(){
                if(!bScroll){
                    return;
                }
                bScroll=false;
                var timer=null;
                clearTimeout(timer);
                timer = setTimeout(function(){
                    //整个页面滚动条的高度
                    var iScrollHeight=document.documentElement.scrollHeight || document.body.scrollHeight;
                    //滚动到当前的距离
                    var iScrollTop=document.documentElement.scrollTop || document.body.scrollTop;
                    //整个窗体的高度
                    var iWinHeight=document.documentElement.clientHeight || document.body.clientHeight;
                    //打印出来这里是可以执行的
                    if(iScrollHeight-(iWinHeight+iScrollTop)<=_this.iOffsetBottom){
                        if(_this.iCurPage<_this.iMaxPage) {
                            //从打印可以看出这里并没有执行
                            _this.iCurPage++;
                            _this.fnCallback(_this.iCurPage);
                        }
                    }
                    bScroll=true;
                },300);
            }
        }
    };
    return UpRefresh;
});
