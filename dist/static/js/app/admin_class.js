require.config({
    baseUrl: '/js',
    paths:{
        jquery:'lib/jquery',
        request:'widget/request',
        common:'common'
    }
});
require(['jquery','request'],function($,req){

    $('#addClassBtn').click(function(){
        var oTClass = req.getFormData($('#formAddClass'))
        req.post(oTClass,'/admin/class',function(data){
            alert(data.msg)
        },function(){
            alert('添加教学班失败')
        })
    })

    $('#importStuBtn').click(function(){
        var oStu = req.getFormData($('#formImportStu'))
        console.log(oStu)
        req.post(oStu,'/admin/class/add',function(data){
            alert(data.msg)
        },function(){
            alert(data.msg)
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