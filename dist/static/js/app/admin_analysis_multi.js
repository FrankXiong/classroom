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
        var question, countA, countB, countC, countD, id;
        var optionAB = [],
            optionAC = [],
            optionAD = [],
            optionBC = [],
            optionBD = [],
            optionCD = [],
            optionABC = [],
            optionABD = [],
            optionACD = [],
            optionBCD = [],
            optionABCD = [];
        var qType = $('#type').val();
        var echarts_conf = [];

        question = AV.Object.createWithoutData('Question', qObjectId.value);
        query.equalTo('targetQuestion', question);
        query.find().then(function (results) {
            for (var i = 0; i < results.length; i++) {
                var content = results[i].attributes.content;
                console.log(content);
                switch (content) {
                    case 'A,B':
                        optionAB.push(content);
                        break;
                    case 'A,C':
                        optionAC.push(content);
                        break;
                    case 'A,D':
                        optionAD.push(content);
                        break;
                    case 'B,C':
                        optionBC.push(content);
                        break;
                    case 'B,D':
                        optionBD.push(content);
                        break;
                    case 'C,D':
                        optionCD.push(content);
                        break;
                    case 'A,B,C':
                        optionABC.push(content);
                        break;
                    case 'A,B,D':
                        optionABD.push(content);
                        break;
                    case 'A,C,D':
                        optionACD.push(content);
                        break;
                    case 'A,B,C,D':
                        optionABCD.push(content);
                        break;
                }
            }
            var echarts_multi = conf.echarts_multi;
            var echarts_multi_data = echarts_multi.series[0].data;
            console.log(echarts_multi_data);
            echarts_multi_data[0].value = optionAB.length;
            echarts_multi_data[1].value = optionAC.length;
            echarts_multi_data[2].value = optionAD.length;
            echarts_multi_data[3].value = optionBC.length;
            echarts_multi_data[4].value = optionBD.length;
            echarts_multi_data[5].value = optionCD.length;
            echarts_multi_data[6].value = optionABC.length;
            echarts_multi_data[7].value = optionABD.length;
            echarts_multi_data[8].value = optionACD.length;
            echarts_multi_data[9].value = optionBCD.length;
            echarts_multi_data[10].value = optionABCD.length;
            var myChart = echarts.init(myEcharts);
            if (qType == 2) {
                myChart.setOption(echarts_multi);
            }
        }).catch(function (err) {
            console.log(err);
        });
    });
});