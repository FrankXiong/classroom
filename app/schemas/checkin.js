var mongoose = require('mongoose');

// 学生签到Schema
var CheckinSchema = new mongoose.Schema({
    // 主键
    id:{
        type:String,
        unique:true
    },
    // 学生学号
    sId:{
        type:String
    },
    //  课堂ID
    lessonId:{
        type:String
    }, 
    //  总上课人数
    checkTime:{
        type:Date,
        default:Date.now()
    },
    // 签到序号 
    seq:{
        type:Number
    },
    // 是否签到中奖:1为中奖，0为未中奖
    hit:{
        type:Number,
        default:0
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

CheckinSchema.pre('save',function(next){
    var checkin = this
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
});


// 静态方法
CheckinSchema.statics = {
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

module.exports = CheckinSchema;