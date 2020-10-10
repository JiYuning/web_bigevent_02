$(function () {

    var layer = layui.layer
    var form = layui.form
    form.verify({
        oldpwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value) {
            var str = $('[name=oldPwd]').val()
            if (value === str) {
                return "新密码不能喝旧密码相同！"
            }
        },
        rePwd: function (value) {
            var str = $('[name=newPwd]').val()
            if (value !== str) {
                return "两次密码输入不一致！"
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('.layui-form')[0].reset()
                localStorage.removeItem('token')
                window.parent.location.href = '/login.html'
            }
        })
    })
})