var _ = require('underscore');
var Class = require('../models/class')
var ClassList = require('../models/classList')

exports.renderAdd = function(req,res){
    res.render('admin_add_class',{
        title:'添加教学班'
    })       
}
// exports.renderList = function(req,res){
//     res.render('admin_class_list',{
//         title:'教学班列表'
//     })
// }

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

exports.renderList = function(req,res){
    Class.fetch(function(err,classes){
        if(err) console.log(err)
        console.log(classes)
        res.render('admin_class_list',{
            title:'教学班列表',
            classes:classes
        })  
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
    if(id){
        Class.findById(id,function(err,tclass){
            res.render('admin_add_class',{
                title:'教学班信息更新',
                tclass:tclass
            })
        })
    }
}

