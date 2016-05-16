var mongoose = require('mongoose');

// 题目Schema
var CheckinSchema = new mongoose.Schema({
    // 主键
    id:{
        type:String,
        unique:true
    },
    // 教师ID
    tId:{
        type:String
    },
    // 题目类型
    // 1:单选  2:多选 3:填空 4:开放问题,没有固定答案 5:程序阅读题
    qType:{
        type:Number,
        default:1
    }, 
    // 应答模式
    // 2:单题即兴应答模式 3:微试卷模式 4:开放问题模式 5:学生提问模式 6:实时反馈模式
    qMode:{
        type:Number,
        default:2
    },
    // 题目编号  
    num:{
        type:Number
    },
    // 题目标题
    title:{
        type:String
    },
    // 课堂ID
    lessonId:{
        type:ObjectId,
        ref:Lesson
    },
    // 图片路径，如果题目需要图片，则是图片路径
    picPath:{
        type:String
    },
    // 选择题选项，第一个选项（如果类型为选择题则该字段不为空，否者为空，下同
    optionA:{
        type:String
    },
    optionB:{
        type:String
    },
    optionC:{
        type:String
    },
    optionD:{
        type:String
    },
    // 为空，就是没有答案
    // 题目正确答案，如果单选，是一个数字，多选题，多个数字用逗号分隔
    // 收集的数据如果是字母，也转换成数字
    // 对于开放题目，没有正确答案
    rightAnswer:{
        type:String
    },
    // 题目分值，选题1分，填空题，每空1分，程序分析题10分，简答题5分
    score:{
        type:Number
    },
    // 题目所属课程ID，关联到课程表
    courseId:{
        type:String,
        ref:Course
    },
    // 课程所属知识点，保留，未用
    coursePointer:{
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

QuestionSchema.pre('save',function(next){
    var question = this
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
});


// 静态方法
QuestionSchema.statics = {
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

module.exports = QuestionSchema;