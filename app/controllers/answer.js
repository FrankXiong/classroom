var AV = require('avoscloud-sdk')
var config = require('config')

AV.init({
  appId: config.get('leancloud.appId'),
  appKey: config.get('leancloud.appKey')
});

exports.renderOpenAnswer = function(req,res){
    var id = req.params.id
    var query = new AV.Query('Question')
    console.log(id)
    if(id){
        query.equalTo('qid',id)
        query.first().then(function(result){
            console.log(result.attributes)
            res.render('answer_open',{
                title:'回答',
                question:result.attributes
            })
        },function(err){
            console.log('question is not exit:'+err)
        })
    }
}