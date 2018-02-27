var discussEditor = ace.edit("discuss-editor");
discussEditor.setTheme("ace/theme/github");
discussEditor.setFontSize(14);
discussEditor.session.setMode("ace/mode/markdown");
discussEditor.setOption("wrap", "free");

var converter = new showdown.Converter();

discussEditor.on('change', function () {
    var sourceText = discussEditor.getValue();
    var convertHtml = converter.makeHtml(sourceText);
    $("#discuss-preview").html(convertHtml);
});

$('#discuss-create').click(function () {
    var title = $('#discuss-title').val();
    var content = discussEditor.getValue();
    createDiscuss(title, content, '');
});

function createDiscuss(title, content, tags) {
    $.post('/api/bulletin/create',
        {
            title: title,
            content: content,
            tags: tags
        },
        function (data, status) {
            if (status == 'success' && data.error_code == 0) {
                window.location.href='/discuss/detail?id='+data.op.$id;
            }
            else {
                alert('发布失败!');
            }
        });
}

$("#help-info").tooltip('body');