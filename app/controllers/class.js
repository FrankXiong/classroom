var _ = require('underscore');
var Class = require('../models/class')
var ClassList = require('../models/classList')

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
        Class.remove({courseId:id},function(err,tclass){
            if(err){
                console.log(err)
            }
            res.json({success:1});
        })
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

