var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
// var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    openid:{
        type:String,
        unique:true
    },
    name:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:Number,
        // 0:normal user
        // 1:verified user
        // >=10:admin
        // >=100:super admin
        // 默认为普通用户
        default:0
    },
    school:String,
    major:String,
    phone:Number,
    avatar:String,
    intro:String,
    province:String,
    city:String,
    gender:{
        type:Number,
        //0:未知  1:男  2:女
        default:0
    },
    token:String,
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

UserSchema.pre('save',function(next){
    var user = this
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    // bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
    //     if(err) return next(err)

    //     bcrypt.hash(user.password,salt,function(err,hash){
    //         if(err) return next(err)

    //         user.password = hash
    //         next()
    //     })
    // })
    next()
});

// 验证密码是否正确
// UserSchema.methods = {
//     comparePassword:function(_password,cb){
//         bcrypt.compare(_password,this.password,function(err,isMatch){
//             if(err) return cb(err)

//             cb(null,isMatch)
//         })
//     }
// }

// 静态方法
UserSchema.statics = {
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findByOpenid:function(id,cb){
        return this
            .findOne({openid:id})
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({id:id})
            .exec(cb)
    }
};

module.exports = UserSchema;