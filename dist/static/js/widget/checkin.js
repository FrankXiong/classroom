define(['jquery','request','config','AV','AVpush','amaze'],function($,request,conf){
    return {
        checkin:function(){
            var checkinBtn = $('#checkin'),
                checkinLabel = $('#checkinLabel'), 
                uname = $('#uname').val(),
                stuid = $('#stuid').val(),
                printWall = $('#printWall'),
                msgTitle = $('#msgTitle')[0],
                msgContent = $('#msgContent')[0],
                msgModal = $('#msgModal'),
                postData = {
                    stuid:stuid,
                    uname:uname,
                    type:10
                },
                push = AV.push({
                    appId: conf.leancloud.appId,
                    appKey: conf.leancloud.appKey
                }),
                checkinList;


            var Checkin = AV.Object.extend('Checkin');
            
            checkinBtn.click(function(){
                push.send({
                    channels: ['checkin'],
                    data: postData
                }, function(result) {
                    if (result) {
                        console.log(result);
                        var oCheckin = new Checkin();
                        var query = new AV.Query('Checkin')
                        query.get('5755a6d479bc440063be1149').then((result)=>{
                            result.add('checkinList',postData)
                            console.log(result)
                            result.save().then((result)=>{
                                console.log(result)
                                msgTitle.innerText = '提示'
                                msgContent.innerText = '签到成功'
                                msgModal.modal()
                            }).catch((err)=>{
                                console.log(err)
                                msgTitle.innerText = '提示'
                                msgContent.innerText = '签到失败'
                                msgModal.modal()
                            })
                        })
                        
                    } else {
                        msgTitle.innerText = '提示'
                        msgContent.innerText = '出了一点问题...'
                        msgModal.modal()
                    }
                })
            })
        }
    }
})



