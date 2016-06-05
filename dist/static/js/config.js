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
        },
        "echarts_multi" : {
            "tooltip" : {
                "trigger": 'item',
                "formatter": "{a} <br/>{b} : {c} ({d}%)"
            },
            // "legend": {
            //     "orient" : 'vertical',
            //     "x" : 'left',
            //     "data":['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            // },
            "toolbox": {
                "show" : true,
                "feature" : {
                    "mark" : {show: false},
                    "dataView" : {show: true, readOnly: false},
                    "magicType" : {
                        "show": false, 
                        "type": ['pie', 'funnel'],
                        "option": {
                            "funnel": {
                                "x": '25%',
                                "width": '50%',
                                "funnelAlign": 'left',
                                "max": 1548
                            }
                        }
                    },
                    "restore" : {show: true},
                    "saveAsImage" : {show: true}
                }
            },
            "calculable" : true,
            "series" : [
                {
                    "name":'访问来源',
                    "type":'pie',
                    "radius" : '55%',
                    "center": ['50%', '60%'],
                    "data":[
                        {value:335, name:'AB'},
                        {value:310, name:'AC'},
                        {value:234, name:'AD'},
                        {value:135, name:'BC'},
                        {value:1548, name:'BD'},
                        {value:335, name:'CD'},
                        {value:310, name:'ABC'},
                        {value:234, name:'ABD'},
                        {value:135, name:'ACD'},
                        {value:1548, name:'BCD'},
                        {value:1548, name:'ABCD'},
                    ]
                }
            ]
        },
        "echarts_fillblank" : {
            "tooltip" : {
                "trigger": 'item',
                "formatter": "{a} <br/>{b} : {c} ({d}%)"
            },
            "toolbox": {
                "show" : true,
                "feature" : {
                    "mark" : {show: false},
                    "dataView" : {show: true, readOnly: false},
                    "magicType" : {
                        "show": false, 
                        "type": ['pie', 'funnel'],
                        "option": {
                            "funnel": {
                                "x": '25%',
                                "width": '50%',
                                "funnelAlign": 'left',
                                "max": 1548
                            }
                        }
                    },
                    "restore" : {show: true},
                    "saveAsImage" : {show: true}
                }
            },
            "calculable" : true,
            "series" : [
                {
                    "name":'访问来源',
                    "type":'pie',
                    "radius" : '55%',
                    "center": ['50%', '60%'],
                    "data":[
                        {value:335, name:'AB'},
                        {value:310, name:'AC'},
                        {value:234, name:'AD'},
                        {value:135, name:'BC'},
                        {value:1548, name:'BD'},
                        {value:335, name:'CD'},
                        {value:310, name:'ABC'},
                        {value:234, name:'ABD'},
                        {value:135, name:'ACD'},
                        {value:1548, name:'BCD'},
                        {value:1548, name:'ABCD'},
                    ]
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