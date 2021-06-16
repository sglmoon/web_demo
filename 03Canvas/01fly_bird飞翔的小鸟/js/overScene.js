(function(w){
    /*
    * constructor { OverScene } 游戏结束场景
    * param { ctx: Context } 绘图环境
    * */
    function OverScene(ctx){
        this.ctx = ctx;
    }
    OverScene.prototype.draw = function(){
        //为了避免绘制游戏结束场景设置的属性影响全局状态，先将全局属性save绘制后restore
        this.ctx.save();

        this.ctx.fillStyle = 'rgba(100,100,100,0.8)';
        this.ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = 'red';
        this.ctx.font = '900 40px 微软雅黑';
        this.ctx.fillText('GAME OVER!!!', ctx.canvas.width / 2, ctx.canvas.height / 2);


        this.ctx.restore();
    };
    //工厂模式
    w.getOverScene = function(ctx){
        return new OverScene(ctx);
    }
}(window));