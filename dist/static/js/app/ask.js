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

require(['jquery','checkin'],function($,Checkin){
    $(function(){
        Checkin.checkin()
    })
})

require(['jquery','config','amaze'],function($,conf){
    var push;
    
    $(function(){

        AV.initialize(conf.leancloud.appId, conf.leancloud.appKey);

        var $modal = $('#msgModal'),
            $msgContent = $('#msgContent')[0],
            sendBtn = $('#sendBtn'),
            uname = $('#uname').val(),
            printWall = $('#printWall');

        const Ask = AV.Object.extend('Ask');
        
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



