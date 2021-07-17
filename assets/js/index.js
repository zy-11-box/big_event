$(function () {
    getLoginData()
    //退出功能
    $("#loginOut").on("click", function () {
        var layer = layui.layer
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = "/login.html"
            layer.close(index);
        });
    })
})
//定义Ajax登录请求
function getLoginData() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.msg('获取信息失败');
                });
            } else {
                showUserInfo(res.data)
            }

        }
    })
}

//将用户信息渲染到页面
function showUserInfo(data) {
    var name = data.nickname || data.username
    $("#welcome").html("欢迎&nbsp&nbsp" + name)
    if (data.user_pic === null) {
        $(".layui-nav-img").hide()
        $(".newInfo").html(name[0].toUpperCase()).show()
    } else {
        $(".newInfo").hide()
        $(".layui-nav-img").attr("src", data.user_pic).show()
    }
}