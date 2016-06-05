require.config({
    baseUrl: '/js',
    paths:{
        config:'config',
        jquery:'lib/jquery',
        AV:'lib/av',
        AVpush:'lib/AV.push',
        amaze:'lib/amazeui',
        request:'widget/request',
        checkin:'widget/checkin'
    }
});

require(['config','request','amaze'],function(conf,req,amaze){
    $(function(){
        AV.initialize(conf.leancloud.appId, conf.leancloud.appKey);

        var $answerSubmitBtn = $('#answerSubmitBtn')
        var queryQuestion = new AV.Query('Question')
        var qObjectId = $('#qObjectId').val()
        var from = $('#uname').val()
        var stuid = $('#stuid').val()
        var qTitle = $('#qTitle').val()
        var Answer = AV.Object.extend('Answer')
        var Question = AV.Object.extend('Question')
        var qType = parseInt($('#qType').val())
        var rightAnswer

        $('.back').click(function(){
            history.back()
        })

        function getCheckBoxValue(){
            var values = []
            $('input[type="checkbox"]:checked').each(function(){
                values.push($(this).val())
            })
            if(values.length === 0){
                alert('你还没有选择任何一项')
                return;
            }
            return values.join(',');
        }
        

        $answerSubmitBtn.click(function(){
            if(qType == 0){
                var data = {
                    from: from,
                    content: $('#answerContent').val(),
                    stuid:stuid,
                    qObjectId:qObjectId,
                    qTitle:qTitle,
                    qType:qType,
                    _id:qObjectId
                }
            }
            if(qType == 1){
                var data = {
                    from: from,
                    content: $('input[type="radio"]:checked').val(),
                    stuid:stuid,
                    qObjectId:qObjectId,
                    qTitle:qTitle,
                    qType:qType,
                    _id:qObjectId
                }
                console.log(data)
            }else if(qType == 2){
                var data = {
                    from: from,
                    content: getCheckBoxValue(),
                    stuid:stuid,
                    qObjectId:qObjectId,
                    qTitle:qTitle,
                    qType:qType,
                    _id:qObjectId
                }
            }else if(qType == 3){
                var data = {
                    from: from,
                    content: $('#answerContent').val(),
                    stuid:stuid,
                    qObjectId:qObjectId,
                    qTitle:qTitle,
                    qType:qType,
                    _id:qObjectId
                }
            }

            var oAnswer = new Answer()
            var $modal = $('#msgModal')
            var $msgContent = $('#msgContent')[0]
            oAnswer.set(data)
            
            var targetQuestion = AV.Object.createWithoutData('Question',qObjectId)
            queryQuestion.equalTo('objectId',qObjectId) 
            queryQuestion.first().then((result)=>{
                rightAnswer = result.attributes.rightAnswer
            })
            oAnswer.set('targetQuestion',targetQuestion)
            console.log(oAnswer.attributes.content)
            oAnswer.save().then(() => {
                if(oAnswer.attributes.content == rightAnswer){
                    $msgContent.innerText = '答对了'
                    $modal.modal() 
                }else if(oAnswer.attributes.qType == 0){
                    $msgContent.innerText = '老师已收到你的答案~'
                    $modal.modal()   
                }else{
                    $msgContent.innerText = '答错了哟~'
                    $modal.modal()   
                }
                // history.back()
            }).catch((err) => {
                alert('提交失败，请检查你的网络...')
                console.log('Error: ' + error.code + ' ' + error.message)
            });
            
            req.post(oAnswer.attributes,'/answer/add',function(data){
                console.log(data.msg)
                
            },function(){
                alert('提交失败')
            })
            

        })
    })
})
