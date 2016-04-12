var helper = {
    check_form:function(data){
        if(!data.stuid || !/^(\d{8})/.test(data.stuid)){
            $.weui.topTips('请输入正确的学号');
            return false;
        }
        if(!data.class){
            $.weui.topTips('请选择教学班');
            return false;
        }
    }
}