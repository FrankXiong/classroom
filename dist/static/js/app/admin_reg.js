require.config({
    baseUrl: '/js',
    paths:{
        jquery:'lib/jquery',
        request:'widget/request',
        common:'common'
    }
});

require(['jquery','request'],function($,req){

    $(function(){
        var $regBtn = $('#regBtn'),
            $loginBtn = $('#loginBtn');

        $regBtn.click(function(){
            var oTeacher = req.getFormData()
            req.post(oTeacher,'/admin/user/reg',function(data){
                alert(data.msg)
            },function(){
                alert('注册失败')
            })
        })

        $loginBtn.click(function(){
            var oTeacher = req.getFormData()
            req.post(oTeacher,'/admin/user/login',function(data){
                alert(data.msg)
            },function(){
                alert('登录失败')
            })
        })


    })
})
