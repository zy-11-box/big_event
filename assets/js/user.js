$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '不能超过6个字符'
            }
        }
    })
    //获取用户信息
    var form = layui.form
    function getData() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                form.val('formTest', res.data)
            }
        })
    }
    getData()
    //更改用户信息
    $("#submit").on('click', function (e) {
        e.preventDefault()
        var layer = layui.layer
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(".layui-form").serialize(),
            success: function (res) {
                if (res.status === 0) {
                    return layer.msg('修改成功！')
                }
                layer.msg('修改失败，请重试！')
            }
        })
        window.parent.getLoginData()
    })
    //重置按钮
    $("#chongzhi").on('click', function (e) {
        e.preventDefault()
        getData()
    })
})
