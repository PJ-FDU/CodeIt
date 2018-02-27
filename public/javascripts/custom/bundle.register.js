$('#btn-register').click(function () {
    console.log('333333333');
    var username = $.trim($('#username').val());
    var email = $.trim($('#email').val());
    var password = $.trim($('#password').val());
    var passwordConfirm = $.trim($('#password-confirm').val());
    if (username.length == 0 || username.length > 20) {
        alert('请输入正确的用户名(用户名不能为空, 且长度必须小于20)');
    }
    else if (email.length == 0) {
        alert('用户邮箱不能为空');
    }
    else if (password.length == 0 || password.length > 20) {
        alert('请输入正确的用户密码(用户密码不能为空, 且长度必须小于20)');
    }
    else if (password != passwordConfirm) {
        alert('两次输入的密码不一致');
    }
    else {
        $.post('../api/user/register',
            {
                username: username,
                email: email,
                password: password,
                avatar: 'unknown'
            },
            function (data, status) {
                if (status == 'success' && data.error_code == 0) {
                    var behave = confirm("注册成功, 是否立即前往登陆?");
                    if (behave == true) {
                        window.location.href = '/user/login';
                    }
                }
            });
    }
});