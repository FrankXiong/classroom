require.config({
    baseUrl: '/js',
    paths:{
        config:'config',
        jquery:'lib/jquery',
        AV:'lib/av',
        AVpush:'lib/AV.push',
        request:'widget/request',
        checkin:'widget/checkin',
        common:'widget/common'
    }
})

require(['jquery','config','common'],function($,conf,common){
    $(function(){
        AV.initialize(conf.leancloud.appId, conf.leancloud.appKey);
        common.back()
        var query = new AV.Query('Answer')
        var myEcharts = $('.echart')[0]
        var qObjectId = $('.qObjectId')[0]
        var question
        var id
        var qType = $('#type').val()

        question = AV.Object.createWithoutData('Question',qObjectId.value)
        query.equalTo('targetQuestion',question)
        query.find().then((results)=>{
            for(var i=0;i<results.length;i++){
                var content = results[i].attributes.content
                console.log(content)
                switch(content){
                    case 'A,B':
                        optionAB.push(content)
                        break
                    case 'A,C':
                        optionAC.push(content)
                        break
                    case 'A,D':
                        optionAD.push(content)
                        break
                    case 'B,C':
                        optionBC.push(content)
                        break
                    case 'B,D':
                        optionBD.push(content)
                        break
                    case 'C,D':
                        optionCD.push(content)
                        break
                    case 'A,B,C':
                        optionABC.push(content)
                        break
                    case 'A,B,D':
                        optionABD.push(content)
                        break
                    case 'A,C,D':
                        optionACD.push(content)
                        break
                    case 'A,B,C,D':
                        optionABCD.push(content)
                        break
                }
            }
            //- var echarts_fillblank = conf.echarts_fillblank
            //- var echarts_fillblank_data = echarts_fillblank.series[0].data
            //- console.log(echarts_fillblank_data)
            //- echarts_fillblank_data[0].value = optionAB.length
            var myChart = echarts.init(myEcharts);
            if(qType == 3){
                myChart.setOption(conf.echarts_fillblank)
            }
            
        }).catch((err)=>{
            console.log(err)
        })
            
    })
})

        
