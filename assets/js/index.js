$(function () {
    getuserinfo()
    $('#tuichu').on('click', function () {
        layer.confirm(
            '确定退出?',
            { icon: 3, title: '提示' },
            function (index) {
                localStorage.removeItem('token')
                location.href = '/login.html'
                layer.close(index);
            });
    })
})
function getuserinfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        /* headers: {
            Authorization: localStorage.getItem('token') || ''
        }, */
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            imgRender(res.data)
        }
        // status: 0, message: "获取用户基本信息成功！"
        /* complete: function (res) {
            // console.log(res);
            var user = res.responseJSON
            if (user.status === 1 || user.message === "获取用户基本信息成功！") {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        } */

    })
}
function imgRender(user) {
    // console.log(user);
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic === null) {
        var first = name[0].toUpperCase()
        $('.textImg').show().html(first)
        $('.layui-nav-img').hide()
    } else {
        $('.textImg').hide()
        $('.layui-nav-img').show().attr('src', user.user_pic)
    }
}