'use strict';

define(['jquery'], function ($) {
    return {
        get: function get(url, doneCallback, failCallback) {
            $.ajax({
                type: 'GET',
                url: url
            }).done(doneCallback).fail(failCallback);
        },
        post: function post(data, url, doneCallback, failCallback) {
            $.ajax({
                type: 'POST',
                url: url,
                data: data
            }).done(doneCallback).fail(failCallback);
        },
        put: function put(data, url, doneCallback, failCallback) {
            $.ajax({
                type: 'PUT',
                url: url,
                data: data,
                dataType: 'json'
            }).done(doneCallback).fail(failCallback);
        },
        delete: function _delete(url, doneCallback, failCallback) {
            $.ajax({
                type: 'DELETE',
                url: url
            }).done(doneCallback).fail(failCallback);
        },
        // getFormData : function(form){
        //     var form = $('form'),
        //         pairs = form.serialize().split(/&/gi),
        //         formData = {};

        //     pairs.forEach(function(pair) {
        //         pair = pair.split('=');
        //         formData[pair[0]] = decodeURIComponent(pair[1] || '');
        //     });
        //     return formData;
        // },
        getFormData: function getFormData(form) {
            var pairs = form.serialize().split(/&/gi),
                formData = {};

            pairs.forEach(function (pair) {
                pair = pair.split('=');
                formData[pair[0]] = decodeURIComponent(pair[1] || '');
            });
            return formData;
        }

    };
});