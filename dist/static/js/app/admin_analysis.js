// require.config({
//     paths: {
//         echarts: 'http://echarts.baidu.com/build/dist'
//     }
// });

// require(['echarts','echarts/chart/bar'],function (ec) {
//     // 基于准备好的dom，初始化echarts图表
//     var myChart = ec.init(document.getElementById('echart')); 
    
//     var option = {
//         tooltip: {
//             show: true
//         },
//         legend: {
//             data:['销量']
//         },
//         xAxis : [
//             {
//                 type : 'category',
//                 data : ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
//             }
//         ],
//         yAxis : [
//             {
//                 type : 'value'
//             }
//         ],
//         series : [
//             {
//                 "name":"销量",
//                 "type":"bar",
//                 "data":[5, 20, 40, 10, 10, 20]
//             }
//         ]
//     };

//     // 为echarts对象加载数据 
//     myChart.setOption(option); 
// });



var myChart = echarts.init(document.getElementById('echart')); 
var countA = parseInt($('#countA').val()),
    countB = parseInt($('#countB').val()),
    countC = parseInt($('#countC').val()),
    countD = parseInt($('#countD').val());
        
var option = {
    title:{
        text:'答案分布'
    },
    tooltip: {
        show: true
    },
    legend: {
        data:['人数']
    },
    xAxis : [
        {
            type : 'category',
            data : ["A","B","C","D"]
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            "name":"人数",
            "type":"bar",
            "data":[countA, countB, countC, countD]
        }
    ]
};

// 为echarts对象加载数据 
myChart.setOption(option); 