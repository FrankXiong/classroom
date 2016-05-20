require.config({
    baseUrl: '/js',
    paths:{
        jquery:'lib/jquery',
        request:'widget/request'
    }
});

require(['jquery','request'],function($,req){
    $(function(){
        $('.del').click(function(e){
            var id = $(e.target).data('id'),
                tr = $('.item-id-' + id),
                url = '/admin/stu/?id=' + id;

            console.log(id)

            if(id){
                req.delete(url,function(data){
                    if(data.code === 1){
                        if(tr.length > 0){
                            tr.remove()
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
    })    
})
