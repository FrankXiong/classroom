var wx = require('weixin-api')
var OAuth = require('wechat-oauth')
var config = require('config')
var _ = require('underscore');
var User = require('../models/user')
var Teacher = require('../models/teacher')

exports.renderIndex = function(req,res){
    var teacher = req.session.teacher
    console.log('teacher in session: '+req.session.teacher)
    if(teacher){
        res.render('admin',{
            title:'翘课吧-后台管理系统',
            teacher:teacher
        }) 
    }else{
        res.redirect('/admin/login')
    }
}

exports.renderReg = function(req,res){
    res.render('admin_reg',{
        title:'注册'
    })
}

exports.renderLogin = function(req,res){
    res.render('admin_login',{
        title:'登录'
    })
}

exports.renderStuList = function(req,res){
    var teacher = req.session.teacher
    if(teacher){
        User.fetch(function(err,users){
            if(err) console.log(err)
            res.render('admin_stu_list',{
                title:'学生列表',
                users:users,
                teacher:teacher
            })  
        })
    }else{
        res.redirect('/admin/login')
    }
}

exports.renderSelfPage = function(req,res){
    var id = req.params.id
    var teacher = req.session.teacher 
    if(teacher){
        if(id){
            res.render('admin_self_page',{
                title:'个人信息',
                teacher:teacher
            })
        }
    }else{
        res.redirect('/admin/login')
    }
}

exports.renderStuList = function(req,res){
    var teacher = req.session.teacher
    if(teacher){
        User.fetch(function(err,users){
            if(err) console.log(err)
            res.render('admin_stu_list',{
                title:'学生列表',
                users:users,
                teacher:teacher
            })  
        })
    }else{
        res.redirect('/admin/login')
    }
}
exports.renderUpdateStu = function(req,res){
    var id = req.params.id
    var teacher = req.session.teacher
    if(teacher){
        if(id){
            User.findById(id,function(err,user){
                res.render('admin_update_stu',{
                    title:'编辑学生信息',
                    user:user,
                    teacher:teacher
                })
            })
        }
    }else{
        res.redirect('/admin/login')
    }
    
}

// 教师注册
exports.reg = function(req,res){
    var teacherObj = req.body
    var tid = teacherObj.tid

    Teacher.findOne({tid:tid},function(err,teacher){
        if(err){
            console.log(err)
        }
        if(teacher){
            console.log('ERROR:用户名已存在')
            return res.redirect('/admin/login')
        }else{
            var teacher = new Teacher(teacherObj)
            teacher.save(function(err,teacher){
                if(err){
                    console.log(err)
                }
                console.log("SUCCESS:注册成功")
                return res.redirect('/admin/login')
            })
        }

    })

}

// 教师登录
exports.login = function(req,res){
    var teacherObj = req.body
    var tid = teacherObj.tid
    var password = teacherObj.password

    Teacher.findOne({tid:tid},function(err,teacher){
        if(err) console.log(err)
        //用户不存在 
        if(!teacher){
            console.log('error:用户名不存在！')
            return res.redirect('/admin/login')
        }
        //调用comparePassword方法比对密码
        teacher.comparePassword(password,function(err,isMatch){
            if(err) console.log(err)
            if(isMatch){
                // session存储登录信息
                req.session.teacher = teacher
                console.log('success:密码正确！')
                return res.redirect('/admin')
            }else{
                console.log('error:密码错误！')
                // res.status(404).send("密码错误！")
                return res.redirect('/admin/login')
            }

        })
    })
}

// logout
exports.logout = function(req,res){
    delete req.session.teacher
    // delete app.locals.teacher
    res.redirect('/admin')
}


exports.delStu = function(req,res){
    var id = req.query.id
    console.log(id)
    if(id){
        User.remove({_id:id},function(err,user){
            if(err){
                console.log(err)
            }
            res.json({code:1,msg:'删除成功'});
        })
    }else{
        console.log('query id is empty')
    }
}



exports.updateSelf = function(req,res){
    var data = req.body
    var id = data.tid
    var _teacher

    if(id){
        console.log(id)
        Teacher.findByTid(id,function(err,teacher){
            if(err){
                console.log(err)
            }
            else if(teacher != null){
                // 对象拷贝
                _teacher = _.extend(teacher,data)
                console.log('_teacher:' + _teacher)

                _teacher.save(function(err,teacher){
                    if(err){
                        console.log(err)
                        res.status(500).json({msg:'服务器出了一点问题...'})
                    }
                    res.status(201).json({msg:'保存成功',data:_teacher})

                })
            }else{
                console.log('teacher is null')
            }
        })
    }else{
        console.log("ERROR:请求参数中没有id")
    } 
}

exports.updateStu = function(req,res){
    var data = req.body
    var id = data._id
    var _stu

    if(id){
        User.findById(id,function(err,stu){
            if(err){
                console.log(err)
            }
            _stu = _.extend(stu,data)

            _stu.save(function(err,stu){
                if(err){
                    console.log(err)
                    res.status(500).json({msg:'服务器出了一点问题...'})
                }
                res.status(201).json({msg:'保存成功',data:_stu})

            })
        })
    }else{
        console.log("ERROR:请求参数中没有id")
    } 
}



