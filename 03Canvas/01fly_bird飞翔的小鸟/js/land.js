(function(w){
    /*
    * constructor { Land } 大地
    * param { ctx: Context } 绘图环境
    * param { img: Image } 绘制的图片资源
    * param { speed: number } 速度
    * */
    function Land(ctx, img, speed) {
        this.ctx = ctx;
        this.img = img;
        this.speed = speed || 2;
        //根据实例个数计算每个实例初始位置
        Land.len++;
        this.x = this.img.width * (Land.len - 1);
        this.y = this.ctx.canvas.height - this.img.height;
    }

    //统计实例个数
    Land.len = 0;
    //给原型扩展方法
    util.extend(Land.prototype, {
        constructor: Land,
        //绘制图片
        draw: function () {
            this.ctx.drawImage(this.img, this.x, this.y);
        },
        update: function () {
            this.x -= this.speed;
            this.x += this.x <= -this.img.width ? this.img.width * Land.len : 0;
        }
    });
    //工厂模式
    w.getLand = function(ctx, img, speed){
        return new Land(ctx, img, speed);
    };
}(window));