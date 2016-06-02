define(function () {
    return {
        back:function(){
            var $back = $('.back');
            
            $back.click(function(){
                history.back()
            })
        }
    }
});