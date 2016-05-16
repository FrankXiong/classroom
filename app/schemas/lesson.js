var mongoose = require('mongoose');

// 课堂Schema:教师开始上课后，创建一个这个集合的实例 
var LessonSchema = new mongoose.Schema({
    // 主键
    id:{
        type:String,
        unique:true
    },
    // 课程开始时间 
    beginTime:{
        type:Date
    },
    // 教学班ID
    classId:{
        type:String
    }, 
    //  总上课人数
    total:{
        type:Number
    },
    // 总选课人次
    total:{
        type:Number
    },
    // 开始上课后的当前应答模式
    currentSession:{
        type:Number
    }
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

LessonSchema.pre('save',function(next){
    var lesson = this
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
});


// 静态方法
LessonSchema.statics = {
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

module.exports = LessonSchema;