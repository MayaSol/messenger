<script setup>
import { ref, watch } from "vue";
import ptTabViewChatPreset from "@/assets/presets/custom/tabViewChatPreset.js";
import Chat from '@/Components/Chat.vue';
import GroupInfo from '@/Components/GroupInfo.vue';
import UserInfo from '@/Components/UserInfo.vue';
import { useMainStore } from '@/stores/main.js';
import { getOtherUser } from '@/utils/room-functions.js';

const store = useMainStore();
const props = defineProps({
  imboxActive: Object,
  isMobile: {
    type: Boolean,
    default: false,
  },
});

const title = ref('');

const msgTabActive = ref("chat");
const emit = defineEmits(["last-message"]);

// Переключение на чаты активной подписки
watch(
  () => props.imboxActive,
  (newVal) => {
    if (!newVal.room) return;
    console.log('[Chats.vue] () => props.imboxActive newVal: ',newVal);
    msgTabActive.value = "chat";
    let userId = getOtherUser(newVal.room);
    console.log('[Chats] userId ',userId);
    if (newVal.message == null) {
      title.value = store.lists.users.find(user => user.id == userId);
    }
  },
  { immediate: true }
);

const emitLastMessage = (lastMessage) => {
  emit("last-message", lastMessage);
};
</script>

<template>
  <!---->
  <div class="flex items-center min-h-[60px] lg:px-[10px] text-surface-700 bg-accent-bg">   
    <button 
      v-if="isMobile"
      @click="store.isImboxMobileChatsOpen = false"
      class="flex items-center justify-center w-[40px] h-[40px] bg-accent-bg cursor-pointer"
    >
      <span class="pi pi-arrow-left text-xl text-text-white"></span>
    </button>  
    <div class="flex items-center">
      <div class="messenger-avatar w-[40px] h-[40px] flex items-center justify-center mr-[10px] bg-[#dfe9ea] rounded-full overflow-hidden">
        <img class="w-[40px] h-[40px] -mb-[10px]" src="images/user-avatar-default.svg" />
      </div>
      <div>
        <div class="text-white">{{ imboxActive.message && imboxActive.message.title || title && title.name }}</div>
      </div>
    </div>  
  </div>
  <!---->
  <div class="flex">
    <button
      @click="msgTabActive = 'user_info'"
      v-if="imboxActive.type == 'user'"
      class="flex items-center justify-center grow text-center px-2 py-3 font-medium text-surface-100 bg-accent-bg border-b-2 cursor-pointer"
      :class="msgTabActive == 'user_info' ? 'border-surface-50' : 'border-transparent'"
    >
      <span>Инфо</span>
    </button>
    <button
      @click="msgTabActive = 'group_info'"
      v-if="imboxActive.type == 'group'"
      class="flex items-center justify-center grow text-center px-2 py-3 font-medium text-surface-100 bg-accent-bg border-b-2 cursor-pointer"
      :class="
        msgTabActive == 'group_info' ? 'border-surface-50' : 'border-transparent'
      "
    >
      <span>Инфо</span>
    </button>
    <button
      @click="msgTabActive = 'chat'"
      class="flex items-center justify-center grow text-center px-2 py-3 font-medium text-surface-100 bg-accent-bg border-b-2 cursor-pointer"
      :class="msgTabActive == 'chat' ? 'border-surface-50 dark:border-surface-100' : 'border-transparent'"
    >
      <span>Чат</span>
    </button> 
  </div>
  <Tabs
    v-model:value="msgTabActive"
    :pt="ptTabViewChatPreset"
    pt:panelcontainer="bg-white dark:bg-surface-600"
  >
    <TabPanels pt:root="h-full p-0">
      <!-- <TabPanel
        value="deal_info"
        pt:root="h-full"
        v-if="['deal'].includes(imboxActive.type)"
      >
        <CommonChatDealInfo :deal_id="imboxActive.deal_id" />
      </TabPanel> -->

      <TabPanel value="user_info" v-if="['user'].includes(imboxActive.type)">
        <UserInfo :room="imboxActive.room" />
      </TabPanel>

      <TabPanel
        value="group_info"
        v-if="['group'].includes(imboxActive.type)"
        pt:root="h-full"
      >
        <div class="p-2 h-full">
          <GroupInfo :room="imboxActive.room" />
        </div>
      </TabPanel>

      <TabPanel class="bg-transparent" value="chat" pt:root="chatwork-panel h-full">
        <!-- v-if="msgTabActive === 'chat'" -->
        <Chat
          :type="imboxActive.type"
          :room="imboxActive.room"
          :key="imboxActive.room"
          :isActive="msgTabActive == 'chat'"
          @last-message="emitLastMessage"
          class="overflow-hidden h-full border-b-[1px] border-t-0 border-x-0 box-border bg-white"
        >
        </Chat>
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
