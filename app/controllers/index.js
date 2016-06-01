var wx = require('weixin-api')

exports.index = function(req,res){
    res.render('index',{
        title:'翘课吧',
    })       
}

exports.send = function(req,res){
    wx.loop(req,res)    
}

exports.renderChatroom = function(req,res){
    res.render('chatroom',{
        title:'实时反馈'
    })
}

exports.renderRealtime = function(req,res){
    res.render('realtime',{
        title:'即时问答'
    })
}

