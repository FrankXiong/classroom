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
require.config({
    baseUrl: '/js',
    paths:{
        config:'config',
        jquery:'lib/jquery',
        AV:'lib/av',
        AVpush:'lib/AV.push',
        request:'widget/request',
        checkin:'widget/checkin'
    }
});

require(['jquery','config'],function($,conf){
    $(function(){
        AV.initialize(conf.leancloud.appId, conf.leancloud.appKey);

        var query = new AV.Query('Question')
        var myEcharts = $('.echart')
        var qObjectId = $('.qObjectId')
        var questions = []
        var countA,countB,countC,countD

        for(var i in myEcharts){
            questions[i] = AV.Object.createWithoutData('Question',qObjectId[i])
            query.equalTo('targetQuestion',questions[i])
            query.find().then((results)=>{
                countA = results.length
                console.log(countA)
            }).catch((err)=>{
                console.log(err)
            })
            var myChart = echarts.init(myEcharts[i]); 
            myChart.setOption(conf.echarts_single); 
        }

    })
})

// var countA = parseInt($('#countA').val()),
//     countB = parseInt($('#countB').val()),
//     countC = parseInt($('#countC').val()),
//     countD = parseInt($('#countD').val());
        
