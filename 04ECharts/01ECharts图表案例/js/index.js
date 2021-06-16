// 监控区域
;
(function() {
    $('.monitor .tabs').on('click', 'a', function() {
        $(this)
            .addClass('active')
            .siblings('a')
            .removeClass('active');
        $('.monitor .content')
            .eq($(this).index())
            .show()
            .siblings('.content')
            .hide();
    });
    $('.marquee-view .marquee').each(function() {
        var rows = $(this)
            .children()
            .clone();
        $(this).append(rows);
    });
})();

//点位图
;
(function() {
    var pieChart = echarts.init($('.point .pie')[0]);
    var option = {
        color: [
            "#006cff",
            "#60cda0",
            "#ed8884",
            "#ff9f7f",
            "#0096ff",
            "#9fe6b8",
            "#32c5e9",
            "#1d9dff"
        ],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
            name: '点位模式',
            type: 'pie',
            radius: ['14%', '70%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
                borderRadius: 5
            },
            data: [
                { value: 20, name: "云南" },
                { value: 26, name: "北京" },
                { value: 24, name: "山东" },
                { value: 25, name: "河北" },
                { value: 20, name: "江苏" },
                { value: 25, name: "浙江" },
                { value: 30, name: "四川" },
                { value: 42, name: "湖北" }
            ],
            label: {
                fontSize: 10,
                color: '#fff',
                backgroundColor: 'transparent'
            },
            labelLine: {
                length: 6,
                length2: 8
            }
        }]
    };
    pieChart.setOption(option);
    $(window).resize(function() {
        pieChart.resize();
    });
})();

// 全国用户统计模块
;
(function() {
    var item = {
        value: 1200,
        //设置条框颜色
        itemStyle: {
            color: '#254065'
        },
        //取消鼠标经过的高亮显示
        emphasis: {
            itemStyle: {
                color: '#254065'
            }
        },
        //取消单个提示框
        tooltip: {
            extraCssText: 'opacity: 0'
        }
    };
    var barChart = echarts.init($('.users .bar')[0]);
    var option = {
        color: new echarts.graphic.LinearGradient(
            // (x1,y1) 点到点 (x1,y2) 之间进行渐变
            0,
            0,
            0,
            1, [
                { offset: 0, color: "#00fffb" }, // 0 起始颜色
                { offset: 1, color: "#0061ce" } // 1 结束颜色
            ]
        ),
        tooltip: {
            trigger: 'item'
        },
        grid: {
            left: '0%',
            right: '3%',
            top: '3%',
            bottom: '3%',
            containLabel: true,
            //是否显示坐标轴网格边框
            // show: true,
            //边框颜色
            // borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        xAxis: [{
            type: 'category',
            data: [
                "上海",
                "广州",
                "北京",
                "深圳",
                "合肥",
                "",
                "......",
                "",
                "杭州",
                "厦门",
                "济南",
                "成都",
                "重庆"
            ],
            //刻度线
            axisTick: {
                //刻度线是否指向柱条中间
                alignWithLabel: true,
                //是否显示刻度线
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            }
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                color: '#4c9bfd'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            }
        }],
        series: [{
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [
                2100,
                1900,
                1700,
                1560,
                1400,
                item,
                item,
                item,
                900,
                750,
                600,
                480,
                240
            ]
        }]
    };
    barChart.setOption(option);
    $(window).resize(function() {
        barChart.resize();
    });
})();

//销售统计模块
;
(function() {
    var data = {
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    };
    var lineChart = echarts.init($('.sales .line')[0]);
    var option = {
        legend: {
            right: '7%',
            textStyle: {
                color: '#4c9dfb'
            }
        },
        grid: {
            //设置图表位置
            left: '3%',
            right: '4%',
            top: '20%',
            bottom: '3%',
            //在left|bottom 设置为0时保证坐标轴刻度值正常显示
            containLabel: true,
            //显示图表边框
            show: true,
            //边框颜色
            borderColor: '#012f4a'
        },
        xAxis: {
            type: 'category',
            data: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月'
            ],
            //去除刻度线
            axisTick: false,
            //设置x轴文本颜色
            axisLabel: {
                color: '#4c9bfd'
            },
            //x轴线是否显示，去掉通过y轴分割线显示
            axisLine: {
                show: false
            },
            //去除轴内间距，让数据贴轴显示
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#4c9bfd'
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a'
                }
            }
        },
        tooltip: {
            //鼠标指向坐标轴显示项目提示信息
            trigger: 'axis'
        },
        series: [{
            name: '预期销售额',
            type: 'line',
            data: data.year[0],
            //折线设置为圆滑
            smooth: true
        }, {
            name: '实际销售额',
            type: 'line',
            data: data.year[1],
            smooth: true
        }],
        color: ['#00f2f1', '#ed3f35']
    };
    lineChart.setOption(option);
    //绑定事件
    $('.sales .caption').on('click', 'a', function() {
        index = $(this).index() - 1;
        $(this)
            .addClass('active')
            .siblings('a')
            .removeClass('active');
        var type = $(this).data('type');
        type = type || 'year';
        var arr = data[type];
        option.series[0].data = arr[0];
        option.series[1].data = arr[1];
        //重绘图表
        lineChart.setOption(option);
    });
    //自动播放
    var index = 0;
    var timer = setInterval(function() {
        index++;
        index = index >= 4 ? 0 : index;
        $('.sales .caption a').eq(index).click();
    }, 1200);
    //鼠标经过停止自动播放，鼠标离开重新开启定时器自动播放
    $('.sales').hover(function() {
        clearInterval(timer);
    }, function() {
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            index = index >= 4 ? 0 : index;
            $('.sales .caption a').eq(index).click();
        }, 1200);
    });
    $(window).resize(function() {
        lineChart.resize();
    });
})();

//销售渠道模块
;
(function() {
    var radarChart = echarts.init($('.channel .radar')[0]);
    var option = {
        radar: {
            indicator: [
                { name: "机场", max: 100 },
                { name: "商场", max: 100 },
                { name: "火车站", max: 100 },
                { name: "汽车站", max: 100 },
                { name: "地铁", max: 100 }
            ],
            // 修改雷达图的大小
            radius: "95%",
            shape: "circle",
            // 分割的圆圈个数
            splitNumber: 5,
            name: {
                // 修饰雷达图文字的颜色
                textStyle: {
                    // color: "#4c9bfd",
                    color: 'transparent'
                }
            },
            // 分割的圆圈线条的样式
            splitLine: {
                lineStyle: {
                    color: [
                        'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                        'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                        'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                    ].reverse()
                }
            },
            splitArea: {
                show: false
            },
            // 坐标轴的线修改为白色半透明
            axisLine: {
                lineStyle: {
                    color: "rgba(238, 197, 102, 0.5)"
                }
            }
        },
        series: [{
            name: "北京",
            type: "radar",
            // 填充区域的线条颜色
            lineStyle: {
                normal: {
                    color: "#fff",
                    width: 1,
                    opacity: 0.5
                }
            },
            data: [
                [80, 97, 54, 71, 39]
            ],
            // 修饰我们区域填充的背景颜色
            areaStyle: {
                color: "rgba(238, 197, 102, 0.6)"
            }
        }]
    };
    radarChart.setOption(option);
    $(window).resize(function() {
        radarChart.resize();
    })
})();

//销售进度
;
(function() {
    var pieChart = echarts.init($('.quarter .gauge')[0]);
    var option = {
        series: [{
            name: "销售进度",
            type: "pie",
            radius: ["130%", "150%"],
            // 移动下位置  套住50%文字
            center: ["48%", "80%"],
            //是否启用防止标签重叠策略
            // avoidLabelOverlap: false,
            labelLine: {
                normal: {
                    show: false
                }
            },
            // 饼形图的起始角度为 180， 注意不是旋转角度
            startAngle: 180,
            // 鼠标经过不需要放大偏移图形
            hoverOffset: 0,
            data: [{
                    value: 117,
                    itemStyle: {
                        // 颜色渐变#00c9e0->#005fc1
                        color: new echarts.graphic.LinearGradient(
                            // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                            0,
                            0,
                            0,
                            1, [
                                { offset: 0, color: "#00c9e0" }, // 0 起始颜色
                                { offset: 1, color: "#005fc1" } // 1 结束颜色
                            ]
                        )
                    }
                },
                {
                    value: 83,
                    itemStyle: {
                        color: "#12274d"
                    }
                },
                {
                    value: 200,
                    itemStyle: {
                        color: "transparent"
                    }
                }
            ]
        }]
    };
    pieChart.setOption(option);
    $(window).resize(function() {
        pieChart.resize();
    })
})();

//全国销量统计
;
(function() {
    // 1. 准备相关数据
    var hotData = [{
            city: "北京", // 城市
            sales: "25, 179", // 销售额
            flag: true, //  上升还是下降
            brands: [
                //  品牌种类数据
                { name: "可爱多", num: "9,086", flag: true },
                { name: "娃哈哈", num: "8,341", flag: true },
                { name: "喜之郎", num: "7,407", flag: false },
                { name: "八喜", num: "6,080", flag: false },
                { name: "小洋人", num: "6,724", flag: false },
                { name: "好多鱼", num: "2,170", flag: true }
            ]
        },
        {
            city: "河北",
            sales: "23,252",
            flag: false,
            brands: [
                { name: "可爱多", num: "3,457", flag: false },
                { name: "娃哈哈", num: "2,124", flag: true },
                { name: "喜之郎", num: "8,907", flag: false },
                { name: "八喜", num: "6,080", flag: true },
                { name: "小洋人", num: "1,724", flag: false },
                { name: "好多鱼", num: "1,170", flag: false }
            ]
        },
        {
            city: "上海",
            sales: "20,760",
            flag: true,
            brands: [
                { name: "可爱多", num: "2,345", flag: true },
                { name: "娃哈哈", num: "7,109", flag: true },
                { name: "喜之郎", num: "3,701", flag: false },
                { name: "八喜", num: "6,080", flag: false },
                { name: "小洋人", num: "2,724", flag: false },
                { name: "好多鱼", num: "2,998", flag: true }
            ]
        },
        {
            city: "江苏",
            sales: "23,252",
            flag: false,
            brands: [
                { name: "可爱多", num: "2,156", flag: false },
                { name: "娃哈哈", num: "2,456", flag: true },
                { name: "喜之郎", num: "9,737", flag: true },
                { name: "八喜", num: "2,080", flag: true },
                { name: "小洋人", num: "8,724", flag: true },
                { name: "好多鱼", num: "1,770", flag: false }
            ]
        },
        {
            city: "山东",
            sales: "20,760",
            flag: true,
            brands: [
                { name: "可爱多", num: "9,567", flag: true },
                { name: "娃哈哈", num: "2,345", flag: false },
                { name: "喜之郎", num: "9,037", flag: false },
                { name: "八喜", num: "1,080", flag: true },
                { name: "小洋人", num: "4,724", flag: false },
                { name: "好多鱼", num: "9,999", flag: true }
            ]
        }
    ];
    //  2. 根据数据渲染各省热销 sup 模块内容
    // (1) 遍历 hotData对象
    var supHTML = "";
    $.each(hotData, function(index, item) {
        // console.log(item);
        supHTML += `<li><span>${item.city}</span><span> ${item.sales} <s class=
    ${item.flag ? "icon-up" : "icon-down"}></s></span></li>`;
    });
    // 把生成的5个小li字符串给 sub dom盒子
    $(".sup").html(supHTML);
    // 3. 当鼠标进入 tab 的时候
    // 鼠标经过当前的小li要高亮显示
    $(".province .sup").on("mouseenter", "li", function() {
        index = $(this).index();
        render($(this));
    });

    // 声明一个函数 里面设置sup当前小li高亮还有 对应的品牌对象渲染
    // 这个函数需要传递当前元素进去
    function render(currentEle) {
        currentEle
            .addClass("active")
            .siblings()
            .removeClass();
        var subHTML = "";
        $.each(hotData[currentEle.index()].brands, function(index, item) {
            // 是对应城市的每一个品牌对象
            // console.log(item);
            subHTML += `<li><span>${item.name}</span><span> ${item.num}<s class=
    ${item.flag ? "icon-up" : "icon-down"}
    ></s></span></li>`;
        });
        // 把生成的6个小li字符串给 sub dom盒子
        $(".sub").html(subHTML);
    }
    // 4. 默认把第一个小li处于鼠标经过状态
    var lis = $(".province .sup li");
    lis.eq(0).mouseenter();
    // 5 开启定时器
    var index = 0;
    var timer = setInterval(function() {
        index++;
        if (index >= 5) index = 0;
        // lis.eq(index).mouseenter();
        render(lis.eq(index));
    }, 2000);

    $(".province .sup").hover(
        // 鼠标经过事件
        function() {
            clearInterval(timer);
        },
        // 鼠标离开事件
        function() {
            clearInterval(timer);
            timer = setInterval(function() {
                index++;
                if (index >= 5) index = 0;
                // lis.eq(index).mouseenter();
                render(lis.eq(index));
            }, 2000);
        }
    );
})();