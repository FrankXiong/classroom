var mongoose = require('mongoose');

// 学生回答情况Schema:学生回答某一个问题的情况
var AnswerSchema = new mongoose.Schema({
    // 学生学号，关联到学生表主键
    sid:{
        type:ObjectId,
        ref:Answer
    },
    // 题目ID
    qObjectId:{
        type:ObjectId,
        ref:Question
    },
    // 使用题目的课堂ID
    lessonId:{
        type:String
    }, 
    // 学生答案
    answer:{
        type:String
    },
    // 是否正确标识
    // 1:正确 -1:错误
    // 4:开放答案 5:学生提问模式 6:实时反馈模式
    // 默认为0,不设置是否正确
    corrected:{
        type:Number,
        default:0
    },
    // 得分，默认为0
    score:{
        type:Number,
        default:0
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

AnswerSchema.pre('save',function(next){
    var answer = this
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
});


// 静态方法
AnswerSchema.statics = {
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

module.exports = AnswerSchema;