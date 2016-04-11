var wx = require('weixin-api')

exports.index = function(req,res){
    // if(wx.checkSignature(req)){
    //     res.send(200,req.query.echostr)
    // }else{
    //     res.send(200,'sign failed')
    // }
    res.render('index',{
        title:'翘课吧',
    })       
}
exports.send = function(req,res){
    wx.loop(req,res)    
}