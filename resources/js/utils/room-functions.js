import { useMainStore } from '@/stores/main.js';

export const getRoomType = (room) => {
    console.log('[room-functions.js] getRoomType',room, typeof room);
    return room.split('__')[0];
}

export const getOtherUser = (room) => {
    const store = useMainStore();
    let parts = room.split('__');
    if (parts[0] != 'user') return null;
    let users = parts[1].split('_');
    for (let user of users) {
        if (user != store.lists.me.id) {
            return user;
        }
    }
    console.log('[room-functions.js] getOtherUser',room,parts,parts[1],typeof parts[1], users);
}