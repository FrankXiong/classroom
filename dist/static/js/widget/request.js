define(['jquery'],function($){
    return {
        get:function(url,cb,param){
            $.ajax({
                type:'GET',
                url:url,
                success:cb,
                error:function(){
                    alert('GET请求出错')
                }
            })
        },
        post:function(data,url,cb){
            $.ajax({
                type:'POST',
                url:url,
                data:data,
                dataType:'json',
                success:cb,
                error:function(){
                    alert('POST请求出错')                
                }
            })
        },
        put:function(data,url,cb){
            $.ajax({
                type:'PUT',
                url:url,
                data:data,
                dataType:'json',
                success:cb,
                error:function(){
                    alert('POST请求出错')                
                }
            })
        },
        delete:function(url,cb){
            $.ajax({
                type:'DELETE',
                url:url
            })
            .done(cb)
        },
        // BUG:只能获取到sex值
        getFormData : function(){
            var form = $('form'),
                pairs = form.serialize().split(/&/gi),
                formData = {};

            pairs.forEach(function(pair) {
                pair = pair.split('=');
                formData[pair[0]] = decodeURIComponent(pair[1] || '');
            });
            return formData;
        }

    }
})
