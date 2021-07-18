$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }
    initList()
    getList()
    deletepage()
    //点击筛选
    $("#form-list").on("submit", function (e) {
        e.preventDefault()
        var id = $("[name=cate_id]").val()
        var state = $("[name=state]").val()
        q.cate_id = id
        q.state = state
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('筛选失败')
                }
                layer.msg('筛选成功')
                initList()
            }
        })
    })

    //删除功能
    function deletepage() {
        $("tbody").on("click", "#btn-del", function () {
            var id = $(this).attr('data-id')
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status != 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    initList()
                }
            })
        })
    }



    //分页功能
    function renderpage(total) {
        laypage.render({
            elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号, 
            count: total,//数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            limits: [2, 3, 5, 10],
            layout: ["count", 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                console.log(obj.limit); //得到每页显示的条数
                console.log(first);
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    initList()
                }
            }
        });
    }




    //获取文章列表
    function initList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('获取文章列表失败')
                }
                layer.msg('获取文章列表成功')
                var html = template('tpl-list', res)
                $("tbody").html(html)
                renderpage(res.total)
            }
        })
    }
    //获取分类列表
    function getList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var html = template('tpl-select', res)
                $("[name=cate_id]").html(html)
                //重启layui文件，进行渲染
                form.render()
            }
        })
    }
})

