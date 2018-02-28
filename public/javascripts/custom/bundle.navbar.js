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
            $('#user-info > a').html(
                '<img class="rounded-circle" width="24px" height="24px" src="' + avatar + '" onerror="this.src=\'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519791709244&di=4c15184171cb46b7d349f16586ab294a&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b6a355fbea206ac7251df8fda889.png\'"> '
                + username);
            $('#user-info > a').attr('href', '/user/profile');
        }
    });
}