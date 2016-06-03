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

        push.subscribe(['realtime'], function(data) {
            console.log('已关注即时应答频道');
        });

    })
    function showLog(data,area,timestamp) {
        if (data) {
            if(data.type === 1){
                question = '<li class="am-g am-list-item-desced"><div class="am-fl"><div><button type="button" class="am-btn am-btn-secondary am-round am-btn-xs">单选</button><p class="question-title am-list-item-hd">'+data.title+'</p></div><div class="option am-list-item-text">A:'+data.optionA+'</div><div class="option am-list-item-text">B:'+data.optionB+'</div><div class="option am-list-item-text">C:'+data.optionC+'</div><div class="option am-list-item-text">D:'+data.optionD+'</div></div><div class="am-fr"><a href='+'"/realtime/answer/'+data.qid+'"'+'class="am-btn am-btn-primary">回答</a></div></li>';
            }
            if(data.type === 2){
                question = '<li class="am-g am-list-item-desced"><div class="am-fl"><div><button type="button" class="am-btn am-btn-success am-round am-btn-xs">多选</button><p class="question-title am-list-item-hd">'+data.title+'</p></div><div class="option am-list-item-text">A:'+data.optionA+'</div><div class="option am-list-item-text">B:'+data.optionB+'</div><div class="option am-list-item-text">C:'+data.optionC+'</div><div class="option am-list-item-text">D:'+data.optionD+'</div></div><div class="am-fr"><a href='+'"/realtime/answer/'+data.qid+'"'+'class="am-btn am-btn-primary">回答</a></div></li>';
            }
            if(data.type === 3){
                question = '<li class="am-g am-list-item-desced"><div><button type="button" class="am-btn am-btn-warning am-round am-btn-xs">填空</button><p class="question-title am-list-item-hd">'+data.title+'</p></div><div class="am-fr"><a href='+'"/realtime/answer/'+data.qid+'"'+'class="am-btn am-btn-primary">回答</a></div></li>';
            }
            
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


