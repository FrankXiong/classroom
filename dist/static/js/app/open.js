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

require(['jquery','checkin'],function($,Checkin){
    $(function(){
        Checkin.checkin()
    })
})

require(['jquery','config'],function($,conf){
    var push;
    
    $(function(){
        push = AV.push({
            appId: conf.leancloud.appId,
            appKey: conf.leancloud.appKey
        });

        AV.initialize(conf.leancloud.appId, conf.leancloud.appKey);

        var sendBtn = $('#sendBtn'),
            uname = $('#uname').val(),
            printWall = $('#printWall');

        const Answer = AV.Object.extend('Answer');
        const oAnswer = new Answer();
        

        push.open(function() {
            console.log('可以接收推送');
        });
        push.receive(function(data) {
            showLog(data,printWall);
        });
        push.on('reuse', function() {
            alert('网络中断正在重试');
        });

        push.subscribe(['open'], function(data) {
            console.log('已关注开放问题频道');
        });

        // sendBtn.click(function(){
        //     oAnswer.set({
        //         from: $('#uname').val(),
        //         content: $('#inputSend').val()
        //     });
        //     oAnswer.save().then(() => {
        //         alert('已收到你的答案')
        //         console.log('success');
        //     }).catch((err) => {
        //         alert('提价失败，请检查你的网络...')
        //         console.log('failed');
        //         console.log(err);
        //     });
        // })

    })
    function showLog(data,area,timestamp) {
        if (data) {
            question = '<li class="am-g am-list-item-desced am-cf"><div class="am-fl"><p class="question-title am-list-item-hd">'+data.title+'</p><div class="question-content am-list-item-text">'+data.desc+'</div></div><div class="am-fr"><a href='+'"/open/answer/'+data.qid+'"'+'class="am-btn am-btn-primary">回答</button></div></li>';
        }

        time = '<p class="time">' + timestamp + '</p>';
        if(timestamp){
            area.prepend(time)
        }
        area.prepend(question)
    }
})
