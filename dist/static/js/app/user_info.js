var postUserinfo = function(){
    var form = $('form');
    var pairs = form.serialize().split(/&/gi);
    var user = {};
    var tips = $('.weui_cells_tips')[0];
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        user[pair[0]] = decodeURIComponent(pair[1] || '');
    });
    
    if(!user.stuid || !/^(\d{8})/.test(user.stuid)){
        tips.innerHTML = '请输入正确的学号';
        return;
    }
    if(!user.xzclass){
        tips.innerHTML = '请选择行政班级';
        return;
    }
    console.log(user)
    if(user._id){
        $.ajax({
            url:"/user",
            type:"PUT",
            cache:false,
            data:user,
            dataType:'json',
            success:successCallback,
            error:function(){
                alert('请求出错')                
            }
        });    
    }
}

var successCallback = function(data,status){
    alert(data.msg);
    var jsonObj = data;
    for(key in jsonObj){
        $("#" + key).val(jsonObj[key]);
    }
}

$('#btn_save').click(function(){
    postUserinfo()
})
