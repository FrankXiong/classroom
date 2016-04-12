var wx = require('weixin-api')

exports.index = function(req,res){
    res.render('index',{
        title:'翘课吧',
    })       
}

exports.send = function(req,res){
    wx.loop(req,res)    
}

