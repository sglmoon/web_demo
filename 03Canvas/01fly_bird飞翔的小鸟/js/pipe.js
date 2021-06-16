(function(w){
    /*
    * constructor { Pipe } 管道
    * param { ctx: Context } 绘图环境
    * param { imgDown: Image } 上管道图片资源
    * param { imgUp: Image } 下管道图片资源
    * param { space: number } 间隙
    * param { landHeight: number } 大地高度
    * param { speed: number } 管道速度    *
    * */
    function Pipe(ctx, imgDown, imgUp, space, landHeight, speed) {
        this.ctx = ctx;
        this.imgDown = imgDown;
        this.imgUp = imgUp;
        this.space = space;
        this.landHeight = landHeight;
        this.speed = speed;
        //管道最下高度
        this.minHeight = 80;
        //管道默认高度
        this.width = this.imgDown.width;
        this.height = this.imgDown.height;
        Pipe.len++;
        this.x = 300 + this.width * 3 * (Pipe.len - 1);
        this.y = 0;
        //初始化管道位置
        this._init();
    }

    //管道实例的个数
    Pipe.len = 0;
    //扩展原型方法
    util.extend(Pipe.prototype, {
        constructor: Pipe,
        //初始化管道坐标
        _init: function () {
            //单个管道的最大高度
            var maxHeight = this.ctx.canvas.height - this.landHeight - this.space - this.minHeight;
            //随机生成管道高度在50~maxHeight之间
            var randomHeight = Math.random() * maxHeight;
            randomHeight = randomHeight < this.minHeight ? this.minHeight : randomHeight;
            //计算上管道的y轴坐标
            this.downY = randomHeight - this.height;
            //计算下管道的y轴坐标
            this.upY = randomHeight + this.space;
        },
        //绘制管道
        draw: function () {
            this.ctx.drawImage(this.imgDown, this.x, this.downY);
            this.ctx.drawImage(this.imgUp, this.x, this.upY);
            this._drawPath();
        },
        //绘制管道路径
        _drawPath: function () {
            this.ctx.rect(this.x, this.downY, this.width, this.height);
            this.ctx.rect(this.x, this.upY, this.width, this.height);
//            this.ctx.stroke();
        },
        //更新下一帧的数据
        update: function () {
            this.x -= this.speed;
            //管道走出画布，生成新的高度不同的管道
            if (this.x <= -this.width) {
                this._init();
                this.x += this.width * 3 * Pipe.len;
            }
        }
    });
    //工厂模式
    w.getPipe = function(ctx, imgDown, imgUp, space, landHeight, speed) {
        return new Pipe(ctx, imgDown, imgUp, space, landHeight, speed);
    };
}(window));