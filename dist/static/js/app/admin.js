'use strict';

require.config({
    baseUrl: '/js',
    paths: {
        config: 'config',
        jquery: 'lib/jquery',
        request: 'widget/request',
        common: 'widget/common',
        moment: 'lib/moment',
        AV: 'lib/av',
        AVpush: 'lib/AV.push'
    }
});

require(['jquery', 'request', 'common', 'config'], function ($, req, common, conf) {
    $(function () {
        AV.initialize(conf.leancloud.appId, conf.leancloud.appKey);

        var $updateStuBtn = $('#updateStuBtn'),
            $delStu = $('.del-stu'),
            $addClassBtn = $('#addClassBtn'),
            $importStuBtn = $('#importStuBtn'),
            $updateSelfBtn = $('#updateSelfBtn'),
            $importStusBtn = $('#importStusBtn');

        common.back();

        $delStu.click(function (e) {
            var id = $(e.target).data('id'),
                tr = $('.item-id-' + id),
                url = '/admin/stu/?id=' + id,
                offcanvasItem = $('.item-id-' + id);

            console.log(id);

            if (id) {
                req.delete(url, function (data) {
                    if (data.code === 1) {
                        if (tr.length > 0) {
                            tr.remove();
                            offcanvasItem.remove();
                            alert(data.msg);
                        }
                    }
                }, function () {
                    alert('删除学生失败');
                });
            } else {
                alert('id is undefined');
            }
        });

        $updateStuBtn.click(function () {
            var oStu = req.getFormData($('#formUpdateStu'));
            console.log(oStu);
            req.put(oStu, '/admin/stu/update', function (data) {
                alert(data.msg);
            });
        });

        $updateSelfBtn.click(function () {
            var oUserSelf = req.getFormData($('#formUpdateSelf'));
            console.log(oUserSelf);
            req.put(oUserSelf, '/admin/user/self', function (data) {
                alert(data.msg);
            });
        });
    });
});