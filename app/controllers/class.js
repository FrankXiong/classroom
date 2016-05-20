var _ = require('underscore');
var Class = require('../models/class')
var ClassList = require('../models/classList')
var Teacher = require('../models/teacher')

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
                res.render('admin_add_stu',{
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
    var isLogin = req.session.teacher
    var classId = req.params.id
    if(isLogin){
        if(classId){
            Class.findById(classId,function(err,tclass){
                // Teacher.findById(tclass.tid,function(err,teacher){
                    res.render('admin_class_page',{
                        title:'教学班主页',
                        // teacher:teacher,
                        tclass:tclass,
                        teacher:isLogin
                    }) 
                // })
            })
        }
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

exports.importStu = function(req,res){

}

