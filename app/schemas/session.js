var mongoose = require('mongoose');

// 应答会话Schema:系统的工作模式通过这个表来控制，在某一堂课，启动一个题目进行回答
var SessionSchema = new mongoose.Schema({
    // 主键，会话ID
    id:{
        type:String,
        unique:true
    },
    // 会话标题  
    title:{
        type:String
    },
    // 使用题目的课堂ID
    lessonId:{
        type:ObjecId,
        ref:Lesson
    }, 
    // 学生答案
    questionId:{
        type:ObjectId,
        ref:Question
    },
    // 
    beginTime:{
        type:Date
    },
    // 得分，默认为0
    endTime:{
        type:Date
    },
    // 会话类型,默认1
    // 1-签到模式，2-单选即兴应答模式（题目在PPT上）
    // 21-多选即兴应答模式（题目在PPT上），3-微试卷模式
    // 4-开放问题模式(没有固定答案的开发提问)，5-学生提问模式
    // 6-实时反馈模式，7-手机号收集模式
    // 8-微信号OPENID收集模式，9-QQ号收集模式
    sessionType:{
        type:Number,
        default:1
    },
    // 应答人数
    totalCount:{
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

SessionSchema.pre('save',function(next){
    var session = this
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
});


// 静态方法
SessionSchema.statics = {
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

module.exports = SessionSchema;