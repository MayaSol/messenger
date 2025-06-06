<script setup>
    import { ref, computed } from 'vue';
    import GroupFull from '@/Components/GroupFull.vue';
    import UserChatCreate from './UserChatCreate.vue';

    import { useMainStore } from '@/stores/main.js';
    const store = useMainStore();


    const emit = defineEmits(['open-user-chat','open-group-chat']);

    const mode = ref('user');
    const headerText = computed(() => {
        if (mode.value == 'user') {
            return 'Новый чат';
        } else if (mode.value == 'group') {
            return 'Добавление участников группы';
        }
    })

    const closeDrawer = () => {
        store.isMenuOpen = false;
        mode.value = 'user';
    }

    const openUserChat = (...args) => {
        console.log('[DrawerLeft] openUserChat args', args);
        emit('open-user-chat',...args);
        closeDrawer();
    }

    // Создание группы
    const chatGroupRef = ref(null);
    const saving = ref(false);
    const readyToSave = computed(() => {
        if (chatGroupRef.value && chatGroupRef.value.readyToSave()) {
            return true;
        } else {
            return false;
        }
    });
    const newGroup = async () => {
        if (chatGroupRef.value) {
                saving.value = true;
            // let response = await chatGroupRef.value.newGroup();
                saving.value = false;
            // if (response && response.success) {
            //     // await dialogRef.value.options.onSubmit(response.data);
            //     emit('open-user-group',response.data);
            //     closeDrawer();
            // }
            emit('open-group-chat',{
                room: `group__test`,
                type: 'group'
                });
            closeDrawer();
        }
    };    


</script>
<template>
    <Drawer 
        v-model:visible="store.isMenuOpen"
        :showCloseIcon = "false"
        class="h-full bg-[var(--body)] text-[var(--text)] w-full lg:w-[30%]"        
        pt:header:class="flex items-center p-[10px] text-text-white bg-accent-bg"
        pt:content:class="flex flex-col h-[calc(100%-60px)] px-[10px] pt-[10px]"
    >
        <template #header>
            <button 
                @click="closeDrawer"
                class="flex items-center justify-center w-[40px] h-[40px] cursor-pointer"
            >
                <span class="pi pi-arrow-left text-xl"></span>
            </button>
            <div>{{ headerText }}</div>
        </template> 

        <!-- Чат с пользователем -->
        <template v-if="mode == 'user'">
            <div @click="mode = 'group'">
                <div class="flex items-center mb-[10px] p-[10px] cursor-pointer hover:bg-[var(--p-surface-100)]">
                    <i class="pi pi-users mr-4 text-xl"></i>
                    <span>Новая группа</span>
                </div>
            </div>
            <UserChatCreate
                @open-user-chat="(...args) => openUserChat(...args)"
                ref="UserChatCreateRef"
            />
        </template>

        <!-- Группа -->
        <template v-if="mode == 'group'" class="h-full">
            <GroupFull
                ref="chatGroupRef"
            ></GroupFull>
            <Button
                @click.stop.prevent="newGroup"
                title="Создать"
                :disabled="saving || !readyToSave"
                class="bg-emerald-400 hover:enabled:!bg-emerald-700 h-[var(--modal-header-height)] text-white border-0 flex items-center justify-center p-1 px-2"
            >
                <p>Создать</p>
            </Button>       
        </template>

    </Drawer>
</template>
        

<style>


</style>