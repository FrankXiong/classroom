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
        var id;
        var qType = $('#type').val();

        question = AV.Object.createWithoutData('Question', qObjectId.value);
        query.equalTo('targetQuestion', question);
        query.find().then(function (results) {
            if (results) {
                var myChart = echarts.init(myEcharts);
                myChart.setOption(conf.echarts_fillblank);
            } else {
                console.log('暂无回答');
            }
        }).catch(function (err) {
            console.log('Error: ' + error.code + ' ' + error.message);
        });
    });
});