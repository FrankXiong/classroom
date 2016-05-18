var wx = require('weixin-api')
var OAuth = require('wechat-oauth')
var config = require('config')
var _ = require('underscore');
var User = require('../models/user')

exports.renderIndex = function(req,res){
    var user = req.session.user
    console.log('user in session: '+req.session.user)
    if(user){
        res.render('admin',{
            title:'翘课吧-后台管理系统'
        }) 
    }else{
        res.redirect('/admin/signin')
    }
}

exports.renderReg = function(req,res){
    res.render('admin_signup',{
        title:'注册'
    })
}

exports.renderLogin = function(req,res){
    res.render('admin_signin',{
        title:'登录'
    })
}

exports.renderStuList = function(req,res){
    User.fetch(function(err,users){
        if(err) console.log(err)
        console.log(users)
        res.render('admin_stu_list',{
            title:'学生列表',
            users:users
        })  
    })
}

// 桌面端用户注册
exports.reg = function(req,res){
    var userObj = req.body
    var phone = userObj.phone

    User.findOne({phone:phone},function(err,user){
        if(err){
            console.log(err)
        }
        if(user){
            console.log('ERROR:用户名已存在')
            return res.redirect('/admin/signin')
        }else{
            var user = new User(userObj)
            user.save(function(err,user){
                if(err){
                    console.log(err)
                }
                console.log("SUCCESS:注册成功")
                return res.redirect('/admin/signin')
            })
        }

    })

}

// 桌面端用户登录
exports.login = function(req,res){
    var _user = req.body
    var phone = _user.phone
    var password = _user.password

    User.findOne({phone:phone},function(err,user){
        if(err) console.log(err)
        //用户不存在 
        if(!user){
            console.log('error:用户名不存在！')
            return res.redirect('/admin/signin')
        }
        //调用comparePassword方法比对密码
        user.comparePassword(password,function(err,isMatch){
            if(err) console.log(err)
            if(isMatch){
                // session存储登录信息
                req.session.user = user
                console.log('success:密码正确！')
                return res.redirect('/admin')
            }else{
                console.log('error:密码错误！')
                // res.status(404).send("密码错误！")
                return res.redirect('/admin/signin')
            }

        })
    })
}

// logout
exports.logout = function(req,res){
    delete req.session.user
    // delete app.locals.user
    res.redirect('/admin')
}


exports.delStu = function(req,res){
    var id = req.query.id
    if(id){
        User.remove({_id:id},function(err,user){
            if(err){
                console.log(err)
            }
            res.json({success:1});
        })
    }
}

exports.updateStu = function(req,res){
    var id = req.params.id
    if(id){
        User.findById(id,function(err,user){
            res.render('admin_update_user',{
                title:'学生信息更新',
                user:user
            })
        })
    }
}

exports.renderSelfPage = function(req,res){
    var id = req.params.id
    if(id){
        User.findById(id,function(err,user){
            res.render('admin_self_page',{
                title:'学生信息更新',
                user:user
            })
        })
    }
}



