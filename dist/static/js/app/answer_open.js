require.config({
    baseUrl: '/js',
    paths:{
        config:'config',
        jquery:'lib/jquery',
        AV:'lib/av',
        AVpush:'lib/AV.push',
        request:'widget/request',
        checkin:'widget/checkin'
    }
});

require(['config','request'],function(conf,req){
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
            oAnswer.set(data)
            
            // queryQuestion.equalTo('objectId',qObjectId)
            // queryQuestion.first().then((result)=>{
            //     var question = AV.Object.createWithoutData('Question',qObjectId)
            //     var answers = result.attributes.answers || []
            //     answers.push(oAnswer)
            //     question.set('answers',answers)
            //     console.log(question)
            //     question.save().then(()=>{
            //         console.log('回答已保存到问题answers数组中')
            //     }).catch((err)=>{
            //         console.log('Error: ' + error.code + ' ' + error.message)
            //     })
            // })
            // query.equalTo('qObjectId',qObjectId)
            // query.first().then((result)=>{
            //     var question = AV.Object.createWithoutData('Question',qObjectId)
            //     console.log(question)
            //     AV.Object.saveAll(localAnswer).then((results)=>{
            //         var relation = oQuestion.relation('answers')
            //         console.log(results)
            //         for(var i =0;i<results.length;i++){
            //             relation.add(results[i])
            //         }
            //         console.log(relation)
            //         oQuestion.save().then(()=>{
            //             alert('已收到你的答案')
            //         }).catch((err)=>{
            //             console.log('Error: ' + error.code + ' ' + error.message)
            //         })
            //     }).catch((err)=>{
            //         console.log('Error: ' + error.code + ' ' + error.message)
            //     })
            // }).catch((err)=>{
            //     console.log('Error: ' + error.code + ' ' + error.message)
            // })

            // var targetQuestion = AV.Object.createWithoutData('Question',qObjectId)
            // oAnswer.set('targetQuestion',targetQuestion)
            // console.log(oAnswer.attributes)
            console.log(oAnswer.attributes)
            oAnswer.save().then(() => {
                alert('已收到你的答案')
                history.back()
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
