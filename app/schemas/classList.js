var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

// 教学班
var TClassListSchema = new mongoose.Schema({
    name:{
        type:String    
    },
    classes:[{
        type:ObjectId,
        ref:'Class'
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

TClassListSchema.pre('save',function(next){
    var TClassList = this
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
});


// 静态方法
TClassListSchema.statics = {
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

module.exports = TClassListSchema;