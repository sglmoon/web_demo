(function (w) {
    /*
    * constructor { Bird } 小鸟
    * param { ctx: Context } 绘图环境
    * param { img: Image } 绘制的图片
    * param { widthFrame: number } 横向绘制的帧数
    * param { heightFrame: number } 纵向绘制的帧数
    * param { x: number } 起始x坐标
    * param { y: number } 起始y坐标
    * */
    function Bird(ctx, img, widthFrame, heightFrame, x, y) {
        this.ctx = ctx;
        this.img = img;
        this.widthFrame = widthFrame;
        this.heightFrame = heightFrame;
        this.x = x;
        this.y = y;
        //计算一个小鸟的宽和高
        this.width = this.img.width / this.widthFrame;
        this.height = this.img.height / this.heightFrame;
        //当前小鸟渲染的帧数
        this.currentFrame = 0;
        //小鸟默认的速度
        this.speed = 2;
        //下降的加速度
        this.speedDownPlus = 0.1;
        //每次上升的速度
        this.speedUp = 2;
        //绑定事件
        this._bind();
    }

    //原型扩展方法
    util.extend(Bird.prototype, {
        constructor: Bird,
        draw: function () {
            //下落时小鸟的旋转角度,最大仰视、俯视角度为45度
            var baseRadian = Math.PI / 180 * 10;
            var maxRadian = Math.PI / 180 * 45;
            var rotateRadian = baseRadian * this.speed;
            if(rotateRadian >= maxRadian){
                rotateRadian = maxRadian;
            }else if(rotateRadian <= -maxRadian){
                rotateRadian = -maxRadian;
            }
            //保存正常画布未旋转的状态
            this.ctx.save();
            /*
            * 1、平移到小鸟的中心点
            * 2、然后根据下落的速度旋转坐标系
            * 3、绘制小鸟，但是绘制的x和y坐标变为负的宽高一半。
            * */
            this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            this.ctx.rotate(rotateRadian);
            this.ctx.drawImage(this.img,
                this.width * this.currentFrame, 0,
                this.width, this.height,
                -this.width / 2, -this.height / 2,
                this.width, this.height
            );
            //状态回滚，小鸟旋转完成后，回滚到坐标轴未旋转状态
            this.ctx.restore();
        },
        update: function () {
            //绘制下一帧
            this.currentFrame = ++this.currentFrame >= this.widthFrame ? 0 : this.currentFrame;
            //让小鸟下落
            this.y += this.speed;
            //产生加速度
            this.speed += this.speedDownPlus;
        },
        _bind: function () {
            var self = this;
            window.addEventListener('keypress', function (event) {
                //空格控制游戏,长按加速
                if (event.keyCode == 32) {
                    self.speed = -(self.speedUp);
                    self.speedUp += 0.1;
                    self.speedUp = self.speedUp >= 10 ? 10: self.speedUp;
                }
            });
            window.addEventListener('keyup', function (event) {
                //空格释放，向上加速结束
                if (event.keyCode == 32) {
                    self.speedUp = 2;
                }
            });
        }
    });
    //单例模式
    var bird = null;
    w.getBird = function (ctx, img, widthFrame, heightFrame, x, y) {
        if (!bird) {
            bird = new Bird(ctx, img, widthFrame, heightFrame, x, y);
        }
        return bird;
    }
}(window));