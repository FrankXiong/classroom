require.config({
    baseUrl: 'static/js',
    paths:{
        jquery:'lib/jquery',
        amazeui:'lib/amazeui',
        request:'widget/request'
    }
});

require(['jquery','request'],function($,req){
    $(function(){
        var $updateSelfBtn = $('#updateSelfBtn');
        $updateSelfBtn.click(function(){
            var oUserSelf = {
                _id:$('#tid').val(),
                nickname:$('#name').val(),
                phone:$('#phone').val(),
                sex:$('input[name="sex"]:checked').val()
            }
            req.post(oUserSelf,'/admin/user/self',function(data){
                if(data.msg === 1){
                    alert('修改信息成功')
                }
            })
        })
    })
})
