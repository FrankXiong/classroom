var wx = require('weixin-api')
var Checkin = require('../models/checkin')

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

exports.renderAsk = function(req,res){
    res.render('ask',{
        title:'学生提问'
    })
}

exports.renderOpenQuestion = function(req,res){
    res.render('open_question',{
        title:'开放问题'
    })
}

exports.checkin = function(req,res){
    var oPost = req.body
    var sid = req.body.sid
    var oCheckin = new Checkin(oPost)
    Checkin.findBySid(sid,function(err,_checkin){
        if(err){
            console.log(err)
        }else if(_checkin){
            console.log('You has checkined...')
            res.json({code:101,msg:'你已经签过到了',data:_checkin})
        }else{
            oCheckin.save(function(err,checkin){
                if(err){
                    console.log("签到失败："+err)
                }else{
                    console.log(sid+":签到成功")
                    res.status(200).json({code:200,msg:'签到成功'})
                }
            })
            
        }
    })
    
}


