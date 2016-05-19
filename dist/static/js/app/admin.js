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
            var oUserSelf = {
                _id:$('#tid').val(),
                name:$('#name').val(),
                phone:$('#phone').val(),
                password:$('#password').val(),
                sex:$('input[name="sex"]:checked').val()
            }
            console.log(oUserSelf)
            req.put(oUserSelf,'/admin/user/self',function(data){
                alert(data.msg)
            })
        })

        $updateStuBtn.click(function(){
            var oStu = {
                _id:$('#sid').val(),
                name:$('#name').val(),
                phone:$('#phone').val(),
                xzclass:$('#xzclass').val(),
                sex:$('input[name="sex"]:checked').val()
            }
            console.log(oStu)
            req.put(oStu,'/admin/stu/update',function(data){
                alert(data.msg)
            })
        })


    })
})
