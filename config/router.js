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
    app.get('/logout',User.logout)

    app.get('/admin',Admin.renderIndex)
    app.get('/admin/signin',User.showSigninPage)
    app.get('/admin/signup',User.showSignupPage)
    app.post('/admin/user/reg',User.reg)
    app.post('/admin/user/login',User.login)

    app.get('/admin/class/add',Class.renderAdd)
    app.get('/admin/class/list',Class.renderList)
    app.post('/admin/class/',Class.addTClass)
    app.delete('/admin/class/list',Class.del)
    app.get('/admin/class/update/:id',Class.update)
}
