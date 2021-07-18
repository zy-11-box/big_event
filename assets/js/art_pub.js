$(function () {
    var layer = layui.layer
    var form = layui.form
    initPub()
    // 初始化富文本编辑器
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)

    //选择封面
    $("#btn-feng").on("click", function () {
        $("#filePub").click()
    })
    $("#filePub").on("change", function (e) {
        var file = e.target.files[0]
        if (file.length == 0) {
            return
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    var state = '已发布'
    $("#btn-cao").on("click", function () {
        state = '草稿'
    })
    $("#form-pub").on("submit", function (e) {
        e.preventDefault()
        var formdata = new FormData($("#form-pub")[0])
        formdata.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                formdata.append('cover_img', blob)
                $.ajax({
                    method: 'POST',
                    url: '/my/article/add',
                    processData: false,
                    contentType: false,
                    data: formdata,
                    success: function (res) {
                        if (res.status != 0) {
                            return layer.msg('发布文章失败')
                        }
                        layer.msg('发布文章成功')
                        // formdata.forEach((v, k) => {
                        //     console.log(v, k);
                        // })
                        // location.href = '../article/art_list.html'
                        var list = window.parent.document.querySelector("#art_lis")
                        list.click()
                    }
                })
            })


    })



    function initPub() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('获取文章列表失败')
                }
                var html = template('tpl-pub', res)
                $("#select").html(html)
                //需要重新启动layui文件渲染
                form.render()
            }
        })
    }
})

