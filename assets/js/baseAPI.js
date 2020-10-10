$.ajaxPrefilter(function (options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url

    options.headers = {
        Authorization: localStorage.getItem('token') || ''
    }
    if (options.url.indexOf('/my/') === -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function (res) {
        // console.log(res);
        var user = res.responseJSON
        if (user.status === 1 && user.message === "身份认证失败！") {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})