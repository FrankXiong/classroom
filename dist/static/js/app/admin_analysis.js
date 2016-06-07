'use strict';

require.config({
    baseUrl: '/js',
    paths: {
        config: 'config',
        jquery: 'lib/jquery',
        AV: 'lib/av',
        AVpush: 'lib/AV.push',
        request: 'widget/request',
        checkin: 'widget/checkin',
        common: 'widget/common'
    }
});

require(['jquery', 'config', 'common'], function ($, conf, common) {
    $(function () {
        AV.initialize(conf.leancloud.appId, conf.leancloud.appKey);
        common.back();
        var query = new AV.Query('Answer');
        var myEcharts = $('.echart')[0];
        var qObjectId = $('.qObjectId')[0];
        var question;
        var countA, countB, countC, countD;
        var options = [];
        var optionA = [],
            optionB = [],
            optionC = [],
            optionD = [];
        var id;
        var qType = $('#type').val();
        var echarts_conf = [];

        // for(var i=0,len=myEcharts.length;i<len;i++){
        //     questions[i] = AV.Object.createWithoutData('Question',qObjectId[i].value)
        //     console.log(qObjectId[i].value)
        //     query.equalTo('targetQuestion',questions[i])
        //     query.find().then((results)=>{
        //         for(var i=0;i<results.length;i++){
        //             var content = results[i].attributes.content
        //             switch(content){
        //                 case 'A':
        //                     optionA.push(content)
        //                     options[0]=optionA
        //                     break
        //                 case 'B':
        //                     optionB.push(content)
        //                     options[1]=optionB
        //                     break
        //                 case 'C':
        //                     optionC.push(content)
        //                     options[2]=optionC
        //                     break
        //                 case 'D':
        //                     optionD.push(content)
        //                     options[3]=optionD
        //                     break
        //             }
        //         }
        //     }).catch((err)=>{
        //         console.log(err)
        //     })

        //     var myChart = echarts.init(myEcharts[i]);
        //     myChart.setOption(conf.echarts_single);

        // }

        // for(var i=0,len=myEcharts.length;i<len;i++){
        question = AV.Object.createWithoutData('Question', qObjectId.value);
        query.equalTo('targetQuestion', question);
        query.find().then(function (results) {
            for (var i = 0; i < results.length; i++) {
                var content = results[i].attributes.content;
                switch (content) {
                    case 'A':
                        optionA.push(content);
                        break;
                    case 'B':
                        optionB.push(content);
                        break;
                    case 'C':
                        optionC.push(content);
                        break;
                    case 'D':
                        optionD.push(content);
                        break;
                }
            }
            var echarts_single = conf.echarts_single;
            var echarts_single_data = echarts_single.series[0].data;
            echarts_single_data[0] = optionA.length;
            echarts_single_data[1] = optionB.length;
            echarts_single_data[2] = optionC.length;
            echarts_single_data[3] = optionD.length;
            var myChart = echarts.init(myEcharts);
            if (qType == 1) {
                myChart.setOption(conf.echarts_single);
            }
            if (qType == 2) {
                myChart.setOption(conf.echarts_multi);
            }
        }).catch(function (err) {
            console.log(err);
        });
    });
});