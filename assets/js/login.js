$(function () {
    $('#toReg').on('click', function () {
        $('.login-Box').hide()
        $('.reg-Box').show()
    })
    $('#toLogin').on('click', function () {
        $('.login-Box').show()
        $('.reg-Box').hide()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-Box [name=password]').val()
            if (value !== pwd) {
                return "两次输入内容不一致！"
            }
        }
    })
    // 注册
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#toLogin').click()
                $('#form_reg .layui-input').val('')
            }
        })
    })
    // 登录
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("恭喜您，登录成功！")
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})