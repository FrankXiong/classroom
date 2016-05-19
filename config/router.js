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

    // app.get('/home',Index.index) 
    app.post('/',Index.send)

    app.get('/oauth',User.oauth)
    app.get('/',Index.index)
    app.get('/wx/callback',User.callback)
    app.get('/user/login',User.renderLogin)
    app.get('/user/reg',User.renderReg)
    app.get('/user/:openid',User.renderSelfPage)
    app.put('/user',User.updateSelf)
    app.post('/user/reg',User.reg)
    app.post('/user/login',User.login)
    app.get('/logout',User.logout)


    // admin start
    app.get('/admin',Admin.renderIndex)
    app.get('/admin/login',Admin.renderLogin)
    app.get('/admin/reg',Admin.renderReg)
    app.post('/admin/user/reg',Admin.reg)
    app.post('/admin/user/login',Admin.login)
    app.get('/admin/logout',Admin.logout)
    app.get('/admin/user/:id',Admin.renderSelfPage)
    app.put('/admin/user/self',Admin.updateSelf)

    app.get('/admin/stu/list',Admin.renderStuList)
    app.delete('/admin/stu/list',Admin.delStu)
    app.put('/admin/stu',Admin.updateStu)

    app.get('/admin/class/list',Class.renderList)
    app.get('/admin/class/import/:id',Class.renderStuAdd)
    app.get('/admin/class/:id',Class.renderClassPage)
    app.get('/admin/class/add',Class.renderAdd)
    
    app.post('/admin/class/',Class.addTClass)
    app.delete('/admin/class',Class.del)
    app.get('/admin/class/update/:id',Class.update)
    // admin end
}
