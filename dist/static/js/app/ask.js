require.config({
    baseUrl: '/js',
    paths:{
        config:'config',
        jquery:'lib/jquery',
        AV:'lib/av',
        AVpush:'lib/AV.push',
        amaze:'lib/amazeui',
        request:'widget/request',
        checkin:'widget/checkin',
        moment:'lib/moment'
    }
});

require(['jquery','config','checkin','amaze'],function($,conf,Checkin){
    $(function(){

        AV.initialize(conf.leancloud.appId, conf.leancloud.appKey);
        Checkin.checkin()
        var push = AV.push({
            appId: conf.leancloud.appId,
            appKey: conf.leancloud.appKey
        });

        var $modal = $('#msgModal'),
            $msgContent = $('#msgContent')[0],
            sendBtn = $('#sendBtn'),
            uname = $('#uname').val(),
            printWall = $('#printWall');

        const Ask = AV.Object.extend('Ask');
        
        push.open(function() {
            console.log('可以接收推送');
        });
        push.receive(function(data) {
            showLog(data,printWall);
        });
        push.on('reuse', function() {
            alert('网络中断正在重试');
        });

        push.subscribe(['public'], function(data) {
            console.log('已关注public频道');
        });

        sendBtn.click(function(){
            const oAsk = new Ask();
            oAsk.set({
                from: $('#uname').val(),
                content: $('#inputSend').val()
            });
            oAsk.save().then(() => {
                console.log('success');
                $msgContent.innerText = '老师已收到你的提问！'
                $modal.modal() 
            }).catch((err) => {
                console.log(err);
                $msgContent.innerText = '提问失败！检查一下你的网络...'
                $modal.modal() 
            });
        })

    })
    function showLog(data,area,timestamp) {
        if(data.type == 10){
            $('#msgTitle')[0].innerText = data.title
            $('#msgContent')[0].innerText = data.content
            $('#checkinid').val(data.id)
            $('#msgModal').modal()
        }

    }
})



