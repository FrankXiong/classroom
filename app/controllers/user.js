var wx = require('weixin-api')
var OAuth = require('wechat-oauth')
var config = require('config')
var User = require('../models/user')

var appid = config.get('wx.app_id')
var appsecret = config.get('wx.app_secret')
var domain = config.get('domain')

var client = new OAuth(appid,appsecret)

// oauth认证
exports.oauth = function(req,res){
    var url = client.getAuthorizeURL('http://' + domain + '/wx/callback','','snsapi_userinfo')
    res.redirect(url) 
}
// 认证授权后回调函数
// 
exports.callback = function(req,res){
    console.log("-------weixin callback---------")

    var code = req.query.code
    // var User = req.model.UserModel

    client.getAccessToken(code,function(err,result){
        var accessToken = result.data.access_token
        var openid = result.data.openid

        console.log('accessToken:' + accessToken)
        console.log('openid:' + openid)

        User.findByOpenid(openid,function(err,user){
            //如果用户不存在，则注册一个新用户
            if(err || user === null){
                console.log('user is not exit')

                client.getUser(openid,function(err,result){
                    console.log(result)

                    var oauthUser = result
                    var _user = new User(oauthUser)

                    _user.name = oauthUser.nickname

                    _user.save(function(err,user){
                        if(err){
                            console.log('user save error:' + err)
                        }else{
                            console.log('user save success')

                            req.session.user = user
                            res.redirect('/home')
                        }

                    }) 
                })
            }else{
                console.log('user is exited')
                console.log(user.name)
                req.session.user = user
                res.redirect('/home')
            }
        })
    }) 
}

exports.showUserInfo = function(req,res){
    var id = req.params.id
    console.log(id)
    if(id){
        User.findById(id,function(err,user){
            if(err){
                console.log('findUserError:' + err)
            }
            res.render('user',{
                title:user.title
            })
        })        
    }else{
        console.log("请求参数中没有openid")
    }
}
