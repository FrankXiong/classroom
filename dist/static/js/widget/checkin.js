define(['jquery','request','config','common','AV','AVpush'],function($,request,conf,Common){
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
                msgErrorBox = $('.msg-error'),
                testBtn = $('#test'),
                push = AV.push({
                    appId: conf.leancloud.appId,
                    appKey: conf.leancloud.appKey
                }),
                checkinList;

            var Checkin = AV.Object.extend('Checkin');

            testBtn.click(function(){
                Common.showAlert('此功能正在开发中...','warning')
            })
            
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
                        if(checkinid){
                            query.get(checkinid).then((result)=>{
                                result.add('checkinList',postData)
                                console.log(result)
                                result.save().then((result)=>{
                                    Common.showAlert('签到成功','success')
                                    console.log('checkin success')
                                }).catch((err)=>{
                                    console.log(err)
                                    Common.showAlert('签到失败','error')
                                })
                            })
                        }else{
                            console.log('当前不能签到')
                            Common.showAlert('当前不能签到','warning')
                        }
                    } else {
                        console.log('ERROR:签到推送发送失败')
                        Common.showAlert('签到失败','error')
                    }
                })
            })
        }
    }
})



