export const fetchRooms = async() => {
	try {	
		const response =  await Promise.resolve([
			{
				"room": "group__13",
				"type": "group",
				"last_message": {
					"id": 429,
					"room": "group__13",
					"reply_to": null,
					"file": null,
					"text": "Создана новая группа",
					"audio": null,
					"user_id": 4,
					"recipient": null,
					"phone": null,
					"is_viewed": false,
					"whatsapp_id": null,
					"created_at": "2025-05-15T11:27:20.000000Z",
					"updated_at": "2025-05-15T11:27:20.000000Z",
					"deleted_at": null,
					"user": {
						"id": 4,
						"name": "Maya"
					}
				},
				"title": "test",
				"users": [
					2,
					3,
					4,
					5,
					103,
					104
				]
			},

			{
					"room": "user__4_100",
					"type": "user",
					"last_message": {
						"id": 353,
						"room": "user__4_100",
						"reply_to": null,
						"file": null,
						"text": "test 1111111",
						"audio": null,
						"user_id": 4,
						"recipient": null,
						"phone": null,
						"is_viewed": false,
						"whatsapp_id": null,
						"created_at": "2025-04-21T11:53:00.000000Z",
						"updated_at": "2025-04-21T11:53:00.000000Z",
						"deleted_at": null,
						"user": {
							"id": 4,
							"name": "Maya"
						}
					},
					"title": "11111111",
					"users": [
						4,
						100
					]
				}	
		])  
		return {
            success: true,
            data: response,			
		}
	} catch (error) {
		return { success: false, error}
	}  
}
