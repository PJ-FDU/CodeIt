var replyEditor = ace.edit("reply-editor");
replyEditor.setTheme("ace/theme/github");
replyEditor.setFontSize(14);
replyEditor.session.setMode("ace/mode/markdown");
replyEditor.setOption("wrap", "free");

var converter = new showdown.Converter();

replyEditor.on('change', function () {
    var sourceText = replyEditor.getValue();
    var convertHtml = converter.makeHtml(sourceText);
    $("#reply-preview").html(convertHtml);
});

var discussId = window.location.search.replace('?id=', '');
$('#reply-create').click(function () {
    createReply('reply to '+discussId, replyEditor.getValue(), '', discussId);
});

$('#current-user-name').text(Cookies.get('username'));
$('#current-user-avatar').text(Cookies.get('username')[0]);

getDiscussDetail();

$('#discuss-list').on('click', '.vote-up', function () {
    var discussId = $(this).parent().attr('discuss-id');
    var currentNode = $(this);
    $.post('/api/bulletin/vote',
        {
            _id: discussId,
            vote: 'up'
        },
        function (data, status) {
            if (status == 'success' && data.error_code == 0) {
                var upVote = parseInt(currentNode.find('.u-value').text());
                var valueVote = parseInt(currentNode.parent().find('.v-value').text());
                upVote++;
                valueVote++;
                currentNode.find('small').text(upVote.toString());
                currentNode.parent().find('.v-value').text(valueVote.toString());
            }
        });
});
$('#discuss-list').on('click', '.vote-down', function () {
    var discussId = $(this).parent().attr('discuss-id');
    var currentNode = $(this);
    $.post('/api/bulletin/vote',
        {
            _id: discussId,
            vote: 'down'
        },
        function (data, status) {
            if (status == 'success' && data.error_code == 0) {
                var downVote = parseInt(currentNode.find('.d-value').text());
                var valueVote = parseInt(currentNode.parent().find('.v-value').text());
                downVote++;
                valueVote--;
                currentNode.find('small').text(downVote.toString());
                currentNode.parent().find('.v-value').text(valueVote.toString());
            }
        });
});

function getDiscussDetail() {
    var discussId = window.location.search.replace('?id=', '');
    $.post('/api/bulletin/findOne',
        {
            _id: discussId
        },
        function (data, status) {
            if (status == 'success' && data.error_code == 0) {
                var id = data.data._id.$id;
                var title = data.data.title;
                var content = data.data.content;
                var author = data.data.author.username;
                var authorAvatar = data.data.author.avatar;
                var up = data.data.vote.up;
                var down = data.data.vote.down;
                var value = data.data.vote.value;
                var created = data.data.created.$date;
                $('#discuss-title').text(title);
                $('#discuss-list').append(createDisscussDetailItem(id, content, author, authorAvatar, up, down, value, created, '楼主'));
                getDiscussDetailList(id, 0);
            }
        });
}

function getDiscussDetailList(discussId, preset) {
    $.post('/api/bulletin/find',
        {
            preset: preset,
            $limit: 10000
        },
        function (data, status) {
            if (status == 'success' && data.error_code == 0) {
                var floorNum = 0;
                for (var i=0; i<data.$array.length; i++) {
                    if (data.$array[i].replyTo && data.$array[i].replyTo._id==discussId) {
                        ++floorNum;
                        var id = data.$array[i]._id.$id;
                        var content = data.$array[i].content;
                        var author = data.$array[i].author.username;
                        var authorAvatar = data.$array[i].author.avatar;
                        var up = data.$array[i].vote.up;
                        var down = data.$array[i].vote.down;
                        var value = data.$array[i].vote.value;
                        var created = data.$array[i].created.$date;
                        var floor = floorNum + '楼';
                        $('#discuss-list').append(createDisscussDetailItem(id, content, author, authorAvatar, up, down, value, created, floor));
                    }
                }
            }
        });
}

function createDisscussDetailItem(id, content, author, authorAvatar, up, down, value, created, floor) {
    var createdDate = new Date(created);
    var createdDateFormed =
        createdDate.getFullYear() + '年' +
        createdDate.getMonth() + '月' +
        createdDate.getDate() + '日' +
        createdDate.getHours() + ':' +
        createdDate.getMinutes();
    if (authorAvatar != 'unknown') {
        var avatarDom = '<img class="rounded-circle" src="' + authorAvatar + '" style="width: 48px; height: 48px">';
    }
    else {
        var backgroundColors = ['bg-primary', 'bg-secondary', 'bg-success', 'bg-warning', 'bg-danger', 'bg-info', 'bg-blueviolet', 'bg-dark'];
        var backgroundColor = backgroundColors[author.charCodeAt(0)%8];
        var avatarDom = '<div class="rounded-circle ' + backgroundColor + ' text-white" style="width: 48px; height: 48px; line-height: 48px; font-size: 24px;">' + author[0] + '</div>'
    }
    var contentFormatted = converter.makeHtml(content);
    var discussDetailItem =
        '<li class="list-group-item">' +
        '   <div class="media" discuss-id="' + id + '">' +
        '       <div class="align-self-start text-center mr-3">' +
        avatarDom +
        '       </div>' +
        '       <div class="media-body" style="overflow: hidden">' +
        '           <article class="markdown-body" style="font-size: 14px">' + contentFormatted + '</article>' +
        '           <div class="small text-muted float-right mt-2">' + author + ' 发表于 ' + createdDateFormed + ' | ' + floor + '</div>' +
        '       </div>' +
        '       <div class="align-self-start text-center vote-btn vote-value">' +
        '           <div class="m-0" style="width: 64px;">' +
        '               <small>评价</small><br>' +
        '               <small class="v-value">' + value + '</small>' +
        '           </div>' +
        '       </div>' +
        '       <div class="align-self-start text-center vote-btn vote-up">' +
        '           <div class="m-0" style="width: 64px;">' +
        '               <i class="fa fa-caret-up" aria-hidden="true"></i><br>' +
        '               <small class="u-value">' + up + '</small>' +
        '           </div>' +
        '       </div>' +
        '       <div class="align-self-start text-center vote-btn vote-down">' +
        '           <div class="m-0" style="width: 64px;">' +
        '               <i class="fa fa-caret-down" aria-hidden="true"></i><br>' +
        '               <small class="d-value">' + down + '</small>' +
        '           </div>' +
        '       </div>' +
        '   </div>' +
        '</li>';
    return discussDetailItem;
}

function createReply(title, content, tags, replyTo) {
    $.post('/api/bulletin/create',
        {
            title: title,
            content: content,
            tags: tags,
            reply_to: replyTo
        },
        function (data, status) {
            if (status == 'success' && data.error_code == 0) {
                // alert('回复成功!');
                window.location.reload();
            }
            else {
                alert('回复失败!');
            }
        });
}

$("#info").tooltip('body');