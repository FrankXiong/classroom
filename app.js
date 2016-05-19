var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var mongoStore = require('connect-mongo')(session)
var logger = require('morgan')
var wx = require('weixin-api')
var API = require('wechat-api')
var config = require('config')
var multer = require('multer')

var port = process.env.PORT || 80
var app = new express()
var dbUrl = 'mongodb://121.42.189.247/classroom'

var menu_config = config.get('wx.wx_menu')
var app_id      = config.get('wx.app_id')
var app_secret  = config.get('wx.app_secret')

var api = new API(app_id,app_secret)

app.locals.moment = require('moment')

mongoose.connect(dbUrl)

app.set('views','./app/views/pages')
app.set('view engine','jade')

app.use(express.static(path.join(__dirname,'dist/static')))
app.use(cookieParser())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(multer()) // for parsing multipart/form-data

app.use(session({
    secret:'classroom',
    resave:false,
    saveUninitialized:false,// 惰性session
    store:new mongoStore({
        url:dbUrl,
        autoReconnect:true,
        collection:'sessions'
    })
}))

api.createMenu(menu_config, function(err, result){
    if(err){
        console.log(err)
    }else{
        console.log('createMenu suceess:' + result);
    }
})

wx.token = 'classroom'

// 监听文本消息
wx.textMsg(function(msg) {
    console.log("textMsg received")
    console.log(JSON.stringify(msg))

    var resMsg = {}

    switch (msg.content) {
        case "openid" :
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : msg.fromUserName,
                funcFlag : 0
            }
            break

        case "msgid" :
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : msg.msgId,
                funcFlag : 0
            }
            break

        case "上课" :
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : "<a href='http://wenxin.info'>进入课堂</a>",
                funcFlag : 0
            }
            break

        case "音乐" :
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "music",
                title : "向往",
                description : "李健《向往》",
                musicUrl : "",
                HQMusicUrl : "",
                funcFlag : 0
            }
            break

        case "图文" :

            var articles = []
            articles[0] = {
                title : "PHP依赖管理工具Composer入门",
                description : "PHP依赖管理工具Composer入门",
                picUrl : "http://weizhifeng.net/images/tech/composer.png",
                url : "http://weizhifeng.net/manage-php-dependency-with-composer.html"
            }

            articles[1] = {
                title : "八月西湖",
                description : "八月西湖",
                picUrl : "http://weizhifeng.net/images/poem/bayuexihu.jpg",
                url : "http://weizhifeng.net/bayuexihu.html"
            }

            articles[2] = {
                title : "「翻译」Redis协议",
                description : "「翻译」Redis协议",
                picUrl : "http://weizhifeng.net/images/tech/redis.png",
                url : "http://weizhifeng.net/redis-protocol.html"
            }

            // 返回图文消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "news",
                articles : articles,
                funcFlag : 0
            }
    }

    wx.sendMsg(resMsg)
})


if('development' === app.get('env')){
    // 打印错误信息
    app.set('showStackError',true)
    app.use(logger(':method :url :status'))
    // 输出样式格式化
    app.locals.pretty = true
    // 输出数据库报错信息
    mongoose.set('debug',true)
}

require('./config/router')(app)

app.listen(port)

console.log('classroom started on port '+port)