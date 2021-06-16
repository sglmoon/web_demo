/*
* 加载图片资源
* param { imgUrl: Object} key,value 形式存储要加载的图片资源
* param { callback: Function } 资源加载完成后要执行的回调函数
* */
function loadImage(imgUrl, callback){
    var imgObj = {}; //保存图片资源
    var tempImg,loaded = 0,imgLen = 0;
    for(var key in imgUrl){
        imgLen++;//资源总数
        tempImg = new Image();
        //为img图片注册加载事件
        tempImg.onload = function(){
            //当所有的图片都加载完成后调用回调函数
            loaded++;
            if(loaded >= imgLen){
                callback(imgObj);
            }
        };
        tempImg.src = imgUrl[key];
        imgObj[key] = tempImg;
    }
}