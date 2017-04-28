define(function () {
    return {
        msgErrorBox : $('.msg-error'),
        back:function(){
            var $back = $('.back');
            
            $back.click(function(){
                history.back()
            })
        },
        showAlert:function(msg,type){
            var msgErrorBox = this.msgErrorBox
            msgErrorBox[0].innerText = msg
            if(type === 'success'){
                msgErrorBox.addClass('am-alert-success')
            }else if(type === 'warning'){
                msgErrorBox.addClass('am-alert-warning')
            }else if(type === 'error'){
                msgErrorBox.addClass('am-alert-danger')
            }else if(type === 'secondary'){
                msgErrorBox.addClass('am-alert-secondary')
            }
            msgErrorBox.css('display','block')
            setTimeout(function(){
                msgErrorBox.css('display','none')
            },3000)
        }
    }
});