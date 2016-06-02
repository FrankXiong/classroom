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

        AV.initialize(conf.leancloud.appId, conf.leancloud.appKey);

        var sendBtn = $('#sendBtn'),
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
                alert('老师已收到你的提问！')
                // showLog({'title':'提示','content':'提问成功'},printWall)
            }).catch((err) => {
                console.log('failed');
                console.log(err);
                alert('提问失败！检查一下你的网络...')
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



