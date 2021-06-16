window.onload = function() {

    //元素获取；focus、ul、ol、左右箭头
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var arror_l = document.querySelector('.arrow-l');
    var arror_r = document.querySelector('.arrow-r');

    //变量定义，num:记录当前图片位置，focusWidth:每张图片宽度，flag:节流阀标识(防止连点),timer定时器
    var num = 0;
    var flag = true;
    var focusWidth = focus.clientWidth;
    var timer = null;

    //inint,元素初始化（创建轮播图片和小圆点）
    init();

    //事件绑定
    //添加鼠标进入和离开事件，影藏和显示左右箭头
    focus.addEventListener('mouseenter', function() {
        arror_l.style.display = 'block';
        arror_r.style.display = 'block';
        clearInterval(timer);
    });
    focus.addEventListener('mouseleave', function() {
        arror_l.style.display = 'none';
        arror_r.style.display = 'none';
        timer = setInterval(function() {
            arror_r.click();
        }, 2000)
    });

    //右边箭头点击
    arror_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            setCircle(ul.children[num].getAttribute('index'));
        }
    });

    //左边箭头点击
    arror_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            setCircle(ul.children[num].getAttribute('index'));
        }
    });

    //小圆点点击事件绑定
    for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].addEventListener('click', function(e) {
            if (flag) {
                flag = false;
                num = this.getAttribute('index');
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                setCircle(num);
            }
        });
    }

    //自动播放
    timer = setInterval(function() {
        arror_r.click();
    }, 2000);

    //图片和小圆点初始化
    function init() {
        var imgArr = getBannerImgs();
        var imgStrs = [];
        for (var i = 0; i < imgArr.length; i++) {
            //初始化图片        
            imgStrs.push('<li index="' + i + '"><a href="javascript:;"><img src="' + imgArr[i] + '" alt=""></a></li>');
            // 初始化小圆点
            var li = document.createElement('li');
            li.setAttribute('index', i);
            ol.appendChild(li);
        }
        ul.innerHTML = imgStrs.join('');
        var firstImg = ul.children[0].cloneNode(true);
        ul.appendChild(firstImg);
        ol.children[0].className = 'current';
    }

    //获取数据源，目前写死，后续可改ajax接口请求
    function getBannerImgs() {
        var arr = [];
        var count = 4;
        for (var i = 1; i <= count; i++) {
            arr.push('upload/focus' + i + '.jpg')
        }
        return arr;
    }

    //设置小圆点
    function setCircle(index) {
        for (var i = 0; i < ol.children.length; i++) {
            if (i == index) {
                ol.children[i].className = 'current';
            } else {
                ol.children[i].className = '';
            }
        }
    }
};