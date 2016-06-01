require.config({
    baseUrl: '/js',
    paths:{
        jquery:'lib/jquery',
        request:'widget/request'
    }
});


require(['jquery','request'],function($,request){
    $(function(){
        var checkinBtn = $('#checkin'),
            checkinLabel = checkinBtn.find('p')[0], 
            uname = $('#uname').val(),
            stuid = $('#stuid').val(),
            printWall = $('#printWall'),
            postData = {
                sid:stuid
            };

        checkinBtn.click(function(){
            request.post(postData,'/checkin',function(data){
                if(data.code === 101){
                    alert(data.msg)
                    checkinLabel.text('已签到');
                }
                if(data.code === 200){
                    alert(data.msg);
                    checkinLabel.text('已签到');
                }
                
            },function(){
                alert('签到失败，请检查你的网络...')
            })
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



