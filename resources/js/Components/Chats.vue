<script setup>
import { ref, watch } from "vue";
import ptTabViewChatPreset from "@/assets/presets/custom/tabViewChatPreset.js";
import Chat from '@/Components/Chat.vue';
import GroupInfo from '@/Components/GroupInfo.vue';
import UserInfo from '@/Components/UserInfo.vue';
import { useMainStore } from '@/stores/main.js';

const store = useMainStore();
const props = defineProps({
  imboxActive: Object,
  isMobile: {
    type: Boolean,
    default: false,
  },
});

const msgTabActive = ref("chat");
const emit = defineEmits(["last-message"]);

// Переключение на чаты актвной подписки
watch(
  () => props.imboxActive,
  (newVal) => {
    msgTabActive.value = "chat"
    // if (msgTabActive.value == "chat") return;
    // if (newVal.type == "user") {
    //   msgTabActive.value = "user_info";
    // }
    // if (newVal.type == "deal") {
    //   msgTabActive.value = "deal_info";
    // }
    // if (newVal.type == "group") {
    //   msgTabActive.value = "group_info";
    // }
  },
  { immediate: true }
);

const emitLastMessage = (lastMessage) => {
  emit("last-message", lastMessage);
};
</script>

<template>
  <!---->
  <div class="flex items-center min-h-[60px] text-surface-700 bg-accent-bg">   
    <button 
      v-if="isMobile"
      @click="store.isImboxMobileChatsOpen = false"
      class="flex items-center justify-center w-[40px] h-[40px] bg-accent-bg cursor-pointer"
    >
      <span class="pi pi-arrow-left text-xl text-text-white"></span>
    </button>  
    <div class="flex items-center">
      <div class="messenger-avatar mr-[10px]">
        <img class="w-[40px] h-[40px]" src="images/user-avatar-default.svg" />
      </div>
      <div>
        <div class="text-white">{{ imboxActive.message.title }}</div>
      </div>
    </div>  
  </div>
  <!---->
  <div class="flex">
    <button
      @click="msgTabActive = 'user_info'"
      v-if="imboxActive.type == 'user'"
      class="flex items-center justify-center grow text-center px-2 py-3 font-medium text-surface-100 bg-accent-bg border-b-2 cursor-pointer"
      :class="
        msgTabActive == 'user_info' ? 'border-surface-50' : 'border-transparent'
      "
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
