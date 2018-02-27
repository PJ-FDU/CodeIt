$.post('/api/user/profile', {}, function (data, status) {
    if (status == 'success' && data.error_code == 0) {
        var username = data.data.username;
        var email = data.data.email;
        var avatar = data.data.avatar;
        $("#username").val(username);
        $("#email").val(email);
        $("#avatar").val(avatar);
        $("#img-avatar").attr('src', avatar);
    }
});

$('#btn-preview').click(function () {
    var avatar = $("#avatar").val();
    $("#img-avatar").attr('src', avatar);
});

$('#btn-update-profile').click(function () {
    var username = $("#username").val();
    var email = $("#email").val();
    var avatar = $("#avatar").val();
    var password = $("#password-verification").val();
    updateProfile(username, email, avatar, password);
});

$('#btn-update-password').click(function () {
    var oldPassword = $('#password-old').val();
    var newPassword = $('#password-new').val();
    updatePassword(oldPassword, newPassword);
});

$('#btn-logout').click(function () {
    logout();
});

function updateProfile(username, email, avatar, password) {
    $.post('/api/user/profile/edit',
        {
            username: username,
            email: email,
            avatar: avatar,
            password: password
        },
        function (data, status) {
            if (status == 'success' && data.error_code == 0) {
                $("#img-avatar").attr('src', avatar);
                alert('资料修改成功!');
            }
        });
}

function updatePassword(oldPassword, newPassword) {
    $.post('/api/user/password/update', 
        {
            old_password: oldPassword,
            new_password: newPassword
        },
        function (data, status) {
            if (status == 'success' && data.error_code == 0) {
                alert('密码修改成功!');
            }
        });
}

function logout() {
    $.post('/api/user/logout', {}, function (data, status) {
        if (status == 'success' && data.error_code == 0) {
            window.location.href = '/';
        }
    })
}