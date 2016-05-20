require.config({
    baseUrl: '/js',
    paths:{
        jquery:'lib/jquery',
        request:'widget/request',
        common:'common'
    }
});

require(['jquery','request'],function($,req){

    $(function(){
        var $updateSelfBtn = $('#updateSelfBtn');

        $updateSelfBtn.click(function(){
            var oUserSelf = req.getFormData()
            console.log(oUserSelf)
            req.put(oUserSelf,'/admin/user/self',function(data){
                alert(data.msg)
            })
        })

    })
})
