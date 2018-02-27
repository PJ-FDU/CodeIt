$('#btn-login').click(function () {
    var username = $('#username').val();
    var password = $('#password').val();
    console.log(username, password);
    $.post('../api/user/login',
        {
            username: username,
            password: password
        },
        function (data, status) {
            if (status == 'success' && data.error_code == 0) {
                window.location.pathname='/';
            }
            else if (status == 'success' && data.error_code == 400) {
                alert('用户名或密码错误');
            }
        })
});