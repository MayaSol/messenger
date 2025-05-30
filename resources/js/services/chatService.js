export const fetchMessages = async (room) => {


    console.log('[chatService.js] fetchMessages room ', room);
    let data;

    if (room == "group__13") {
        data = [
                {
                    "id": 54,
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
                    "created_at": "2025-04-11T15:57:18.000000Z",
                    "updated_at": "2025-04-11T15:57:18.000000Z",
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
                    "text": "test",
                    "audio": null,
                    "user_id": 4,
                    "recipient": null,
                    "phone": null,
                    "is_viewed": false,
                    "whatsapp_id": null,
                    "created_at": "2025-04-21T09:44:53.000000Z",
                    "updated_at": "2025-04-21T09:44:53.000000Z",
                    "deleted_at": null,
                    "user": {
                        "id": 4,
                        "name": "Maya"
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
                }
            ]
    } else {
        data =  [{
                    "id": 1001,
                    "room": room,
                    "reply_to": null,
                    "file": null,
                    "text": `Сообщение в чате ${room}`,
                    "audio": null,
                    "user_id": 4,
                    "recipient": null,
                    "phone": null,
                    "is_viewed": false,
                    "whatsapp_id": null,
                    "created_at": "2025-04-11T15:57:18.000000Z",
                    "updated_at": "2025-04-11T15:57:18.000000Z",
                    "deleted_at": null,
                    "user": {
                        "id": 4,
                        "name": "Maya"
                    }
        }];
    }

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