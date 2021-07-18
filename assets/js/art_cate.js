$(function () {
    var layer = layui.layer
    var form = layui.form
    getTextData()
    var index = null
    //添加内容功能
    $("#btnAdd").on("click", function () {
        index = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章类别',
            content: $("#tpl-add").html()
        });
    })
    $('body').on('click', '#btn-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $("#form-add").serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('添加文章内容失败')
                }
                layer.close(index)
                getTextData()
            }
        })
    })
    //编辑功能
    $("tbody").on("click", "#btn-edit", function () {
        var id = $(this).attr('data-id')
        if (id < 0) {
            return layer.msg('这条列表不能改')
        }
        index = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            content: $("#tpl-edit").html()
        });
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })
    //修改功能
    $("body").on("click", "#btn-edits", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $("#form-edit").serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('更新列表失败')
                }
                layer.msg('更新列表成功')
                layer.close(index)
                getTextData()
            }
        })
    })
    //删除功能
    $("tbody").on("click", "#btn-del", function () {
        var id = $(this).attr('data-id')
        if (id < 0) {
            return layer.msg('这条列表不能删')
        }
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('删除成功')
                getTextData()
            }
        })
    })
})
//定义获取文章信息，并渲染页面
function getTextData() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status != 0) {
                return layer.msg('获取文章列表失败')
            }
            // console.log(res);
            var htmlData = template('tpl-data', res)
            $("tbody").html(htmlData)
        }
    })
}