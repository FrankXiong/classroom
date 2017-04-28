var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var mongoStore = require('connect-mongo')(session)
var logger = require('morgan')
var wechat = require('wechat')
var API = require('wechat-api')
var config = require('config')
var multer = require('multer')
var io = require('socket.io')()

var Realtime = require('leancloud-realtime')
	.Realtime;

var realtime = new Realtime({
	appId: '填写leancoud realtime app id',
	region: 'cn'
});

var port = process.env.PORT || 3000
var app = new express()
var dbUrl = 'mongodb://127.0.0.1/classroom'

var menu_config = config.get('wx.wx_menu')
var app_id = config.get('wx.app_id')
var app_secret = config.get('wx.app_secret')
var wx_config = config.get('wx')

var api = new API(app_id, app_secret)

app.locals.moment = require('moment')

mongoose.connect(dbUrl)

app.set('views', './app/views/pages')
app.set('view engine', 'jade')

app.use(express.static(path.join(__dirname, 'dist/static')))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
var upload = multer({
	dest: 'uploads/'
})


app.use(session({
	secret: 'classroom',
	resave: false,
	saveUninitialized: false, // 惰性session
	store: new mongoStore({
		url: dbUrl,
		autoReconnect: true,
		collection: 'sessions'
	})
}))

app.use('/wechat', wechat(wx_config, function(req, res, next) {
	// 微信输入信息都在req.weixin上
	var message = req.weixin;
	res.reply({
		type: 'text',
		content: '自动回复功能正在开发中...'
	})
}));

api.createMenu(menu_config, function(err, result) {
	if (err) {
		console.log(err)
	} else {
		console.log('createMenu suceess:' + result);
	}
})

if ('development' === app.get('env')) {
	// 打印错误信息
	app.set('showStackError', true)
	app.use(logger(':method :url :status'))
		// 输出样式格式化
	app.locals.pretty = true
		// 输出数据库报错信息
	mongoose.set('debug', true)
}

require('./config/router')(app)

app.listen(port)

console.log('classroom started on port ' + port)
