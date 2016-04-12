exports.admin = function(req,res){
    res.render('admin',{
        title:'翘课吧-后台管理系统'
    })       
}

exports.adminRequired = function(req,res){
    var user = req.session.user
    // 用户权限不够，重定向到登录页面
    if(user.role < 10){
        res.redirect('/signin')
    }
    next()
}

exports.signinRequired = function(req,res,next){
    var user = req.session.user
    // 用户未登录，重定向到登录页面
    if(!user){
        res.redirect('/signin')
    }
    next()
}

// signin page
exports.showSigninPage = function(req,res){
    res.render('signin',{
        title:'登录'
    })
}

// signup page
exports.showSignupPage = function(req,res){
    res.render('signup',{
        title:'注册'
    })
}