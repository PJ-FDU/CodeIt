initPage()

$('#discussTab a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
})

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    $($(e.relatedTarget).attr('href')).empty();
    var $listGroup = $('<div id="discuss-item-list" class="list-group"></div>');
    $($(e.target).attr('href')).append($listGroup);
    getDiscussList(parseInt($(e.target).attr('preset')));
})

function initPage() {
    var $listGroup = $('<div id="discuss-item-list" class="list-group"></div>');
    $('#hottest').append($listGroup);
    getDiscussList(0);
}

function getDiscussList(preset) {
    $.post('../api/bulletin/find',
        {
            preset: preset,
            $limit: 10000
        },
        function (data, status) {
            if (status == 'success' && data.error_code == 0) {
                for (var i=0; i<data.$array.length; i++) {
                    if (!data.$array[i].replyTo) {
                        var id = data.$array[i]._id.$id;
                        var title = data.$array[i].title;
                        var author = data.$array[i].author.username;
                        var authorAvatar = data.$array[i].author.avatar;
                        var up = data.$array[i].vote.up;
                        var down = data.$array[i].vote.down;
                        var replies = data.$array[i].replies;
                        var created = data.$array[i].created.$date;
                        var replied = data.$array[i].replied?data.$array[i].replied.$date:created;
                        $('#discuss-item-list').append(createDiscussItem(id, title, author, authorAvatar, up, down, replies, created, replied));
                        // console.log(data.$array[i]);
                    }
                }
            }
        });
}

function createDiscussItem(id, title, author, authorAvatar, up, down, replies, created, replied) {
    var createdDate = new Date(created);
    var createdDateFormed =
        createdDate.getFullYear() + '年' +
        createdDate.getMonth() + '月' +
        createdDate.getDate() + '日' +
        createdDate.getHours() + ':' +
        createdDate.getMinutes();
    var repliedDate = new Date(replied);
    var repliedDateFormed =
        repliedDate.getFullYear() + '年' +
        repliedDate.getMonth() + '月' +
        repliedDate.getDate() + '日' +
        repliedDate.getHours() + ':' +
        repliedDate.getMinutes();
    if (authorAvatar != 'unknown') {
        var avatarDom = '<img class="rounded-circle" src="' + authorAvatar + '" style="width: 48px; height: 48px">';
    }
    else {
        var backgroundColors = ['bg-primary', 'bg-secondary', 'bg-success', 'bg-warning', 'bg-danger', 'bg-info', 'bg-blueviolet', 'bg-dark'];
        var backgroundColor = backgroundColors[author.charCodeAt(0)%8];
        var avatarDom = '<div class="rounded-circle ' + backgroundColor + ' text-white" style="width: 48px; height: 48px; line-height: 48px; font-size: 24px;">' + author[0] + '</div>'
    }
    var discussItem =
        '<a class="list-group-item list-group-item-action flex-column align-items-start" href="discuss/detail?id=' + id + '">' +
        '  <div class="media">' +
        '    <div class="align-self-center text-center mr-3">' +
        avatarDom +
        '    </div>' +
        '    <div class="media-body align-self-center">' +
        '      <h6 class="mt-0">' + title + '</h6>' +
        '      <small class="text-muted">创建于: '+ createdDateFormed + ' | 最后回复: ' + repliedDateFormed + ' | 作者: ' + author + '</small>' +
        '    </div>' +
        '    <div class="align-self-center text-center">' +
        '      <div class="m-0" style="width: 64px;">' +
        '        <small>总回复</small><br>' +
        '        <small>' + replies + '</small>' +
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
    return discussItem;
}