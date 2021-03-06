require.config({
    baseUrl: '/js',
    paths:{
        jquery:'lib/jquery',
        request:'widget/request',
        common:'widget/common',
        checkin:'widget/checkin',
        AV:'lib/av',
        AVpush:'lib/AV.push',
        amaze:'lib/amazeui',
        config:'config'
    }
});

require(['jquery','request','checkin','config','common','amaze'],function($,req,Checkin,conf,Common){
    $(function(){
        AV.initialize(conf.leancloud.appId, conf.leancloud.appKey);
        Checkin.checkin()

        var push = AV.push({
            appId: conf.leancloud.appId,
            appKey: conf.leancloud.appKey
        });
        var msgErrorBox = $('.msg-error');

        push.open(function() {
            console.log('可以接收推送');
            msgErrorBox[0].innerText = '可以接收推送'
            msgErrorBox.addClass('am-alert-success')
            msgErrorBox.css('display','block')
            setTimeout(function(){
                msgErrorBox.css('display','none')
            },3000)
        });
        push.on('reuse', function() {
            console.log('网络中断正在重试')
            msgErrorBox[0].innerText = '网络中断正在重试'
            msgErrorBox.addClass('am-alert-warning')
            msgErrorBox.css('display','block')
            setTimeout(function(){
                msgErrorBox.css('display','none')
            },3000)
        });
        push.receive(function(data) {
            showLog(data);
        });

        function showLog(data,area,timestamp) {
            if(data.type == 10){
                $('#msgTitle')[0].innerText = data.title
                $('#msgContent')[0].innerText = data.content
                $('#checkinid').val(data.id)
                $('#msgModal').modal()
            }
        }

        var $updateSelfBtn = $('#btn_save'),
            $stuLoginBtn = $('#stuLoginBtn'),
            $teacherLoginBtn = $('#teacherLoginBtn');

        $updateSelfBtn.click(function(){
            var formData = req.getFormData($('#formSelfInfo'))

            console.log(formData)
            req.put(formData,'/user',function(data){
                console.log(data.msg)
                Common.showAlert(data.msg,'success')
            })
        })

        $stuLoginBtn.click(function(){
            var activeForm = $('.am-active.form-tab').find('form'),
                formData = req.getFormData(activeForm);
                console.log(formData)
                if(activeForm.hasClass('form-stu')){
                    console.log('form stu')
                    req.post(formData,'/user/login',function(){
                        console.log('登录成功')
                    },function(){
                        alert('登录失败')
                    })
                }else{
                    console.log('form teacher')
                    req.post(formData,'/admin/user/login',function(){
                        console.log('登录成功')
                    },function(){
                        alert('登录失败')
                    })
                }
        })
        $teacherLoginBtn.click(function(){
            var activeForm = $('.am-active.form-tab').find('form'),
                formData = req.getFormData(activeForm);
                console.log(formData)
                console.log(activeForm)
                if(activeForm.hasClass('form-stu')){
                    console.log('form stu')
                    req.post(formData,'/user/login',function(){
                        console.log('登录成功')
                    },function(){
                        alert('登录失败')
                    })
                }else{
                    console.log('form teacher')
                    req.post(formData,'/admin/user/login',function(){
                        console.log('登录成功')
                    },function(){
                        alert('登录失败')
                    })
                }
        })
    })
})
