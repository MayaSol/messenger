export const getRoomType = (room) => {
    console.log('[room-functions.js] getRoomType',room, typeof room);
    return room.split('__')[0];
}