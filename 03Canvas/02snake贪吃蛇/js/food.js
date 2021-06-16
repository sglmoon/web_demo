//对象分析，食物、蛇、游戏
(function(){
	//保存随机产生的食物
	var elements = [];
	//食物对象，横坐标，纵坐标，宽，高，颜色
	function Food(x, y, width, height, color){
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 20;
		this.height = height || 20;
		this.color = color || "#04a328";
	}
	//食物初始化
	Food.prototype.init = function(map){
		//删除食物
		remove();
		//在地图中产生随机位置				
		this.x = Math.floor(Math.random() * (map.offsetWidth / this.width)) * this.width;
		this.y = Math.floor(Math.random() * (map.offsetHeight / this.height)) * this.height;
		//创建食物div
		var div = document.createElement("div");
		map.appendChild(div);				
		div.style.width = this.width + "px";
		div.style.height = this.height + "px";
		div.style.position = "absolute";
		div.style.left = this.x + "px";
		div.style.top = this.y + "px";
		div.style.backgroundColor = this.color;
		elements.push(div);
	}
	function remove(){
		for(var i = 0,len = elements.length ; i < len; i++){
			var ele = elements[i];
			ele.parentNode.removeChild(ele);
			elements.slice(i,1);
		}
	}
	window.Food = Food;
})();