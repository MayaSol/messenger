export const fetchMessages = async (room) => {


    console.log('[chatService.js] fetchMessages room ', room);
    let data;

    data = [
        {
            "id": 194,
            "room": "user__1_4",
            "reply_to": null,
            "file": null,
            "text": "Na",
            "audio": null,
            "user_id": 4,
            "recipient": null,
            "phone": null,
            "is_viewed": true,
            "whatsapp_id": null,
            "created_at": "2025-04-21T09:45:23.000000Z",
            "updated_at": "2025-04-21T09:45:23.000000Z",
            "deleted_at": null,
            "user": {
                "id": 4,
                "name": "Maya"
            }
        },        
        {
            "id": 192,
            "room": "user__1_4",
            "reply_to": null,
            "file": null,
            "text": "Сообщение достаточно длинное, чтобы занимать несколько строк хотя бы на узких эеранах",
            "audio": null,
            "user_id": 1,
            "recipient": null,
            "phone": null,
            "is_viewed": false,
            "whatsapp_id": null,
            "created_at": "2025-04-21T09:44:53.000000Z",
            "updated_at": "2025-04-21T09:44:53.000000Z",
            "deleted_at": null,
            "user": {
                "id": 1,
                "name": "КАС"
            }
        },
        {
            "id": 194,
            "room": "user__1_4",
            "reply_to": null,
            "file": null,
            "text": "test",
            "audio": null,
            "user_id": 4,
            "recipient": null,
            "phone": null,
            "is_viewed": false,
            "whatsapp_id": null,
            "created_at": "2025-04-21T09:45:23.000000Z",
            "updated_at": "2025-04-21T09:45:23.000000Z",
            "deleted_at": null,
            "user": {
                "id": 4,
                "name": "Maya"
            }
        },
        {
            "id": 239,
            "room": "user__1_4",
            "reply_to": null,
            "file": null,
            "text": "test",
            "audio": null,
            "user_id": 4,
            "recipient": null,
            "phone": null,
            "is_viewed": false,
            "whatsapp_id": null,
            "created_at": "2025-04-21T10:42:41.000000Z",
            "updated_at": "2025-04-21T10:42:41.000000Z",
            "deleted_at": null,
            "user": {
                "id": 4,
                "name": "Maya"
            }
        },
        {
            "id": 241,
            "room": "user__1_4",
            "reply_to": null,
            "file": null,
            "text": "test",
            "audio": null,
            "user_id": 4,
            "recipient": null,
            "phone": null,
            "is_viewed": false,
            "whatsapp_id": null,
            "created_at": "2025-04-21T10:43:05.000000Z",
            "updated_at": "2025-04-21T10:43:05.000000Z",
            "deleted_at": null,
            "user": {
                "id": 4,
                "name": "Maya"
            }
        },
        {
            "id": 285,
            "room": "user__1_4",
            "reply_to": null,
            "file": null,
            "text": "test",
            "audio": null,
            "user_id": 4,
            "recipient": null,
            "phone": null,
            "is_viewed": false,
            "whatsapp_id": null,
            "created_at": "2025-04-21T10:46:25.000000Z",
            "updated_at": "2025-04-21T10:46:25.000000Z",
            "deleted_at": null,
            "user": {
                "id": 4,
                "name": "Maya"
            }
        },
        {
            "id": 325,
            "room": "user__1_4",
            "reply_to": null,
            "file": null,
            "text": "test",
            "audio": null,
            "user_id": 4,
            "recipient": null,
            "phone": null,
            "is_viewed": false,
            "whatsapp_id": null,
            "created_at": "2025-04-21T10:53:07.000000Z",
            "updated_at": "2025-04-21T10:53:07.000000Z",
            "deleted_at": null,
            "user": {
                "id": 4,
                "name": "Maya"
            }
        },
        {
            "id": 349,
            "room": "user__1_4",
            "reply_to": null,
            "file": null,
            "text": "test",
            "audio": null,
            "user_id": 4,
            "recipient": null,
            "phone": null,
            "is_viewed": false,
            "whatsapp_id": null,
            "created_at": "2025-04-21T11:52:44.000000Z",
            "updated_at": "2025-04-21T11:52:44.000000Z",
            "deleted_at": null,
            "user": {
                "id": 4,
                "name": "Maya"
            }
        },
        {   "id":4,
            "room":"user__3_4",
            "reply_to":0,
            "file":{
                "ext":"jpg",
                "url":"images/image.jpg",
                "mime":"image/jpeg",
                "name":"IMG-20250305-WA0000.jpg",
                "thumb":"images/image.jpg",
                "size":455226,
                "dimensions":{
                    "0":1200,
                    "1":1600,"2":2,"3":"width=\"1200\" height=\"1600\"","bits":8,"mime":"image/jpeg","channels":3}},
                    "text":null,"audio":null,"user_id":4,"recipient":null,"phone":null,"is_viewed":false,"whatsapp_id":null,
                    "created_at":"2025-06-16T19:40:59.000000Z",
                    "updated_at":"2025-06-16T19:40:59.000000Z",
                    "deleted_at":null,
                "user":{"id":4,"name":"Maya"},
                "is_viewed": "false"
        },
        {   "id": 5,
            "room": "user__3_4",
            "reply_to": {
                "id": 1,
                "room": "user__3_4",
                "reply_to": 0,
                "file": null,
                "text": "test",
                "audio": null,
                "user_id": 4,
                "recipient": null,
                "phone": null,
                "is_viewed": false,
                "whatsapp_id": null,
                "created_at": "2025-05-23T14:47:25.000000Z",
                "updated_at": "2025-05-23T14:47:25.000000Z",
                "deleted_at": null,
                "user": { "id": 4, "name": "Maya" }
            },
            "file": null,
            "text": "Ответ на сообщение тесто что-то там",
            "audio": null,
            "user_id": 4,
            "recipient": null,
            "phone": null,
            "is_viewed": false,
            "whatsapp_id": null,
            "created_at": "2025-06-16T12:29:59.000000Z",
            "updated_at": "2025-06-16T12:29:59.000000Z",
            "deleted_at": null,
            "user": { "id": 4, "name": "Maya" }
        },
        {   "id":4,
            "room":"user__3_4",
            "reply_to":0,
            "file":{
                "ext":"jpg",
                "url":"images/image.jpg",
                "mime":"image/jpeg",
                "name":"IMG-20250305-WA0000.jpg",
                "thumb":"images/image.jpg",
                "size":455226,
                "dimensions":{
                    "0":1200,
                    "1":1600,"2":2,"3":"width=\"1200\" height=\"1600\"","bits":8,"mime":"image/jpeg","channels":3}},
                    "text":null,"audio":null,"user_id":4,"recipient":null,"phone":null,"is_viewed":false,"whatsapp_id":null,
                    "created_at":"2025-06-16T19:40:59.000000Z",
                    "updated_at":"2025-06-16T19:40:59.000000Z",
                    "deleted_at":null,
                "user":{"id":4,"name":"Maya"},
                "is_viewed": "false"
        },
        {   "id": 5,
            "room": "user__3_4",
            "reply_to": {
                "id": 1,
                "room": "user__3_4",
                "reply_to": 0,
                "file": null,
                "text": "test",
                "audio": null,
                "user_id": 4,
                "recipient": null,
                "phone": null,
                "is_viewed": false,
                "whatsapp_id": null,
                "created_at": "2025-05-23T14:47:25.000000Z",
                "updated_at": "2025-05-23T14:47:25.000000Z",
                "deleted_at": null,
                "user": { "id": 4, "name": "Maya" }
            },
            "file": null,
            "text": "Ответ на сообщение тесто что-то там",
            "audio": null,
            "user_id": 4,
            "recipient": null,
            "phone": null,
            "is_viewed": false,
            "whatsapp_id": null,
            "created_at": "2025-06-16T12:29:59.000000Z",
            "updated_at": "2025-06-16T12:29:59.000000Z",
            "deleted_at": null,
            "user": { "id": 4, "name": "Maya" }
        }
    ]

    try {
      //   const response = await $api.get(`/messages?include=user,recipient,replyTo.user&filter[room]=${room}`);
      const response = {
        "data": data      
      };
      return {
        data: response.data,
        success: true,
      }

    } catch (error) {
        console.log('Ошибка при получении сообщений чата', error);
        return {
            error,
            success: false
        }
    } finally {
    }    

}