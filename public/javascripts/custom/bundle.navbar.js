var isLogin = false;
var userName = 'default name';
var userAvatar = 'default avatar';
var userId = 'default id';

checkLoginState();

function checkLoginState() {
    $.post('/api/user/profile', {}, function (data, status) {
        if (status == 'success' && data.error_code == 0) {
            var username = data.data.username;
            var avatar = data.data.avatar;
            var id = data.data._id.$id;
            isLogin = true;
            userName = username;
            userAvatar = avatar;
            userId = id;
            var userProfile = {username: username, avatar: avatar};
            $('#user-info > a').html(
                '<img class="rounded-circle" width="24px" height="24px" src="' + avatar + '"> '
                + username);
            $('#user-info > a').attr('href', '/user/profile');
        }
    });
}