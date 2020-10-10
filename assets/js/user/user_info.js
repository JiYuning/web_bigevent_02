$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: [
            /^[\S]{1,6}$/
            , '用户昵称必须1到6位'
        ]
    })
    inituserinfo()
    function inituserinfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('setInfo', res.data)

            }
        })
    }
    $('#bntReset').on('click', function (e) {
        e.preventDefault()
        inituserinfo()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.getuserinfo()
            }
        })
    })
})