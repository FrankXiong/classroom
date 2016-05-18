$(function(){
    $('.del').click(function(e){
        var id = $(e.target).data('id')
        console.log(id)
        var tr = $('.item-id-' + id)

        $.ajax({
            type:'DELETE',
            url:'/admin/stu/list?id=' + id
        })
        .done(function(results){
            if(results.success === 1){
                if(tr.length > 0){
                    tr.remove()
                    alert('成功删除')
                }
            }
        })
    })
    
})