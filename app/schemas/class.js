var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

// 教学班
var TClassSchema = new mongoose.Schema({
    // 主键
    id:{
        type:String,
        unique:true
    },
    // 课程ID
    courseId:{
        type:String
    },
    // 课程名
    courseName:{
        type:String
    }, 
    // 教师ID
    tid:{
        type:String
    },
    // 总选课人次
    total:{
        type:Number
    },
    // 开始周次-结束周次
    duration:{
        type:String
    },
    classHours:{
        type:Number
    },
    stus:[{
        type:ObjectId,
        ref:'User'
    }],
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

TClassSchema.pre('save',function(next){
    var Class = this
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
});

// 静态方法
TClassSchema.statics = {
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

module.exports = TClassSchema;