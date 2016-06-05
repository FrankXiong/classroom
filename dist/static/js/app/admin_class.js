require.config({
    baseUrl: '/js',
    paths:{
        config:'config',
        jquery:'lib/jquery',
        request:'widget/request',
        common:'widget/common',
        AV:'lib/av',
        AVpush:'lib/AV.push'
    }
});
require(['jquery','request','common','config','AVpush'],function($,req,common,conf){
    AV.initialize(conf.leancloud.appId, conf.leancloud.appKey);
    var Checkin = AV.Object.extend('Checkin')
    var push = AV.push({
        appId: conf.leancloud.appId,
        appKey: conf.leancloud.appKey
    })

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

    $('#checkinBtn').click(function(){
        push.send({
            data:{title:'系统消息',content:'现在开始签到...',type:10}
        },function(result){
            if(result){
                console.log('签到：推送发送成功')
            }else{
                console.log('签到：推送发送失败')
            }
        })
        push.on('reuse', function() {
            console.log('网络中断正在重试。。。');
        });
        var oCheckin = new Checkin()

        oCheckin.save().then((result)=>{
            console.log(result.id)
        }).catch((err)=>{
            console.log(err)
        })
    })
})