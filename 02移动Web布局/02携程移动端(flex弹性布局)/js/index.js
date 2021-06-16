window.addEventListener('load', function() {
    //获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    var offsetWidth = focus.offsetWidth;
    var num = 0;
    var timer = setInterval(function() {
        num++;
        var transX = -num * offsetWidth;
        ul.style.transition = 'all 0.4s';
        ul.style.transform = 'translateX(' + transX + 'px)';
    }, 1500);
    //过渡结束判断图片是否到达两端，做特殊处理
    ul.addEventListener('transitionend', function() {
        if (num >= 3) {
            num = 0;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(0px)';
        } else if (num < 0) {
            num = 2;
            ul.style.transition = 'none';
            var transX = -num * offsetWidth;
            ul.style.transform = 'translateX(' + transX + 'px)';
        }
        //除去li中小圆点中的current
        ol.querySelector('.current').classList.remove('current');
        //给当前li设置current类
        ol.children[num].classList.add('current');
    });
    //添加触摸事件
    var startX = 0;
    var moveX = 0;
    var moveFlag = false; //判断手指触摸后是否进行过滑动操作
    ul.addEventListener('touchstart', function(e) {
        clearInterval(timer);
        startX = e.targetTouches[0].pageX;
    });
    ul.addEventListener('touchmove', function(e) {
        moveFlag = true;
        moveX = e.targetTouches[0].pageX - startX;
        var transX = -num * offsetWidth + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + transX + 'px)';
        //阻止默认行为，避免滑动轮播图时进行页面滚动切屏
        e.preventDefault();
    });
    ul.addEventListener('touchend', function(e) {
        if (moveFlag) {
            moveFlag = false;
            //手指滑动距离超过一定距离，进行上一张，下一张切换
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    num--;
                } else {
                    num++;
                }
                var transX = -num * offsetWidth;
                ul.style.transition = 'all 0.4s';
                ul.style.transform = 'translateX(' + transX + 'px)';
            } else {
                //滑动距离不足，弹回
                var transX = -num * offsetWidth;
                ul.style.transition = 'all 0.4s';
                ul.style.transform = 'translateX(' + transX + 'px)';
            }
        }
        clearInterval(timer);
        timer = setInterval(function() {
            num++;
            var transX = -num * offsetWidth;
            ul.style.transition = 'all 0.4s';
            ul.style.transform = 'translateX(' + transX + 'px)';
        }, 1500);
    });

    //返回顶部
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function() {
        window.scrollTo(0, 0);
    })

})