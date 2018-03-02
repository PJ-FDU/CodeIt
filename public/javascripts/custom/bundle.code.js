getPublicCodeList();

$('#codeTab a').on('click', function (e) {
    $("#code-list").empty();
    if ($(this).attr('id') == 'public-tab') {
        getPublicCodeList();
    }
    else {
        getMyCodeList();
    }
});

$('#newBtn').click(function () {
    window.location.href = '/code/editor';
});

function getPublicCodeList() {
    $.post('/api/code/find', {$limit: 10000}, function (data, status) {
        if (status == 'success' && data.error_code == 0) {
            for (var i=0; i<data.$array.length; i++) {
                if (data.$array[i].public == true) {
                    var id = data.$array[i]._id.$id;
                    var public = data.$array[i].public?'public':'private';
                    var title = data.$array[i].title;
                    var type = data.$array[i].type;
                    var author = data.$array[i].author.username;
                    var authorAvatar = data.$array[i].author.avatar;
                    var up = data.$array[i].vote.up;
                    var down = data.$array[i].vote.down;
                    var value = data.$array[i].vote.value;
                    var created = data.$array[i].created.$date;
                    var modified = data.$array[i].modified?data.$array[i].modified.$date:created;
                    $("#code-list").append(createCodeListItem(id, public, title, type, author, authorAvatar, up, down, value, created, modified));
                }
            }
        }
    });
}

function getMyCodeList() {
    $.post('/api/code/mine', {$limit: 10000}, function (data, status) {
        if (status == 'success' && data.error_code == 0) {
            for (var i=0; i<data.$array.length; i++) {
                if (data.$array[i].public == true) {
                    var id = data.$array[i]._id.$id;
                    var public = data.$array[i].public?'public':'private';
                    var title = data.$array[i].title;
                    var type = data.$array[i].type;
                    // var author = data.$array[i].author.username;
                    var author = userName;
                    // var authorAvatar = data.$array[i].author.avatar;
                    var authorAvatar = userAvatar;
                    var up = data.$array[i].vote.up;
                    var down = data.$array[i].vote.down;
                    var value = data.$array[i].vote.value;
                    var created = data.$array[i].created.$date;
                    var modified = data.$array[i].modified?data.$array[i].modified.$date:created;
                    $("#code-list").append(createCodeListItem(id, public, title, type, author, authorAvatar, up, down, value, created, modified));
                }
            }
        }
    });
}

function createCodeListItem(id, public, title, type, author, authorAvatar, up, down, value, created, modified) {
    var createdDate = new Date(created);
    var createdDateFormed =
        createdDate.getFullYear() + '年' +
        createdDate.getMonth() + '月' +
        createdDate.getDate() + '日' +
        createdDate.getHours() + ':' +
        createdDate.getMinutes();
    var modifiedDate = new Date(modified);
    var modifiedDateFormed =
        modifiedDate.getFullYear() + '年' +
        modifiedDate.getMonth() + '月' +
        modifiedDate.getDate() + '日' +
        modifiedDate.getHours() + ':' +
        modifiedDate.getMinutes();
    if (authorAvatar != 'unknown') {
        var avatarDom = '<img class="rounded-circle" src="' + authorAvatar + '" style="width: 48px; height: 48px" onerror="this.src=\'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519791709244&di=4c15184171cb46b7d349f16586ab294a&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b6a355fbea206ac7251df8fda889.png\'">';
    }
    else {
        var backgroundColors = ['bg-primary', 'bg-secondary', 'bg-success', 'bg-warning', 'bg-danger', 'bg-info', 'bg-blueviolet', 'bg-dark'];
        var backgroundColor = backgroundColors[author.charCodeAt(0)%8];
        var avatarDom = '<div class="rounded-circle ' + backgroundColor + ' text-white" style="width: 48px; height: 48px; line-height: 48px; font-size: 24px;">' + author[0] + '</div>'
    }
    var codeListItem =
        '<a class="list-group-item list-group-item-action flex-column align-items-start" href="/code/detail?id=' + id + '">' +
        '  <div class="media">' +
        '    <div class="align-self-center text-center mr-3">' +
        avatarDom +
        '    </div>' +
        '    <div class="media-body align-self-center">' +
        '      <h6 class="mt-0">' + title + '<span class="badge badge-success ml-1">' + type + '</span><span class="badge badge-info ml-1">' + public + '</span></h6>' +
        '      <small class="text-muted">创建于: '+ createdDateFormed + ' | 最后回复: ' + modifiedDateFormed + ' | 作者: ' + author + '</small>' +
        '    </div>' +
        '    <div class="align-self-center text-center">' +
        '      <div class="m-0" style="width: 64px;">' +
        '        <small>评价</small><br>' +
        '        <small>' + value + '</small>' +
        '      </div>' +
        '    </div>' +
        '    <div class="align-self-center text-center">' +
        '      <div class="m-0" style="width: 64px;">' +
        '        <i class="fa fa-caret-up" aria-hidden="true"></i><br>' +
        '        <small>' + up + '</small>' +
        '      </div>' +
        '    </div>' +
        '    <div class="align-self-center text-center">' +
        '      <div class="m-0" style="width: 64px;">' +
        '        <i class="fa fa-caret-down" aria-hidden="true"></i><br>' +
        '        <small>' + down + '</small>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</a>';
    return codeListItem;
}