var Index = require('../app/controllers/index')

module.exports = function(app){
    // // pre handler user
    // app.use(function(req,res,next){
    //     var _user = req.session.user
    //     app.locals.user = _user
    //     return next()
    // })

    app.get('/',Index.index)

    // app.get('/signin',User.showSigninPage)
    // app.get('/signup',User.showSignupPage)
    // app.post('/user/signin',User.signin)
    // app.post('/user/signup',User.signup)
    // app.get('/logout',User.logout)
    // app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list)
    // app.delete('/admin/user/list',User.signinRequired,User.adminRequired,User.del)

    // app.get('/movie/:id',Movie.detail)
    // app.get('/admin/movie/add',User.signinRequired,User.adminRequired,Movie.add)
    // app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.update)
    // app.post('/admin/movie',User.signinRequired,User.adminRequired,Movie.save)
    // app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del)
    // app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list)

    // app.post('/user/comment',User.signinRequired,Comment.save)

    // app.get('/admin',User.signinRequired,User.adminRequired,User.admin)

    // app.get('/admin/category/add',User.signinRequired,User.adminRequired,Category.add)
    // app.post('/admin/category',User.signinRequired,User.adminRequired,Category.save)
    // app.get('/admin/category/list',User.signinRequired,User.adminRequired,Category.list)
}