(function (w) {
    /*
    * constructor { Scene }
    * param { ctx: Context } 绘图环境
    * param { imgObj: Object } 创建游戏场景需要的图片资源
    * param { ctx: number } 场景速度
    * */
    function Scene(ctx, imgObj, speed) {
        this.ctx = ctx;
        this.imgObj = imgObj;
        this.speed = speed || 3;

        //听众队列
        this.listeners = [];

        //场景需要的对象
        this.roles = [];
        this._initRoles();
    }

    //原型定义方法
    Scene.prototype = {
        constructor: Scene,
        //场景初始化
        _initRoles: function () {
            //天空背景2个
            this.roles.push(getSky(ctx, this.imgObj.sky, this.speed));
            this.roles.push(getSky(ctx, this.imgObj.sky, this.speed));
            //管道6个,不等间距
            for (var i = 0; i < 6; i++) {
                var space = Math.random() * 50 + 90;//90~140
                this.roles.push(getPipe(ctx, this.imgObj.pipeDown, this.imgObj.pipeUp, space, this.imgObj.land.height, this.speed));
            }
            //大地背景4个
            for (var i = 0; i < 4; i++) {
                this.roles.push(getLand(ctx, this.imgObj.land, this.speed));
            }
            //小鸟一只
            this.roles.push(getBird(ctx, this.imgObj.bird, 3, 1, 100, 100));
        },
        //添加听众
        addListener: function(listener){
            this.listeners.push(listener);
        },
        //监听小鸟碰撞，游戏结束
        triggerBirdOver: function(){
            //游戏结束时通知所有监听的听众
            this.listeners.forEach(function (liste) {
                liste();
            });
        },
        draw: function () {
            //判断小鸟是否发生碰撞,游戏结束
            var bird = getBird();
            var birdCoreX = bird.x + bird.width / 2;
            var birdCoreY = bird.y + bird.height / 2;
            if (this.ctx.isPointInPath(birdCoreX, birdCoreY)
                || birdCoreY <= 0
                || birdCoreY > (this.ctx.canvas.height - this.imgObj.land.height)) {
                //游戏结束,触发游戏结束方法
                this.triggerBirdOver();
            }else{
                //清除管道绘制的路径
                ctx.beginPath();
                //依次调用场景对象的draw和update方法绘制刷新场景
                this.roles.forEach(function (t) {
                    t.draw();
                    t.update();
                });
            }

        }
    };
    //工厂模式
    w.getGameScene = function (ctx, imgObj, speed) {
        return new Scene(ctx, imgObj, speed);
    }
}(window));