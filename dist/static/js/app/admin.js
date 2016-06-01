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
        var $updateStuBtn = $('#updateStuBtn'),
            $delStu = $('.del-stu'),
            $delClass = $('.del-class'),
            $addClassBtn = $('#addClassBtn'),
            $importStuBtn = $('#importStuBtn'),
            $updateSelfBtn = $('#updateSelfBtn'),
            $importStusBtn = $('#importStusBtn');

        $delStu.click(function(e){
            var id = $(e.target).data('id'),
                tr = $('.item-id-' + id),
                url = '/admin/stu/?id=' + id,
                offcanvasItem = $('.item-id-' + id);

            console.log(id)

            if(id){
                req.delete(url,function(data){
                    if(data.code === 1){
                        if(tr.length > 0){
                            tr.remove()
                            offcanvasItem.remove()
                            alert(data.msg)
                        }
                    }
                },function(){
                    alert('删除学生失败')
                })
            }else{
                alert('id is undefined')
            }
        })

        $delClass.click(function(e){
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

        $updateStuBtn.click(function(){
            var oStu = req.getFormData()
            console.log(oStu)
            req.put(oStu,'/admin/stu/update',function(data){
                alert(data.msg)
            })
        })

        $addClassBtn.click(function(){
            var oTClass = req.getFormData()
            req.post(oTClass,'/admin/class',function(data){
                alert(data.msg)
            },function(){
                alert('添加教学班失败')
            })
        })

        $importStuBtn.click(function(){
            var oStu = req.getFormData()
            console.log(oStu)
            req.post(oStu,'/admin/class/add',function(data){
                alert(data.msg)
            },function(){
                alert(data.msg)
            })
        })

        $updateSelfBtn.click(function(){
            var oUserSelf = req.getFormData()
            console.log(oUserSelf)
            req.put(oUserSelf,'/admin/user/self',function(data){
                alert(data.msg)
            })
        })

    })    
})


