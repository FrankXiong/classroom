require.config({
    baseUrl: '/js',
    paths:{
        config:'config',
        jquery:'lib/jquery',
        request:'widget/request',
        common:'widget/common',
        AV:'lib/av',
        AVpush:'lib/AV.push',
    }
});
require(['jquery','request','common','config'],function($,req,common,conf){
    AV.initialize(conf.leancloud.appId, conf.leancloud.appKey);

    var push,qid,
        $addSingleSelectBtn = $("#addSingleSelectBtn"),
        $addMultiSelectBtn = $("#addMultiSelectBtn"),
        $addFillBlankBtn = $("#addFillBlankBtn"),
        $formAddSingleSelect = $('#formAddSingleSelect'),
        $formAddMultiSelect = $('#formAddMultiSelect'),
        $formAddFillBlank = $('#formAddFillBlank');

    var Question = AV.Object.extend('Question');

    common.back()
    push = AV.push({
        appId: conf.leancloud.appId,
        appKey: conf.leancloud.appKey
    })
    // 可以链式调用
    push.open(function() {
        console.log('可以接收推送');
    });
    // 监听推送消息
    push.on('message', function(data) {
        console.log(JSON.stringify(data));
    });

    // receive 方法是监听 message 的快捷方法
    push.receive(function(data) {
        console.log(JSON.stringify(data));
    });

    // 监听网络异常
    push.on('reuse', function() {
        console.log('网络中断正在重试');
    });

    // 发布单选问题
    $addSingleSelectBtn.click(function(){
        data = {
            'title': $formAddSingleSelect.find('#qTitle').val(),
            'rightAnswer':$formAddSingleSelect.find('#rightAnswer').val(),
            'optionA':$formAddSingleSelect.find('#optionA').val(),
            'optionB':$formAddSingleSelect.find('#optionB').val(),
            'optionC':$formAddSingleSelect.find('#optionC').val(),
            'optionD':$formAddSingleSelect.find('#optionD').val(),
            'type':1,
            'qid':Date.now().toString()
        }
        push.send({
            channels: ['realtime'],
            data: data
        }, function(result) {
            if (result) {
                alert('推送成功发送');
                console.log(result);
                var oQuestion = new Question();
                oQuestion.set(data);
                oQuestion.save().then(() => {
                    console.log('success');
                }).catch((err) => {
                    console.log('failed');
                    console.log(err);
                });
            } else {
                alert('error');
            }
        });

        req.post(data,'/question/add',function(data){
            console.log(data.msg)
        },function(){
            alert('问题发布失败')
        })
    })

    // 发布多选问题
    $addMultiSelectBtn.click(function(){
        data = {
            'title': $formAddMultiSelect.find('#qTitle').val(),
            'rightAnswer':$formAddMultiSelect.find('#rightAnswer').val().toString(),
            'optionA':$formAddMultiSelect.find('#optionA').val(),
            'optionB':$formAddMultiSelect.find('#optionB').val(),
            'optionC':$formAddMultiSelect.find('#optionC').val(),
            'optionD':$formAddMultiSelect.find('#optionD').val(),
            'type':2,
            'qid':Date.now().toString()
        }
        push.send({
            channels: ['realtime'],
            data: data
        }, function(result) {
            if (result) {
                alert('推送成功发送');
                console.log(result);
                var oQuestion = new Question();
                oQuestion.set(data);
                oQuestion.save().then(() => {
                    console.log('success');
                }).catch((err) => {
                    console.log('failed');
                    console.log(err);
                });

            } else {
                alert('error');
            }
        });
    })
    // 发布填空题
    $addFillBlankBtn.click(function(){
        data = {
            'title': $formAddFillBlank.find('#qTitle').val(),
            'rightAnswer':$formAddFillBlank.find('#rightAnswer').val(),
            'type':3,
            'qid':Date.now().toString()
        }
        push.send({
            channels: ['realtime'],
            data: data
        }, function(result) {
            if (result) {
                alert('推送成功发送');
                console.log(result);
                var oQuestion = new Question();
                oQuestion.set(data);
                oQuestion.save().then(() => {
                    console.log('success');
                }).catch((err) => {
                    console.log('failed');
                    console.log(err);
                });

            } else {
                alert('error');
            }
        });
    })



})
