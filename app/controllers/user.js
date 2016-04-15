var wx = require('weixin-api')
var OAuth = require('wechat-oauth')
var config = require('config')
var _ = require('underscore');
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
        console.log(result.data)
        var openid = result.data.openid

        console.log('accessToken:' + accessToken)
        console.log('openid:' + openid)

        User.findByOpenid(openid,function(err,user){
            //如果用户不存在，则注册一个新用户
            if(err || user === null){
                console.log('ERROR:user is not exit')

                client.getUser(openid,function(err,result){
                    console.log(result)

                    var oauthUser = result
                    var _user = new User(oauthUser)

                    _user.save(function(err,user){
                        if(err){
                            console.log('ERROR:user save ' + err)
                        }else{
                            console.log('user save success')

                            req.session.user = user
                            res.redirect('/home')
                        }

                    }) 
                })
            }else{
                console.log('user is exited')
                console.log(user.nickname)
                req.session.user = user
                res.redirect('/home')
            }
        })
    }) 
}

// 查看用户信息页
exports.showUserInfo = function(req,res){
    var openid = req.params.openid
    console.log(openid)
    if(openid){
        User.findByOpenid(openid,function(err,user){
            if(err){
                console.log('findUserError:' + err)
            }
            res.render('user',{
                title:'个人信息'
            })
        })        
    }else{
        console.log("ERROR:请求参数中没有openid")
    }
}

//用户修改自己的信息
exports.updateSelf = function(req,res){
    var id = req.body._id
    console.log('user id:' + id)
    var userObj = req.body
    console.log('userObj:' + userObj)
    console.log('stuid:' + userObj.stuid)
    var _user

    if(id){
        User.findById(id,function(err,user){
            if(err){
                console.log(err)
            }
            console.log('user:' + user)
            // 对象拷贝
            _user = _.extend(user,userObj)
            console.log('_user:' + _user)

            _user.save(function(err,user){
                if(err){
                    console.log(err)
                    res.status(500).json({msg:'服务器出了一点问题...'})
                }
                // 更新成功则跳转到当前用户的个人信息页
                // res.redirect('/user/' + user.openid)
                res.status(201).json({msg:'保存成功',data:_user})

            })
        })
    }else{
        console.log("ERROR:请求参数中没有id")
    } 
}

// 检测用户终端类型：若不是微信端，则跳转到桌面端主页
exports.wxRequired = function(req,res){
    var user = req.session.user

    if(!user.openid){
        res.redirect('/web')
    }
    next()
}

// 桌面端用户注册
exports.signup = function(req,res){
    var userObj = req.body
    var name = userObj.name

    User.findOne({name:name},function(err,user){
        if(err){
            console.log(err)
        }
        if(user){
            console.log('ERROR:用户名已存在')
            res.redirect('/signin')
        }else{
            var user = new User(userObj)
            user.save(function(err,user){
                if(err){
                    console.log(err)
                }
                console.log("SUCCESS:注册成功")
                res.redirect('/admin')
            })
        }

    })

}

// 桌面端用户登录
exports.signup = function(req,res){

}

exports.showSignupPage = function(req,res){
    res.render('admin_signup',{
        title:'注册'
    })
}

exports.showSigninPage = function(req,res){
    res.render('admin_signin',{
        title:'登录'
    })
}

exports.adminRequired = function(req,res){
    var user = req.session.user
    // 用户权限不够，重定向到登录页面
    if(user.role < 10){
        res.redirect('/signin')
    }
    next()
}

exports.signinRequired = function(req,res,next){
    var user = req.session.user
    // 用户未登录，重定向到登录页面
    if(!user){
        res.redirect('/signin')
    }
    next()
}