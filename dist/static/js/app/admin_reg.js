require.config({
    baseUrl: '/js',
    paths:{
        jquery:'lib/jquery',
        request:'widget/request'
    }
});

require(['jquery','request'],function($,req){

    $(function(){
        var $regBtn = $('#regBtn'),
            $loginBtn = $('#loginBtn');

        $regBtn.click(function(){
            var oTeacher = req.getFormData()
            req.post(oTeacher,'/admin/user/reg',function(data){
                alert(data.msg)
            },function(){
                alert('注册失败')
            })
        })

        $loginBtn.click(function(){
            var oTeacher = req.getFormData()
            req.post(oTeacher,'/admin/user/login',function(data){
                alert(data.msg)
            },function(){
                alert('登录失败')
            })
        })


    })
})

// $(function(){
//     $('#regBtn').click(function(){
//         var $phone = $('#phone'),
//             $password = $('#password'),
//             $name = $('#name'),
//             oTeacher = {
//                 name:$name.val(),
//                 phone:$phone.val(),
//                 password:$password.val(),
//                 role:10
//             };
//         $.ajax({
//             url:"/admin/user/reg",
//             type:"POST",
//             cache:false,
//             data:oTeacher,
//             dataType:'json',
//             success:function(data,status){
//                 alert(data.msg);
//             },
//             error:function(){
//                 alert('请求出错')                
//             }
//         });  
//     })
//     $('#loginBtn').click(function(){
//         var $phone = $('#phone'),
//             $password = $('#password'),
//             oTeacher = {
//                 phone:$phone.val(),
//                 password:$password.val()
//             };
//         $.ajax({
//             url:"/admin/user/login",
//             type:"POST",
//             cache:false,
//             data:oTeacher,
//             success:function(data,status){
//                 alert(data.msg);
//             },
//             error:function(){
//                 alert('请求出错')                
//             }
//         });  
//     })    
// })