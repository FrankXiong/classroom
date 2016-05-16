var mongoose = require('mongoose');

// 试卷Schema:微试卷，1-5个题目的应答
var PaperSchema = new mongoose.Schema({
    // 主键
    id:{
        type:String,
        unique:true
    },
    // 试卷名称
    paperName:{
        type:String
    },
    //教学班ID
    classId:{
        type:ObjecId,
        ref:Class
    }, 
    // 创建老师ID
    tId:{
        type:ObjectId,
        ref:Paper
    },
    //备注 
    remark:{
        type:String
    },
    // 题目编号
    questionsNum:[{
        type:Number
    }],
    // 题目分值
    questionsScore:[{
        type:Number
    }],
    // 总分
    totalScore:{
        type:Number,
    },
    // 试卷类型
    // 1-单题即时应答，2-多题目微试卷应答
    paperType:{
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

PaperSchema.pre('save',function(next){
    var paper = this
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
});


// 静态方法
PaperSchema.statics = {
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

module.exports = PaperSchema;