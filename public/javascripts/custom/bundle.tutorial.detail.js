var lastChapter = null;

$.post('/api/class/lesson/find',
    {
        cid: window.location.search.slice(1).split('=')[1],
        $limit: 10000
    },
    function (data, status) {
        if (status == 'success' && data.error_code == 0) {
            for (var i=0; i<data.$array.length; i++) {
                var id = data.$array[i]._id.$id;
                var title = data.$array[i].title;
                $("#tutorial-chapter-list").append(createChapterListItem(id, title));
            }
            lastChapter = $("#tutorial-chapter-list a:first");
            lastChapter.toggleClass('bg-light');
            setChapterContent(data.$array[0]._id.$id);
        }
    });

$("#tutorial-chapter-list").on("click", "a", function (e) {
    lastChapter.toggleClass('bg-light');
    lastChapter = $(this);
    lastChapter.toggleClass('bg-light');
    var chapterId = $(this).attr("chapter-id");
    setChapterContent(chapterId);
});

function createChapterListItem(id, title) {
    var chapterListItem =
        '<a class="list-group-item list-group-item-action" chapter-id="' + id + '">' + title + '</a>';
    return chapterListItem;
}

function setChapterContent(id) {
    $.post('/api/class/lesson/findOne',
        {
            _id: id
        },
        function (data, status) {
            if (status == 'success' && data.error_code == 0) {
                var converter = new showdown.Converter();
                var text = data.data.content;
                var html = converter.makeHtml(text);
                $("#tutorial-content").html(html);
            }
            else {
                $("#tutorial-content").html("未获取到内容");
            }
        });
}

