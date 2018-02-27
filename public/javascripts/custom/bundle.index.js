$('#try-now').click(function () {
    if (isLogin) {
        window.location.pathname = '/code';
    }
    else {
        window.location.pathname = 'user/login';
    }
});

