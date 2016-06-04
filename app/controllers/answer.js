var AV = require('avoscloud-sdk')
var config = require('config')
var Answer = require('../models/answer')

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
            console.log(result)
            res.render('answer_open',{
                title:'回答',
                question:result
            })
        },function(err){
            console.log('question is not exit:'+err)
        })
    }
}

exports.renderRealtimeAnswer = function(req,res){
    var id = req.params.id
    var query = new AV.Query('Question')
    console.log(id)
    if(id){
        query.equalTo('qid',id)
        query.first().then(function(result){
            console.log(result)
            res.render('answer_realtime',{
                title:'回答',
                question:result
            })
        },function(err){
            console.log('question is not exit:'+err)
        })
    }
}

exports.addAnswer = function(req,res){
    var answer = req.body
    var _answer = new Answer(answer)
    _answer.save(function(err,answer){
        if(err){
            console.log(err)
        }else{
            console.log("回答成功")
            res.json({code:102,msg:'回答成功'})
        }
    })
}