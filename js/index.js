$(function(e){
    var winHeight = $(window).height();

    $(window).scroll(function () {
        if ($(window).scrollTop() > winHeight) {
            $('#to-top').fadeIn();
        }
        else {
            $('#to-top').fadeOut();
        }
    });
    $('#to-top').click(function(e){
        var pos = $('#body').offset().top;
        $("html,body").animate({scrollTop: pos}, 1000);
        e.preventDefault();
    });
	$('.all-cat>ul>li').hover(function(e){
		$(this).children('ul').toggleClass('hover');
	});
	$('.slide-nav a').hover(function(e){
		$(this).addClass('current').siblings('a').removeClass('current');
		var tar = $(this).attr('href');
		$('#'+tar).fadeIn(500).siblings('div').fadeOut(0);
		e.preventDefault();
	});
    //排序
    var way=location.search.split('&')[1];
    $('.order-way a').each(function(e){
        var href = $(this).attr('href');
        if(href.match(way)==way){
            $(this).addClass('selected').siblings('a').removeClass('selected');
        }
    });
    //分页
    $('.page-actions a').click(function(e){
        var $this  = $(this),
           pageNum = $('.page-actions span').html().split('/');
        if($this.attr('class').match('prev')=='prev'){
            if(Number(pageNum[0]) > 1){
                location.href = '&pageNum='+(Number(pageNum[0])-1);
            }
        }
        if($this.attr('class').match('next')=='next'){
            if(Number(pageNum[0]) < Number(pageNum[1])){
                location.href = '&pageNum='+(Number(pageNum[0])+1);
            }
        }
        e.preventDefault();
    });
    //选择商品细节
    $('.item a').click(function(e){
        var $this = $(this);
        //添加橙色选中状态样式
        $this.addClass('selected').siblings('a').removeClass('selected');

        //商品数量加减
        if($this.attr('class').match('minus')=='minus'){
            var value = $('#sp-num').val();
            if(value > 1){
                $('#sp-num').val(value-1);
            }
        }
        else if($this.attr('class').match('plus')=='plus'){
            var value = $('#sp-num').val();
            if(value < 100){
                $('#sp-num').val(Number(value)+1);
            }
        }

        e.preventDefault();
    });

    //买
    /*if ($this.parent('.item').attr('id').match('munth')=='munth') {
        var rate = $('#munth a.selected strong').html();
        location.href = '&rate='+rate;
    };*/
    $('#munth a').click(function(e){
        //var id=$('#id').val(),
         //buyCount = $('#sp-num').val(),
         //ratio = parseFloat($('#sf-rate').val()),
         rate = $('#munth a.selected strong').html();
        //location.href='/product.aspx?id='+id+'&buyCount='+buyCount+'&ratio='+ratio+'&rate='+rate;
         location.href = '&rate='+rate;
    })
    //其它处理
    $('#sf-rate').change(function(){

        var $this = $(this),
            total = $('.value').html().split(',').join('');

        var n = (parseFloat($this.val())*total/100).toString(),
            re =  /\d{1,3}(?=(\d{3})+$)/g;

        var n1=n.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});

        $('#shoufu').html(n1);
        location.href = '&ratio='+parseFloat($this.val());

    });
    //千分位数字
    $('.value,.sc-value,#yuegong').each(function(e){
        var $this = $(this),
                n = $this.html(),
               re =  /\d{1,3}(?=(\d{3})+$)/g;

        var n1=n.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
        $this.html(n1);             
    });

    //全部商品
    $('.all-cat').hover(function(e){
        if($(this).attr('class').match('notindex')=='notindex'){
            $(this).toggleClass('collapse');
        }
        e.preventDefault();
    });

    // 图片上下滚动
	var count = $("#imageMenu li").length - 5; /* 显示 6 个 li标签内容 */
	var interval = $("#imageMenu li:first").width();
	var curIndex = 0;
	
	$('.scrollbutton').click(function(){
		if( $(this).hasClass('disabled') ) return false;
		
		if ($(this).hasClass('smallImgUp')) --curIndex;
		else ++curIndex;
		
		$('.scrollbutton').removeClass('disabled');
		if (curIndex == 0) $('.smallImgUp').addClass('disabled');
		if (curIndex == count-1) $('.smallImgDown').addClass('disabled');
		
		$("#imageMenu ul").stop(false, true).animate({"marginLeft" : -curIndex*interval + "px"}, 600);
	});	
	// 解决 ie6 select框 问题
	$.fn.decorateIframe = function(options) {
    }
    $.fn.decorateIframe.defaults = {
        iframeId: "decorateIframe1",
        iframeZIndex: -1,
        width: 0,
        height: 0
    }
    //放大镜视窗
    $("#bigView").decorateIframe();
    //点击到中图
    var midChangeHandler = null;
	
    $("#imageMenu li img").bind("click", function(){
		if ($(this).attr("id") != "onlickImg") {
			midChange($(this).attr("src").replace("small", "mid"));
			$("#imageMenu li").removeAttr("id");
			$(this).parent().attr("id", "onlickImg");
		}
	}).bind("mouseover", function(){
		if ($(this).attr("id") != "onlickImg") {
			window.clearTimeout(midChangeHandler);
			midChange($(this).attr("src").replace("small", "mid"));
			$(this).css({ "border-color": "#aaa" });
		}
	}).bind("mouseout", function(){
		if($(this).attr("id") != "onlickImg"){
			$(this).removeAttr("style");
			midChangeHandler = window.setTimeout(function(){
				midChange($("#onlickImg img").attr("src").replace("small", "mid"));
			}, 1000);
		}
	});
    function midChange(src) {
        $("#midimg").attr("src", src).load(function() {
            changeViewImg();
        });
    }
    //大视窗看图
    function mouseover(e) {
        if ($("#winSelector").css("display") == "none") {
            $("#winSelector,#bigView").show();
        }
        $("#winSelector").css(fixedPosition(e));
        e.stopPropagation();
    }
    function mouseOut(e) {
        if ($("#winSelector").css("display") != "none") {
            $("#winSelector,#bigView").hide();
        }
        e.stopPropagation();
    }
    $("#midimg").mouseover(mouseover); //中图事件
    $("#midimg,#winSelector").mousemove(mouseover).mouseout(mouseOut); //选择器事件

    var $divWidth = $("#winSelector").width(); //选择器宽度
    var $divHeight = $("#winSelector").height(); //选择器高度
    var $imgWidth = $("#midimg").width()+40; //中图宽度
    var $imgHeight = $("#midimg").height()+40; //中图高度
    var $viewImgWidth = $viewImgHeight = $height = null; //IE加载后才能得到 大图宽度 大图高度 大图视窗高度

    function changeViewImg() {
        $("#bigView img").attr("src", $("#midimg").attr("src").replace("mid", "big"));
    }
    changeViewImg();
    $("#bigView").scrollLeft(0).scrollTop(0);
    function fixedPosition(e) {
        if (e == null) {
            return;
        }
        var $imgLeft = $("#midimg").offset().left; //中图左边距
        var $imgTop = $("#midimg").offset().top; //中图上边距
        X = e.pageX - $imgLeft - $divWidth / 2; //selector顶点坐标 X
        Y = e.pageY - $imgTop - $divHeight / 2; //selector顶点坐标 Y
        X = X < 0 ? 0 : X;
        Y = Y < 0 ? 0 : Y;
        X = X + $divWidth > $imgWidth ? $imgWidth - $divWidth : X;
        Y = Y + $divHeight > $imgHeight ? $imgHeight - $divHeight : Y;

        if ($viewImgWidth == null) {
            $viewImgWidth = $("#bigView img").outerWidth();
            $viewImgHeight = $("#bigView img").height();
            if ($viewImgWidth < 200 || $viewImgHeight < 200) {
                $viewImgWidth = $viewImgHeight = 800;
            }
            $height = $divHeight * $viewImgHeight / $imgHeight;
            $("#bigView").width($divWidth * $viewImgWidth / $imgWidth);
            $("#bigView").height($height);
        }
        var scrollX = X * $viewImgWidth / $imgWidth;
        var scrollY = Y * $viewImgHeight / $imgHeight;
        $("#bigView img").css({ "left": scrollX * -1, "top": scrollY * -1 });
        $("#bigView").css({ "top": 195, "left": $(".preview").offset().left + $(".preview").width() + 15 });

        return { left: X, top: Y };
    }

    //tab
    $("#content>div").hide(); // Initially hide all content
	$("#tabs li:first").attr("id","current"); // Activate first tab
	$("#content>div:first").fadeIn(); // Show first tab content
    
    $('#tabs a').click(function(e) {
        e.preventDefault();        
        $("#content>div").hide(); //Hide all content
        $("#tabs li").attr("id",""); //Reset id's
        $(this).parent().attr("id","current"); // Activate this
        $('#' + $(this).attr('title')).fadeIn(); // Show content for current tab
    });


});
