<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import throttle from "lodash.throttle";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Notifications from "@/Components/Notifications.vue";
import Chats from '@/Components/Chats.vue';
import TopNav from '@/Components/TopNav.vue';
import DrawerLeft from '@/Components/DrawerLeft.vue';
import { getRoomType  } from "../utils/room-functions";
  
// import GroupModal from "~/components/Common/GroupModal.vue";
import ptDialog from '@/assets/presets/custom/modalPreset.js';

import { useMainStore } from '@/stores/main.js';
const store = useMainStore();

const imboxActive = ref({});
const contacts = ref([]);
const imboxNotificationsRef = ref(null);
const chatGroupRef = ref(null);
const lastMessage = ref({});


// // Параметры запроса
// const asideParams = ref({});

// const onChangeAsideParam = (name, value) => {
//   asideParams.value[name] = value;
// };

// const me = ref({});
import { useDialog } from 'primevue/usedialog';

const dialog = useDialog();

// Диалог добавления группы
// const openDialog = (data) => {
//   let groupdialogRef = dialog.open(GroupModal, {
//     props: {
//       showHeader: false,
//       draggable: false,
//       modal: true,
//       appendTo: ".main",
//       pt: ptDialog,
//     },
//     data: data,
//     onSubmit: async (eventData) => {
//       imboxActive.value = {
//         room: `group__${eventData.id}`,
//         type: 'group'
//       }
//     },
//     onError: (errors) => {},
//   });
// };

// const createChatGroup = () => {
//   openDialog({});
// };

const isMobile = ref(false);
const setIsMobile = () => {
  if (document.documentElement.clientWidth < 1024) {
    isMobile.value = true;
  } else {
    isMobile.value = false;
    store.isImboxMobileChatsOpen = false;
  }
}
const onResize = throttle(() => {
  setIsMobile();
});

watch(imboxActive, (newVal) => {
  console.log('[Home] watch(imboxActive, newVal ', newVal, isMobile.value);
  if (isMobile.value) {
    store.isImboxMobileChatsOpen = true
    // newVal.action == 'click' ? store.isImboxMobileChatsOpen = true : store.isImboxMobileChatsOpen = false;
  } else {
    if (store.isImboxMobileChatsOpen) {
      store.isImboxMobileChatsOpen = false;
    }
  }
})

onMounted( async () => {
  onResize();
  window.addEventListener("resize", onResize); 
})

onUnmounted(() => {
  window.removeEventListener("resize", onResize); 
})

const setLastMessage = (last_message) => {
  lastMessage.value = last_message;
}

const openUserChat = (...args) => {
  imboxActive.value = {
    room: args[0]['room'],
    type: getRoomType(args[0]['room']),
  }
  store.isImboxMobileChatsOpen = true
}

</script>

<template>    

  <!-- <authenticated-layout :loading="loading" page="imbox"> -->
  <AuthenticatedLayout>
    <section class="messenger absolute h-full w-full">
      <div class="flex h-full">

        <DrawerLeft
            @open-user-chat="(...args) => { openUserChat(...args)}"
            @open-group-chat="(...args) => { openUserChat(...args) }"
         />

        <div class="w-full lg:w-[30%] panel-left flex flex-col">
          <TopNav></TopNav>
          <Notifications
            :requestParams="asideParams"
            class="w-full"
            v-model="imboxActive"
            ref="imboxNotificationsRef"
            :last-message = "lastMessage"
          />
        </div>

        <!-- <div class="right-panel hidden lg:block lg:flex-1 h-full text-surface-500 dark:text-surface-100 overflow-hidden border-l border-dark-200"> -->
        <div class="right-panel hidden lg:block lg:flex-1 h-full  text-surface-500 dark:text-surface-100 lg:border-l lg:border-dark-200">
          <div id="dashboard-chats" class="h-full" v-if="imboxActive.room">
            <Chats
                v-if="!isMobile"
                :imboxActive="imboxActive"
                @last-message="setLastMessage"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- <template #aside>
      <div class="w-[316px] h-full">
        <ImboxAside
          :loading="loading"
          @change-filter="onChangeAsideParam"
          @change-param="onChangeAsideParam"
          @new-group="createChatGroup"
          ref="AsideImbox"
        />
      </div>
    </template>-->

    <template #chats>
      <div class="w-full h-full">
            <Chats
              v-if="isMobile"
              isMobile="true"
              :imboxActive="imboxActive"
              @last-message="setLastMessage"
            />
      </div>
    </template> 
  </AuthenticatedLayout>
</template>
