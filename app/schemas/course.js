var mongoose = require('mongoose');

// 课程Schema:每一门课程一个记录
var CourseSchema = new mongoose.Schema({
    // 主键,课程号
    // 从教务处课表获得
    id:{
        type:String,
        unique:true
    },
    // 课程名 
    courseName:{
        type:String
    },
    // 课程介绍
    intro:{
        type:String
    }, 
    // 链接到外部网站 
    href:{
        type:String
    },
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

CourseSchema.pre('save',function(next){
    var course = this
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
});


// 静态方法
CourseSchema.statics = {
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
};

module.exports = CourseSchema;