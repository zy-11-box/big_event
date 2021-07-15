$(function () {
    $("#login-a").on('click', function () {
        $(".login").hide()
        $(".reg").show()
    })
    $("#reg-a").on('click', function () {
        $(".login").show()
        $(".reg").hide()
    })
    //用layui验证输入格式
    var form = layui.form
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }
        , password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //验证两次密码是否一致
        repassword: function (value) {
            if ($("#pass1").val() != value) {
                return '两次密码不一致,请重新输入'
            }
        }
    });
    //注册
    var layer = layui.layer
    $("#reg-form").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: { username: $("#reg-user").val(), password: $("#pass2").val() },
            contentType: 'application/x-www-form-urlencoded',
            success: function (res) {
                if (res.status == 0) {
                    layer.msg(res.message, {
                        icon: 1,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        var username = $("#reg-user").val()
                        var password = $("#pass2").val()
                        $("#reg-a").click()
                        $("#login-user").prop("value", username)
                        $("#login-pass").prop("value", password)
                    });
                } else {
                    layer.msg(res.message, {
                        icon: 2,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        //do something
                    });
                }
            }
        })
    })
    //登录
    $("#login-form").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status == 0) {
                    layer.msg(res.message, {
                        icon: 1,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        //登陆获取的token验证存入本地，之后要用
                        localStorage.setItem('token', res.token)
                        location.href = '/index.html'
                    });
                    // console.log(res.token);
                } else {
                    layer.msg(res.message, {
                        icon: 2,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        //do something
                    });
                }
            }
        })

    })
})