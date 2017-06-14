var scrLft,
	lastScrLft = 0,
	nonScrlWidth,
	scrWidth,
	scrHeight,
	demoDescVhgt;

$(document).ready(function() {
	//检测打开该网页的设备是否支持触摸屏, 从而针对性地定义hover/click事件, 解决兼容问题
	//参考http://www.javascriptkit.com/dhtmltutors/sticky-hover-issue-solutions.shtml
	/*document.addEventListener('touchstart', function addtouchclass(e) { // first time user touches the screen
	    document.documentElement.classList.add('can-touch'); // add "can-touch" class to document root using classList API
	    document.removeEventListener('touchstart', addtouchclass, false); // de-register touchstart event
	}, false);*/
	//手机端UC 360等坑爹浏览器默认"左右滑动前进后退", 会跟下方定义的左右滑动翻页功能冲突(表现为不仅网页在动, 整个窗口在左右移动),
	//下面是解决这个问题的方法, stackoverflow之:)
	$(window).on("touchmove", function(e) {
		e.preventDefault();
	});
	//上面方法存在BUG: 手机端每一屏都需要双击才能作出click响应
	var hoverAble = window.matchMedia("(hover:hover)").matches; //returns true or false
	matchScreen();
	$("#scrlPrev").click(function() {
		scrlPrev();
	});
	$("#scrlNext").click(function() {
		scrlNext();
	});
	/*setInterval(function() {
	    scrlNext();
	}, 2000);*/
	touchMove();
	//手机端项目简介窗口开启状态下点击页面空白处关闭该窗口
	$(".demoPanel").click(function() {
		//alert(!$("html").hasClass("can-touch"));
		var curDemoDesc = $(this)[0].childNodes[3];
		var curIptIntro = curDemoDesc.childNodes[1];
		//console.log(curDemoCont);
		if (curIptIntro.style.marginTop === "140px") {
			curDemoDesc.style.backgroundColor = "rgba(0, 0, 0, 0)";
			curIptIntro.style.marginTop = demoDescVhgt - 45 + "px";
		} else {
			curDemoDesc.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
			curIptIntro.style.marginTop = "140px";
		}
	});
	//如果设备不支持触摸事件, hover事件才能生效, 否则只能响应上方的click事件
	if (hoverAble) {
		$(".demoPanel").hover(function() {
			var curDemoDesc = $(this)[0].childNodes[3];
			var curIptIntro = curDemoDesc.childNodes[1];
			//console.log(curDemoCont);
			curDemoDesc.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
			curIptIntro.style.marginTop = "140px";
		}, function() {
			var curDemoDesc = $(this)[0].childNodes[3];
			var curIptIntro = curDemoDesc.childNodes[1];
			curDemoDesc.style.backgroundColor = "rgba(0, 0, 0, 0)";
			curIptIntro.style.marginTop = demoDescVhgt - 45 + "px";
		});
	}

});

$(window).resize(function() {
	matchScreen();
});

function matchScreen() {
	scrLft = 0;
	scrWidth = $(window).width();
	scrHeight = $(window).height();
	$("#container").width(scrWidth);
	$("#container").height(scrHeight - 34);
	if (scrWidth <= 414) {
		$(".demoPanel img, .demoDesc").width(scrWidth - 20);
		$(".demoDesc").height(scrWidth / 500 * 900);
		nonScrlWidth = 6 * scrWidth;
	} else if (scrWidth > 1920) {
		$("#container").css("padding-left", (scrWidth - 1920) * 0.5);
		$(".scrlBtn").css("display", "none");
	} else {
		nonScrlWidth = 1920;
	}
	if (scrHeight >= $(".demoPanel img").height() + 34) {
		if (scrWidth <= 414) {
			$(".title").css("padding", "2px 0");
		} else {
			$(".title").css("padding", "10px 0");
		}
		demoDescVhgt = $(".demoPanel img").height();
	} else {
		$(".title").css("padding", "2px 0");
		demoDescVhgt = scrHeight - 39;
	}
	$(".iptIntro").css("margin-top", demoDescVhgt - 45);
	$("#container").animate({
		scrollLeft: scrLft
	}, 500);
}

function scrlPrev() {
	//console.log("scrlPrev");
	if (scrLft > scrWidth * 0.3) {
		scrLft = scrLft - scrWidth + 5;
	} else {
		scrLft = nonScrlWidth - scrWidth - 5 * 5;
	}
	$("#container").animate({
		scrollLeft: scrLft
	}, 500);
	lastScrLft = scrLft;
}

function scrlNext() {
	//$("#scrlNext").click(function() {
	//console.log("scrLft = " + scrLft);
	//console.log("scrlNext");
	if (scrLft < nonScrlWidth - scrWidth - 25) {
		scrLft = scrLft + scrWidth - 5;
		//console.log("scrlNext scrLft = " + scrLft);
	} else {
		scrLft = 0;
	}
	//console.log("scrlNext after = " + scrLft);
	$("#container").animate({
		scrollLeft: scrLft
	}, 500);
	//});
	lastScrLft = scrLft;
}

//手机端触摸事件监听及左右滑动翻页
function touchMove() {
	var currentX,
		lastX = 0,
		lastT,
		minDist,
		abs = 1,
		moveTo = null;
	$("#container").on('touchmove', function(e) {
		//console.log("touchMove run");
		clearTimeout(lastT);
		currentX = e.originalEvent.touches[0].clientX;
		if (lastX === 0) {
			lastX = currentX;
		}

		/*console.log("lastX = " + lastX);
		console.log("currentX = " + currentX);*/
		if (currentX) {
			scrLft += lastX - currentX;
			//console.log("lastX - currentX = " + (lastX - currentX));
		}

		//拖动过程中, 卡片随手指移动
		$("#container").animate({
			scrollLeft: scrLft
		}, 4, "swing");
		//记录上一次拖到的位置
		lastX = currentX;
		lastT = setTimeout(function() {
			lastX = 0;
		}, 100);
	});
	$("#container").on("touchend", function(e) {
		//"+10"是为了避免触摸单击(很小的位移)被识别为滑动
		if (scrLft > lastScrLft + 10) {
			moveTo = "right";
		} else if (scrLft < lastScrLft - 10) {
			moveTo = "left";
		}
		//console.log("moveTo = " + moveTo);
		if (moveTo === "right") {
			if (lastScrLft >= nonScrlWidth - scrWidth - 25) {
				scrLft = 0;
			} else {
				scrLft = lastScrLft + scrWidth - 5;
			}
		} else if (moveTo === "left") {
			if (lastScrLft <= scrWidth - 5) {
				scrLft = nonScrlWidth - scrWidth - 25;
			} else {
				scrLft = lastScrLft - scrWidth + 5;
			}
		}
		/*注: 之前用的下面这种方法, 是根据网页滑动后距离边界的绝对值来判断, 
		距离第几个页面的左边或右边最近, 就停靠到这个页面的左边或右边, 
		这样做也可以实现触摸拖动滑屏的效果, 但存在一个问题: 
		比如向右滑动距离必须超过当前页面宽度的一半, 否则会弹回来已然靠近左边,
		上面改进的算法仅根据本次和上次的scrLft值的大小来判断是左滑还是右滑从而向左还是右靠边
		if (scrLft < 0) {
			scrLft = nonScrlWidth;
		} else if (scrLft > nonScrlWidth - scrWidth) {
			scrLft = 0;
		}
		minDist = scrLft;
		for (var t = 0; t < 6; t++) {
			if (Math.abs(scrLft - t * (scrWidth - 5)) < minDist) {
				minDist = Math.abs(scrLft - t * (scrWidth - 5));
				if (scrLft - t * (scrWidth - 5) > 0) {
					abs = -1;
				} else {
					abs = 1;
				}
			}
		}
		console.log("scrLft = " + scrLft);
		console.log("minDist = " + minDist);
		scrLft += minDist * abs;
		console.log("after touchend scrLft = " + scrLft);*/
		$("#container").animate({
			scrollLeft: scrLft
		}, 50, "swing");
		//一系列动作完成后记得某些参数需要重置为初始状态, 以免影响后续动作的判定
		currentX = undefined;
		lastScrLft = scrLft;
		moveTo = null;
	});
}