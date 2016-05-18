var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Admin = require('../app/controllers/admin')
var Class = require('../app/controllers/class')

module.exports = function(app){
   
    app.use(function(req,res,next){
        var _user = req.session.user
        app.locals.user = _user
        return next()
    })

    app.get('/home',Index.index) 
    app.post('/',Index.send)

    app.get('/',User.oauth)
    app.get('/wx/callback',User.callback)
    app.get('/user/:openid',User.showUserInfo)
    app.put('/user',User.updateSelf)

    // admin start
    app.get('/admin',Admin.renderIndex)
    app.get('/admin/login',Admin.renderLogin)
    app.get('/admin/reg',Admin.renderReg)
    app.post('/admin/user/reg',Admin.reg)
    app.post('/admin/user/login',Admin.login)
    app.get('/logout',Admin.logout)
    app.get('/admin/user/:id',Admin.renderSelfPage)
    app.put('/admin/user/self',Admin.updateSelf)

    app.get('/admin/stu/list',Admin.renderStuList)
    app.delete('/admin/stu/list',Admin.delStu)
    app.put('/admin/stu',Admin.updateStu)

    app.get('/admin/class/add',Class.renderAdd)
    app.get('/admin/class/list',Class.renderList)
    app.post('/admin/class/',Class.addTClass)
    app.delete('/admin/class/list',Class.del)
    app.get('/admin/class/update/:id',Class.update)
    // admin end
}
