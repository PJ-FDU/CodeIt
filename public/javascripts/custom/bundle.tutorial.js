$.post('/api/class/find', {}, function (data, status) {
    if (status == 'success' && data.error_code == 0) {
        for (var i=0; i<data.$array.length; i++) {
            console.log(data.$array[i]);
            var id = data.$array[i]._id.$id;
            var name = data.$array[i].name;
            var icon = data.$array[i].icon;
            var intro = data.$array[i].intro;
            $("#tutorial-list").append(createTutorialCard(id, name, icon, intro));
        }
    }
});

function createTutorialCard(id, name, icon, intro) {
    var tutorialCard =
        '<div class="col-4">' +
        '   <div class="card">' +
        '       <img class="card-img-top bg-dark" src="' + icon + '">' +
        '       <div class="card-body">' +
        '           <h4 class="text-center">' + name + '</h4>' +
        '           <p style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden;">' +
        '               <small class="text-muted">' + intro + '</small>' +
        '           </p>' +
        '           <a class="btn btn-secondary btn-sm float-right" href="/tutorial/detail?id=' + id + '">开始阅读</a>' +
        '       </div>' +
        '   </div>' +
        '</div>';
    return tutorialCard;
}

