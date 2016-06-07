'use strict';

require.config({
    baseUrl: '/js',
    paths: {
        config: 'config',
        jquery: 'lib/jquery',
        AV: 'lib/av',
        AVpush: 'lib/AV.push',
        amaze: 'lib/amazeui',
        request: 'widget/request',
        checkin: 'widget/checkin',
        moment: 'lib/moment',
        common: 'widget/common'
    }
});

require(['jquery', 'config', 'checkin', 'amaze'], function ($, conf, Checkin) {
    $(function () {

        AV.initialize(conf.leancloud.appId, conf.leancloud.appKey);
        Checkin.checkin();
        var push = AV.push({
            appId: conf.leancloud.appId,
            appKey: conf.leancloud.appKey
        });

        var $modal = $('#msgModal'),
            $msgContent = $('#msgContent')[0],
            sendBtn = $('#sendBtn'),
            uname = $('#uname').val(),
            printWall = $('#printWall'),
            msgErrorBox = $('.msg-error');

        var Ask = AV.Object.extend('Ask');

        push.open(function () {
            console.log('可以接收推送');
            msgErrorBox[0].innerText = '可以接收推送';
            msgErrorBox.addClass('am-alert-success');
            msgErrorBox.css('display', 'block');
            setTimeout(function () {
                msgErrorBox.css('display', 'none');
            }, 3000);
        });
        push.on('reuse', function () {
            console.log('网络中断正在重试');
            msgErrorBox[0].innerText = '网络中断正在重试...';
            msgErrorBox.addClass('am-alert-warning');
            msgErrorBox.css('display', 'block');
            setTimeout(function () {
                msgErrorBox.css('display', 'none');
            }, 3000);
        });
        push.receive(function (data) {
            showLog(data, printWall);
        });

        push.subscribe(['public'], function (data) {
            console.log('已关注public频道');
        });

        sendBtn.click(function () {
            var oAsk = new Ask();
            oAsk.set({
                from: $('#uname').val(),
                content: $('#inputSend').val()
            });
            oAsk.save().then(function () {
                console.log('success');
                $msgContent.innerText = '老师已收到你的提问！';
                $modal.modal();
            }).catch(function (err) {
                console.log(err);
                $msgContent.innerText = '提问失败！检查一下你的网络...';
                $modal.modal();
            });
        });
    });
    function showLog(data, area, timestamp) {
        if (data.type == 10) {
            $('#msgTitle')[0].innerText = data.title;
            $('#msgContent')[0].innerText = data.content;
            $('#checkinid').val(data.id);
            $('#msgModal').modal();
        }
    }
});