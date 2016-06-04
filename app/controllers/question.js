var AV = require('avoscloud-sdk')
var config = require('config')
var Question = require('../models/question')

AV.init({
  appId: config.get('leancloud.appId'),
  appKey: config.get('leancloud.appKey')
});

exports.addQuestion = function(req,res){
    var _question = req.body
    var question = new Question(_question)
    question.save(function(err,question){
        if(err){
            console.log(err)
        }else{
            console.log("添加问题成功")
            res.json({code:103,msg:'添加问题成功'})
        }
    })
}