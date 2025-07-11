import { defineStore } from 'pinia';
import { fetchLists } from "@/services/commonService.js";

export const useMainStore = defineStore(
    'main', {
        state: () => ({
            activeRoom: null,
            lists: {
                users: [],
                me: {}
            },
            isImboxMobileChatsOpen: false,
            //
            isMenuOpen: false,
        }),
        persist: {
            pick: ['activeRoom'] // Какие переменные сохранить в LS
        },
        actions: {

            async getLists() {
                const response = await fetchLists();
                if (response.success) {
                    this.lists.users = response.data;
                }     
                this.lists.me = {
                    "id": 4,
                    "name": "Maya", 
                    "email": "maya.soloveva2015@yandex.ru", 
                    "created_at": "2025-05-18T17:09:53.000000Z", 
                    "updated_at": "2025-05-18T17:09:53.000000Z", 
                    "status": null, 
                    "permissions": { "permissions": [], "pipelines": [] }, 
                    "roles": []
                }           
            }
        },
        getters: {
        },
    },
    // {
    //     persist: true, //!!!
    // }
)