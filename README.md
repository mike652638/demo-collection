# DEMO-COLLECTION

This a webpage showing the demos of some selected projects of mine, the demos collected here might seem to be very simple (sometimes naive) since they were all my practicing projects when learning Front-end Developments from scratch, this page can be viewed @ <a href = "https://www.mike652638.com/demo.html">My Website Demo Page</a>. Any issues or bugs report are always welcome, helpful commits will be much appreciated :)

Main Functions/Features:

1. This page is mainly focusing on exhibition and navigation of some selected demos from my practicing projects, thus it's shown in the style of slides;

2. The page has been applied with CSS3 media query and jQuery $().css() to achieve responsive designs in most platforms and different sizes of screens, which have been simulated and tested in Chrome developer tools;

3. There are slide buttons on the left and right side of the page, by clicking which the slides can be switched back and forth; For mobile phones (with touch function), this page is responsively styled to keep each silde in full screen, moreover, apart from slide buttons, you can also touchMove on the screen horizontally and the slides will scroll according to your touchMove directions;

4. When hovering/clicking/touching on a specific slide, a Demo Introduction Modal (which stays at the bottom of the slide) will animates to the middle of the page, which will show a breif description of the project and link to the project demo page; 

5. To fix bugs for Touch vs. Hover events on mobile devices (the movement of Demo Introduction Moda fails), a hacking method window.matchMedia("(hover:hover)").matches was applied for detection of touch functions at first and then handle hover/touch events accordingly;

6. To fix the conflict of touchMove-to-slide function with default touchMove-to-forward/backward-window in some browsers like Safari, QQ and UC, etc, $(window).on("touchmove", function(e) { e.preventDefault(); }) was added;

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# 初期项目展示

这个小页面主要是节选一些我个人写的小网页, 这些小网页实现起来并不复杂, 因为他们是我从零开始自学前端初期的实践项目, 您可以进入<a target="_blank" href = "https://www.mike652638.com/demo.html">我的网站DEMO展示页</a>查看在线效果, 随时欢迎您提出任何问题, 建议或反馈 :) <br>

主要功能/特色:

1. 这个小页面的主要目的是挑选我的部分实践项目进行展示和导航, 所以它是类幻灯片的形式展现的;

2. 这个小页面运用了CSS3的媒体查询和jQuery的$().css()方法, 尽可能做到对不同平台不同尺寸屏幕的兼容(已在Chrome浏览器的开发者模式中模拟测试); 

3. 在页面的左端和右端均存在翻页按键, 点击该按键, 页面可以来回滚动; 在(具备触屏功能的)手机端, 这个页面专门做了响应式适配, 每一个DEMO展示页都占满全屏, 另外, 除了点击翻页按键外, 你还可以通过触屏并向左右滑动的方式来进行翻页浏览;

4. 当你在某一个展示页上点击/鼠标滑上/触摸时, 原位于展示页底部的"项目简介"窗口会滑动至页面中央, 其包含简短的项目描述和指向该项目的在线展示页面;

5. 为了解决手机端伪(鼠标)滑过事件和触摸事件的冲突问题(具体表现为项目简介窗口滑动功能失效), 页面中应用了window.matchMedia("(hover:hover)").matches这个方法先对设备是否支持触摸功能进行测试, 再作出相应的差异性设置(比如在支持触摸功能的移动端屏蔽hover功能);

6. 某些浏览器(比如Safari, QQ和UC等)默认开启了"滑动前进后退"的全局功能, 会与该页面的滑动翻页功能相冲突, 因此, 页面进一步优化加入了函数$(window).on("touchmove", function(e) { e.preventDefault(); })解决了这一冲突;

<a target="_blank" href = "https://www.mike652638.com/demo.html"><img src="https://www.mike652638.com/demo/img/demoScrSht-pc.png" alt="demo-screenshot" /></a>

