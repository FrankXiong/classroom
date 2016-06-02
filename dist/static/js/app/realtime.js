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

// {
//     "title":"测试标题",
//     "content":"儿童节快乐！aaa"
// }

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

        sendBtn.click(function(){
            oAnswer.set({
                from: $('#uname').val(),
                content: $('#inputSend').val()
            });
            oAnswer.save().then(() => {
                alert('已收到你的答案')
                console.log('success');
            }).catch((err) => {
                alert('提价失败，请检查你的网络...')
                console.log('failed');
                console.log(err);
            });
        })

    })
    function showLog(data,area,timestamp) {
        if (data) {
            question = '<li class="am-g am-list-item-desced"><p class="question-title am-list-item-hd">'+data.title+'</p><div class="question-content am-list-item-text">'+data.content+'</div></li>';
        }
        time = '<p class="time">' + timestamp + '</p>';
        if(timestamp){
            area.append(time);
        }
        area.append(question);
    }
})

// var config = {
//     "leancloud":{
//         "appId":"BoXslRV8OngKWN18wvltH7tq-gzGzoHsz",
//         "appKey":"tPHW2xTOAFFxVn6krhF56NVe",
//         "roomId":"574204e149830c00614b220e"
//     }
// }
// var push;
// var AV = AV || {}
// AV.initialize(config.leancloud.appId, config.leancloud.appKey);
// // 每次调用生成一个聊天实例
// createPush();

// var sendBtn = $('#sendBtn');
// var uname = $('#uname').val();
// var answerContent = $('#inputSend').val();
// var printWall = $('#printWall');
// var answer = {
//     from: uname,
//     content: answerContent
// }


// function createPush() {
//     push = AV.push({
//         appId: config.leancloud.appId,
//         appKey: config.leancloud.appKey
//     });

//     // 可以链式调用
//     push.open(function() {
//         console.log('可以接收推送');
//     });

//     // // 监听推送消息
//     // push.on('message', function(data) {
//     //     // showLog('message');
//     //     showLog('回答：',JSON.stringify(data));
//     // });

//     // receive 方法是监听 message 的快捷方法
//     push.receive(function(data) {
//         // showLog('Receive 方法显示和监听 message 事件一致');
//         showLog(data);
//     });

//     // 监听网络异常
//     push.on('reuse', function() {
//         alert('网络中断正在重试');
//     });

//     // // 发送一条推送
//     // push.send({
//     //     channels: ['realtime'],
//     //     data: {title: '标题',content:'正文内容...'}
//     // }, function(result) {
//     //     if (result) {
//     //         showLog('推送成功发送');
//     //     } else {
//     //         showLog('error');
//     //     }
//     // });

//     // push.subscribe(['realtime'], function(data) {
//     //     showLog('关注新的频道');
//     // });

//     // push.send({
//     //     channels: ['realtime'],
//     //     data: {realtime: 123}
//     // });

//     // setTimeout(function() {

//     //     // 如果不加 channels，可以简单的使用 send 方法发送一个 json
//     //     push.send({
//     //         abc: 123
//     //     });

//     //     // push.unsubscribe(['realtime'], function(data) {
//     //     //     showLog('取消关注新的频道');

//     //     //     push.send({
//     //     //         channels: ['realtime'],
//     //     //         data: {realtime: 123}
//     //     //     });
//     //     // });

//     // }, 5000);
// }


