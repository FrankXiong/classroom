require.config({
    baseUrl: '/js',
    paths:{
        config:'config',
        jquery:'lib/jquery',
        request:'widget/request',
        common:'widget/common',
        AV:'lib/av',
        AVpush:'lib/AV.push',
        bcrypt:'lib/bcrypt'
    }
});
require(['jquery','request','common','config'],function($,req,common,conf){
    AV.initialize(conf.leancloud.appId, conf.leancloud.appKey);

    var push,qid,
        $addQuestionBtn = $("#addQuestionBtn"),
        qTitle = $('#questionTitle'),
        qDesc = $('#questionDesc');

    const Question = AV.Object.extend('Question');

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
        // bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        //     if(err){
        //         console.log(err)
        //     }
        //     bcrypt.hash(qTitle.val(),salt,function(err,hash){
        //         if(err){
        //             console.log(err)
        //         }
        //         qid = hash
        //     })
        // })
        data = {
            'title': qTitle.val(),
            'desc':qDesc.val(),
            'type':0,
            'qid':Date.now().toString()
        }
        push.send({
            channels: ['open'],
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
