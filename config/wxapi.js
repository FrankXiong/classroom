var API = require('wechat-api');
var config = require('config');

var menu_config = config.get('wx.wx_menu');
var app_id = config.get('wx.app_id');
var app_secret = config.get('wx.app_secret');

//配置
var api = new API(app_id, app_secret);

//测试
function menu() {
	api.createMenu(menu_config, function(err, result) {
		console.log(result);
	});
}

module.exports = menu;
