require.config({
    baseUrl: '/js',
    paths:{
        jquery:'lib/jquery',
        request:'widget/request',
        common:'widget/common'
    }
});
require(['jquery','request','common'],function($,req,common){
    common.back()

    $('#addClassBtn').click(function(){
        var oTClass = req.getFormData($('#formAddClass'))
        req.post(oTClass,'/admin/class',function(data){
            alert(data.msg)
            location.href= '/admin/class/list'
        },function(){
            alert('添加教学班失败')
        })
    })

    $('#multiImportBtn').click(function(){
        var oData = new FormData(document.forms.namedItem("formMultiImport"));
        console.log(oData)

        req.post(oData,'/admin/class/import/multi',function(data){
            alert(data.msg)
        },function(){
            alert('导入失败')
        })
    })

    $('#singleImportBtn').click(function(){
        var oStu = req.getFormData($('#formSingleImport'))
        console.log(oStu)
        req.post(oStu,'/admin/class/import/single',function(data){
            alert(data.msg)
        },function(){
            alert('导入失败')
        })
    })

    $('.del-class').click(function(e){
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