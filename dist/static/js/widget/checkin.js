define(['jquery','request','config','AV','AVpush'],function($,request,conf){
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
                push = AV.push({
                    appId: conf.leancloud.appId,
                    appKey: conf.leancloud.appKey
                }),
                checkinList;

            var Checkin = AV.Object.extend('Checkin');
            
            checkinBtn.click(function(){
                var postData = {
                    stuid:stuid,
                    uname:uname,
                    time:new Date().toLocaleString()
                }
                push.send({
                    channels: ['checkin'],
                    data: postData
                }, function(result) {
                    if (result) {
                        console.log(result);
                        var oCheckin = new Checkin();
                        var query = new AV.Query('Checkin')
                        var checkinid = $('#checkinid').val()

                        query.get(checkinid).then((result)=>{
                            result.add('checkinList',postData)
                            console.log(result)
                            result.save().then((result)=>{
                                alert('签到成功~')
                                console.log('checkin success')
                            }).catch((err)=>{
                                console.log(err)
                                alert('签到失败...')
                            })
                        })
                    } else {
                        console.log('ERROR:签到推送发送失败')
                        alert('签到失败...')
                    }
                })
            })
        }
    }
})



