var wx = require('weixin-api')
var OAuth = require('wechat-oauth')
var config = require('config')
var _ = require('underscore')
var User = require('../models/user')
var Teacher = require('../models/teacher')
var AV = require('avoscloud-sdk')
var config = require('config')

AV.init({
  appId: config.get('leancloud.appId'),
  appKey: config.get('leancloud.appKey')
});

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

exports.renderSingleAnalysis = function(req,res){
    var teacher = req.session.teacher
    var query = new AV.Query('Question')
    var queryAnswer = new AV.Query('Question')
    
    var arrA=[],arrB=[],arrC=[],arrD=[]
    if(teacher){
        query.descending('createdAt');
        query.equalTo('type',1)
        query.find().then(function(questions){

            for(var i = 0,len = questions.length;i < len;i++){
                var targetQuestion = AV.Object.createWithoutData('Question',questions[i].id)
                query.equalTo('targetQuestion',targetQuestion)
                query.find().then((answers)=>{
                    console.log("Answers:"+answers)
                    // for(var j=0,len=answers.length;j<len;j++){
                    //     var content = answers[i].attributes.content
                    //     switch(content){
                    //         case 'A':
                    //             arrA.push(content)
                    //             break
                    //         case 'B':
                    //             arrB.push(content)
                    //             break
                    //         case 'C':
                    //             arrC.push(content)
                    //             break
                    //         case 'D':
                    //             arrD.push(content)
                    //             break
                    //     }
                    // }
                }).catch((err)=>{
                    console.log('Error: ' + error.code + ' ' + error.message)
                })
            }

            res.render('admin_single_analysis',{
                title:'单选题',
                teacher:teacher,
                question:questions[0]
            })
            console.log(questions[0])
        },function(err){
            console.log(err)
        })
    }else{
        res.redirect('/admin/login')
    }
}

exports.renderMultiAnalysis = function(req,res){
    var teacher = req.session.teacher
    var query = new AV.Query('Answer')
    if(teacher){
        query.equalTo('qType',2)
        query.find().then(function(results){
            res.render('admin_multi_analysis',{
                title:'多选题',
                teacher:teacher,
                answers:results
            })
        },function(err){
            console.log(err)
        })
    }else{
        res.redirect('/admin/login')
    }
}

exports.renderFillblankAnalysis = function(req,res){
    var teacher = req.session.teacher
    var query = new AV.Query('Answer')
    if(teacher){
        query.equalTo('qType',3)
        query.find().then(function(results){
            res.render('admin_fillblank_analysis',{
                title:'填空题',
                teacher:teacher,
                answers:results
            })
        },function(err){
            console.log(err)
        })
    }else{
        res.redirect('/admin/login')
    }
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




