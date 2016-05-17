exports.renderIndex = function(req,res){
    var user = req.session.user
    console.log('user in session: '+req.session.user)
    if(user){
        res.render('admin',{
            title:'翘课吧-后台管理系统'
        }) 
    }else{
        res.redirect('/admin/signin')
    }
}

