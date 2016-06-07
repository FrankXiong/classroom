'use strict';

sendBtn.click(function () {
    oAnswer.set({
        from: $('#uname').val(),
        content: $('#inputSend').val()
    });
    oAnswer.save().then(function () {
        alert('已收到你的答案');
        console.log('success');
    }).catch(function (err) {
        alert('提价失败，请检查你的网络...');
        console.log('failed');
        console.log(err);
    });
});