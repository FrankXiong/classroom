$(function(){
    $('.del').click(function(e){
        var target = $(e.target)
        var id = target.data('id')
        var tr = $('.item-id-' + id)
        console.log(id)

        $.ajax({
            type:'DELETE',
            url:'/admin/stu/?id=' + id
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