var mongoose = require('mongoose');

// 试卷Schema:微试卷，1-5个题目的应答
var PaperSchema = new mongoose.Schema({
    // 主键,学生ID
    sid:{
        type:ObjecId,
        ref:User
    },
    // 课堂ID
    lessonId:{
        type:ObjecId,
        ref:Lesson
    },
    //试卷ID
    paperId:{
        type:ObjecId,
        ref:Paper
    }, 
    // 提交顺序号
    seq:{
        type:Number
    },
    //回答所用时间(分钟数)
    duration:{
        type:Number
    },
    // 得分
    score:{
        type:Number
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

StupaperSchema.pre('save',function(next){
    var stupaer = this
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
});


// 静态方法
StupaperSchema.statics = {
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:sid})
            .exec(cb)
    }
};

module.exports = StupaperSchema;