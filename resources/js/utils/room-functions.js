export const getRoomType = (room) => {
    console.log('[room-functions.js] getRoomType',room, typeof room);
    return room.split('__')[0];
}

export const getOtherUser = (room) => {
    let parts = room.split('__');
    if (parts[0] != 'user') return null;
    let users = parts[1].split['_'];
    console.log('[room-functions.js] getOtherUser',room,users);
}