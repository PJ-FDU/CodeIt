$.get('/teach-api/roomlist', function (res) {
   console.log(res);
   for (var i=0; i<res.rooms.length; i++) {
       var roomId = res.rooms[i].room_id;
       var roomName = res.rooms[i].room_name;
       var roomCreator = res.rooms[i].creator;
       var roomDescription = res.rooms[i].description;
       var roomCreateTime = res.rooms[i].create_time;
       $('#room-list').append(createRoomCard(roomId, roomName, roomCreator, roomDescription, roomCreateTime));
   }
});

$('#new-room-create').click(function () {
    var roomName = $('#new-room-name').val();
    var roomDescription = $('#new-room-description').val();
    var creator = userName;
    var creatorId = userId;
    if ((roomName.length != 0) && (roomDescription.length != 0)) {
        $.post('/teach-api/new',
            {
                name: roomName,
                creatorId: creatorId,
                creator: creator,
                description: roomDescription
            },
            function (data, status) {
                if (status == 'success') {
                    var roomId = data.id;
                    window.location.href='/teach/share-editor?id=' + roomId;
                }
                else {
                    alert('创建失败!');
                }
            }
        );
    }
    else {
        alert('请输入房间名和房间描述!');
    }
});

function createRoomCard(roomId, roomName, roomCreator, roomDescription, roomCreateTime) {
    var roomCard =
        '<div class="col-3 mb-4">' +
        '   <a href="/teach/share-editor?id=' + roomId + '" style="text-decoration : none;">' +
        '       <div class="card bg-light">' +
        '           <div class="card-body">' +
        '               <h6 class="card-title text-dark">' + roomName + '</h6>' +
        '               <div class="card-text small text-secondary mb-2" style="max-lines: 1">' + roomDescription + '</div>' +
        '               <p class="card-text">' +
        '                   <small class="text-muted">创建者: ' + roomCreator + '</small>' +
        '                   <br>' +
        '                   <small class="text-muted">创建于: ' + roomCreateTime + '</small>' +
        '               </p>' +
        '           </div>' +
        '       </div>' +
        '   </a>' +
        '</div>';
    return roomCard
}