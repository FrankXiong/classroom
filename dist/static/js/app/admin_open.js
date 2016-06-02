require.config({
    baseUrl: '/js',
    paths:{
        config:'config',
        jquery:'lib/jquery',
        request:'widget/request',
        common:'widget/common',
        AV:'lib/av',
        AVpush:'lib/AV.push'
    }
});
require(['jquery','request','common','config'],function($,req,common,conf){
    var push,
        $addQuestionBtn = $("#addQuestionBtn"),
        qTitle = $('#questionTitle'),
        qDesc = $('#questionDesc');

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

    // 发送一条推送
    $addQuestionBtn.click(function(){
        push.send({
            channels: ['open'],
            data: {'title': qTitle.val(),'content':qDesc.val()}
        }, function(result) {
            if (result) {
                alert('推送成功发送');
            } else {
                alert('error');
            }
        });
    })
    


})
