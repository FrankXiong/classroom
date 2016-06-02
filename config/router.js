var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Admin = require('../app/controllers/admin')
var Class = require('../app/controllers/class')
var multer = require('multer')

module.exports = function(app){
   
    app.use(function(req,res,next){
        var _user = req.session.user
        app.locals.user = _user
        return next()
    })

    var storage = multer.diskStorage({
        destination: function (req, file, cb){
            cb(null, './uploads')
        },
        filename: function (req, file, cb){
            cb(null, file.originalname)
        }
    });
    var upload = multer({
        storage: storage
    });

    app.get('/',Index.index)
    app.get('/oauth',User.oauth)
    app.get('/wx/callback',User.callback)
    app.get('/user/login',User.renderLogin)
    app.get('/user/reg',User.renderReg)
    app.get('/user/:openid',User.renderSelfPage)
    app.put('/user',User.loginRequired,User.updateSelf)
    app.post('/user/reg',User.reg)
    app.post('/user/login',User.login)
    app.get('/logout',User.logout)

    app.get('/chatroom',User.loginRequired,Index.renderChatroom)
    app.get('/realtime',User.loginRequired,Index.renderRealtime)
    app.get('/ask',User.loginRequired,Index.renderAsk)
    app.get('/open',User.loginRequired,Index.renderOpenQuestion)

    app.post('/checkin',User.loginRequired,Index.checkin)


    // admin start
    app.get('/admin',Admin.renderIndex)
    app.get('/admin/login',Admin.renderLogin)
    app.get('/admin/reg',Admin.renderReg)
    app.post('/admin/user/reg',User.adminReg)
    app.post('/admin/user/login',User.adminLogin)
    app.get('/admin/logout',User.adminLogout)
    app.get('/admin/user/:id',Admin.renderSelfPage)
    app.put('/admin/user/self',Admin.updateSelf)  

    app.get('/admin/stu/list',Admin.renderStuList) 
    app.get('/admin/stu/update/:id',Admin.renderUpdateStu)
    app.delete('/admin/stu',Admin.delStu)
    app.put('/admin/stu/update',Admin.updateStu)
     

    app.get('/admin/class/list',Class.renderList)
    app.get('/admin/class/import/:id',Class.renderStuAdd)
    app.get('/admin/class/add',Class.renderAdd)
    app.get('/admin/class/:id',Class.renderClassPage)
    
    
    app.post('/admin/class/',Class.addTClass)
    app.delete('/admin/class',Class.del)
    app.get('/admin/class/update/:id',Class.update)
    app.post('/admin/class/import/single',Class.singleImportStu)
    app.post('/admin/class/import/multi',Class.multiImportStu)

    app.get('/admin/class/:id/chatroom',Class.renderChatroom)
    app.get('/admin/class/:id/realtime',Class.renderRealtime)

    // admin end
}
