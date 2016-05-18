$(function(){
    $('#regBtn').click(function(){
        var $phone = $('#phone'),
            $password = $('#password'),
            $name = $('#name'),
            oTeacher = {
                name:$name.val(),
                phone:$phone.val(),
                password:$password.val(),
                role:10
            };
        $.ajax({
            url:"/admin/user/reg",
            type:"POST",
            cache:false,
            data:oTeacher,
            dataType:'json',
            success:function(data,status){
                alert(data.msg);
            },
            error:function(){
                alert('请求出错')                
            }
        });  
    })
    $('#loginBtn').click(function(){
        var $phone = $('#phone'),
            $password = $('#password'),
            oTeacher = {
                phone:$phone.val(),
                password:$password.val()
            };
        $.ajax({
            url:"/admin/user/login",
            type:"POST",
            cache:false,
            data:oTeacher,
            success:function(data,status){
                alert(data.msg);
            },
            error:function(){
                alert('请求出错')                
            }
        });  
    })    
})