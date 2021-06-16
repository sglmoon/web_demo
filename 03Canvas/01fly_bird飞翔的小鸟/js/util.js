var util = {
    //扩展对象属性公用方法
    extend: function (o1, o2) {
        for (var key in o2) {
            if (o2.hasOwnProperty(key)) {
                o1[key] = o2[key];
            }
        }
    },
    //图片资源加载公用方法
    loadImage: function (imgUrl, callback) {
        var imgObj = {}; //保存图片资源
        var tempImg, loaded = 0, imgLen = 0;
        for (var key in imgUrl) {
            imgLen++;//资源总数
            tempImg = new Image();
            //为img图片注册加载事件
            tempImg.onload = function () {
                //当所有的图片都加载完成后调用回调函数
                loaded++;
                if (loaded >= imgLen) {
                    callback(imgObj);
                }
            };
            tempImg.src = imgUrl[key];
            imgObj[key] = tempImg;
        }
    }
};