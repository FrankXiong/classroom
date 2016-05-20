$(function(){
    $('#addClassBtn').click(function(){
        var oTClass = {
            courseId:$('#courseId').val(),
            courseName:$('#courseName').val(),
            tid:$('#tid').val(),
            total:$('#total').val(),
            duration:$('#duration').val(),
            classHours:$('#classHours').val(),
            currenLesson:$('#currenLesson').val()
        }
        $.ajax({
            url:"/admin/class",
            type:"POST",
            cache:false,
            data:oTClass,
            dataType:'json',
            success:function(data){
                alert(data.msg);
            },
            error:function(){
                alert('请求出错')                
            }
        })
    })

    $('.del').click(function(e){
        var id = $(e.target).data('id')
        console.log(id)
        var tr = $('.item-id-' + id)
        if(id){
            $.ajax({
                type:'DELETE',
                url:'/admin/class/?id=' + id,
                error:function(){
                    alert('删除失败')
                }
            })
            .done(function(results){
                if(results.code === 1){
                    if(tr.length > 0){
                        tr.remove()
                        alert(results.msg)
                    }
                }
            })
        }else{
            alert('id is undefined')
        }
    })
})