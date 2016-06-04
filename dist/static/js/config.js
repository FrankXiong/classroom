// var helper = {
//     check_form:function(data){
//         if(!data.stuid || !/^(\d{8})/.test(data.stuid)){
//             $.weui.topTips('请输入正确的学号');
//             return false;
//         }
//         if(!data.class){
//             $.weui.topTips('请选择教学班');
//             return false;
//         }
//     }
// }

// define(['jquery'],function($){
//     (function(){
//         $('.back').click(function(){
//             history.back()
//         })
//     })()
// })

define(function(){
    return {
        "leancloud":{
            "appId":"BoXslRV8OngKWN18wvltH7tq-gzGzoHsz",
            "appKey":"tPHW2xTOAFFxVn6krhF56NVe",
            "roomId":"574204e149830c00614b220e"
        },
        "echarts_single":{
            "tooltip": {
                "show": true
            },
            "legend": {
                "data":['人数']
            },
            "xAxis" : [
                {
                    "type" : 'category',
                    "data" : ["A","B","C","D"]
                }
            ],
            "yAxis" : [
                {
                    "type" : 'value'
                }
            ],
            "series" : [
                {
                    "name":"人数",
                    "type":"bar",
                    "data":[1, 0, 0, 0]
                }
            ]
        }
    }
})

// option = {
//     tooltip: {
//         show: true
//     },
//     legend: {
//         data:['人数']
//     },
//     xAxis : [
//         {
//             type : 'category',
//             data : ["A","B","C","D"]
//         }
//     ],
//     yAxis : [
//         {
//             type : 'value'
//         }
//     ],
//     series : [
//         {
//             "name":"人数",
//             "type":"bar",
//             "data":[countA, countB, countC, countD]
//         }
//     ]
// };