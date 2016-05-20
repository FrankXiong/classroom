require.config({
    baseUrl: '/js',
    paths:{
        jquery:'lib/jquery',
        amazeui:'lib/amazeui',
        request:'widget/request'
    }
});
require(['jquery','request'],function($,req){
    $('#addClassBtn').click(function(){
        var oTClass = req.getFormData()
        req.post(oTClass,'/admin/class',function(data){
            alert(data.msg)
        },function(){
            alert('添加教学班失败')
        })
    })

    $('.del').click(function(e){
        var id = $(e.target).data('id'),
            tr = $('.item-id-' + id)
            url = '/admin/class/?id=' + id;

        if(id){
            req.delete(url,function(data){
                if(data.code === 1){
                    if(tr.length > 0){
                        tr.remove()
                        alert(data.msg)
                    }
                }
            },function(){
                alert('删除教学班失败')
            })
        }else{
            alert('id is undefined')
        }
    })
})