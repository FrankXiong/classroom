require.config({
    baseUrl: '/js',
    paths:{
        config:'config',
        jquery:'lib/jquery',
        AV:'lib/av',
        AVpush:'lib/AV.push',
        request:'widget/request',
        checkin:'widget/checkin'
    }
});

require(['jquery','checkin'],function($,Checkin){
    $(function(){
        Checkin.checkin()
    })
})