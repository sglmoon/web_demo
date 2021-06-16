(function (w) {
    /*
    * constructor { Sky } 天空
    * param { ctx: Context } 绘图环境
    * param { img: Image } 绘制的图片资源
    * param { speed: number } 速度
    * */
    function Sky(ctx, img, speed) {
        this.ctx = ctx;
        this.img = img;
        this.speed = speed;
        //根据实例个数计算每个实例初始位置
        Sky.len++;
        this.x = this.img.width * (Sky.len - 1);
        this.y = 0;
    }

    //统计实例个数
    Sky.len = 0;
    //扩展原型方法
    util.extend(Sky.prototype, {
        constructor: Sky,
        draw: function () {
            this.ctx.drawImage(this.img, this.x, this.y);
        },
        update: function () {
            this.x -= this.speed;
            if (this.x <= -this.img.width) {
                this.x += this.img.width * Sky.len;
            }
        }
    });
    //对外提供创建对象方法，工厂模式
    w.getSky = function(ctx, img, speed){
        return new Sky(ctx, img, speed);
    };
}(window));