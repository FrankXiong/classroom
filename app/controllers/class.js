var _ = require('underscore');
var Class = require('../models/class')
var Teacher = require('../models/teacher')
var User = require('../models/user')
var parseXlsx = require('excel')
var AV = require('avoscloud-sdk')
var config = require('config')

// AV.initialize('BoXslRV8OngKWN18wvltH7tq-gzGzoHsz', 'tPHW2xTOAFFxVn6krhF56NVe');

AV.init({
  appId: config.get('leancloud.appId'),
  appKey: config.get('leancloud.appKey')
});

exports.renderAdd = function(req,res){
    var teacher = req.session.teacher
    if(teacher){
        res.render('admin_add_class',{
            title:'添加教学班',
            teacher:teacher
        })
    }else{
        res.redirect('/admin/login')
    }
}

exports.renderList = function(req,res){
    var teacher = req.session.teacher
    if(teacher){
        Class.fetch(function(err,classes){
            if(err) console.log(err)
            res.render('admin_class_list',{
                title:'教学班列表',
                classes:classes,
                teacher:teacher
            })  
        })
    }else{
        res.redirect('/admin/login')
    }
}

exports.renderStuAdd = function(req,res){
    var teacher = req.session.teacher
    var classId = req.params.id
    console.log(classId)
    if(teacher){
        if(classId){
            Class.findById(classId,function(err,tclass){
                res.render('admin_import_stu',{
                    title:'导入学生',
                    teacher:teacher,
                    tclass:tclass
                })                
            })
        }
    }else{
        res.redirect('/admin/login')
    }
}

exports.renderClassPage = function(req,res){
    var teacher = req.session.teacher
    var classId = req.params.id
    if(teacher){
        if(classId){
            // Class.findById(classId,function(err,tclass){
            //     res.render('admin_class_page',{
            //         title:'教学班主页',
            //         tclass:tclass,
            //         teacher:isLogin
            //     }) 
            // })
            Class.findOne({_id:classId})
            .populate({path:'stus'})
            .exec(function(err,tclass){
                console.log('after populate:',err,tclass)
                res.render('admin_class_page',{
                    title:'教学班主页',
                    tclass:tclass,
                    teacher:teacher
                }) 
            })
        }
    }else{
        res.redirect('/admin/login')
    }
}

exports.renderChatroom = function(req,res){
    var teacher = req.session.teacher
    if(teacher){
        res.render('admin_chatroom',{
            title:'实时反馈',
            teacher:teacher
        }) 
    }else{
        res.redirect('/admin/login')
    }
}

exports.renderRealtime = function(req,res){
    var teacher = req.session.teacher
    if(teacher){
        res.render('admin_realtime',{
            title:'即时应答',
            teacher:teacher
        }) 
    }else{
        res.redirect('/admin/login')
    }
}

exports.renderAsk = function(req,res){
    var teacher = req.session.teacher
    var query = new AV.Query('Ask')
    if(teacher){
        query.addDescending('createdAt')
        query.find().then(function(results){
            res.render('admin_ask',{
                title:'学生提问',
                teacher:teacher,
                asks:results
            }) 
        },function(err){
            console.log('Error: ' + error.code + ' ' + error.message)
        })
    }else{
        res.redirect('/admin/login')
    }
}

exports.renderOpen = function(req,res){
    var teacher = req.session.teacher
    if(teacher){
        res.render('admin_open',{
            title:'开放问题',
            teacher:teacher
        }) 
    }else{
        res.redirect('/admin/login')
    }
}

exports.addTClass = function(req,res){
    var oTClass = req.body
    var tClass = new Class(oTClass)
    tClass.save(function(err,tClass){
        if(err){
            console.log(err)
        }
        console.log("添加教学班成功")
        res.json({msg:'添加教学班成功'})
    })
}

exports.del = function(req,res){
    var id = req.query.id
    if(id){
        Class.remove({_id:id},function(err,tclass){
            if(err){
                console.log(err)
            }
            res.json({code:1,msg:'删除成功'})
        })
    }else{
        console.log('query id is empty')
    }
}

exports.update = function(req,res){
    var id = req.params.id
    var teacher = req.session.teacher
    if(teacher){
        if(id){
            Class.findById(id,function(err,tclass){
                res.render('admin_add_class',{
                    title:'教学班信息更新',
                    tclass:tclass,
                    teacher:teacher
                })
            })
        }
    }else{
        res.redirect('/admin/login')
    }
}

exports.singleImportStu = function(req,res){
    var oStu = req.body
    console.log('oStu:'+oStu)
    var stuid = oStu.stuid
    var classid = oStu.classid
    console.log(classid)
    if(classid){
        if(stuid){
            User.findByStuid(stuid,function(err,stu){
                if(err){
                    console.log(err)
                }else if(!stu){
                    res.json({code:0,msg:'此学生未注册'})
                }else{
                    Class.findById(classid,function(err,tclass){
                        if(err){
                            console.log(err)
                        }else{
                            for(var item in tclass.stus){
                                if(stu._id === item){
                                    res.json({code:0,msg:'此学生已导入'})
                                }
                            }
                            tclass.stus.push(stu._id)
                            tclass.save(function(err,tclass){
                                res.json({code:1,msg:'导入成功'})
                            })
                        }
                        
                    })
                }
            })
        }
    }else{
        res.json({code:0,msg:'classid is empty'})
    }
}

exports.multiImportStu = function(req,res,next){
    console.log('multiImportStu...')
    next()
}

