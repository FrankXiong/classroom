require.config({
    baseUrl: '/js',
    paths:{
        jquery:'lib/jquery',
        amazeui:'lib/amazeui',
        request:'widget/request'
    }
});

require(['jquery','request'],function($,req){

    $(function(){
        var $updateSelfBtn = $('#updateSelfBtn'),
            $updateStuBtn = $('#updateStuBtn');

        $updateSelfBtn.click(function(){
            var oUserSelf = req.getFormData()
            console.log(oUserSelf)
            req.put(oUserSelf,'/admin/user/self',function(data){
                alert(data.msg)
            })
        })

        $updateStuBtn.click(function(){
            var oStu = req.getFormData()
            console.log(oStu)
            req.put(oStu,'/admin/stu/update',function(data){
                alert(data.msg)
            })
        })


    })
})
