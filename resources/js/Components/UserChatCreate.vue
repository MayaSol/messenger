<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useMainStore } from '@/stores/main.js';
  const store = useMainStore();

  const emit = defineEmits(["open-user-chat"]);
  //!!! const me = useSanctumUser().value;
  const users = computed(() => store.lists.users
    ? store.lists.users.filter(user => user.id != store.lists.me.id )
    : []
  );

  const selectedUser = ref(null);
  //!!! const currentUser = useSanctumUser().value;
  const currentUser = store.lists.me;

  // Для VirtualScroller
  // const newUserChat = async (user) => {
  //   console.log('[UserChatCreate] newUserChat 1 ',currentUser.id, user);
  //   const [user1, user2] =
  //     user.id < currentUser.id
  //       ? [user.id, currentUser.id]
  //       : [currentUser.id, user.id];
  //   console.log('[UserChatCreate] newUserChat',user1,user2);
  //   let room = `user__${user1}_${user2}`;
  //   emit("open-user-chat", {
  //     'room': room, 
  //     'type': 'user',
  //     'name': user.name
  //   });
  // };

  // Для ListBox
  const newUserChat = async () => {
    const [user1, user2] =
      selectedUser.value.id < currentUser.id
        ? [selectedUser.value.id, currentUser.id]
        : [currentUser.id, selectedUser.value.id];
    let room = `user__${user1}_${user2}`;
    emit("open-user-chat", {
      'room': room, 
      'type': 'user',
      'name': selectedUser.value.name
    });
  };  

  const cleanSelected = () => {
    selectedUser.value = {};
  };

  const virtualScrollerOptions = {
    itemSize: 72, 
    lazy: true, 
    // onLazyLoad: onLazyLoad,
    // onScroll: onScroll
  }

  defineExpose({
    cleanSelected,
  });

</script>

<template>
  <div class="messenger-contact-list flex grow gap-1 w-full h-[calc(100%-44px)]">


    <Listbox 
      v-model="selectedUser" 
      @update:modelValue="newUserChat"
      :options="users" filter 
      optionLabel="name" 
      class="w-full h-full border-none bg-transparent" 
      pt:header:class="p-0 pb-2"
      pt:option:class="px-0"
      pt:listcontainer:class="h-[calc(100%-50px)]"
      listStyle="max-height: none;"
      :virtualScrollerOptions="virtualScrollerOptions"
    >
      <template #option="slotProps">
      <div class="flex items-center">
          <div class="messenger-avatar w-[49px] h-[49px] flex items-center justify-center mx-[10px] py-[6px] bg-[#dfe9ea] rounded-full overflow-hidden">
            <img class="w-[49px] h-[49px] -mb-[10px]" src="images/user-avatar-default.svg" />
          </div>    
          <div>{{ slotProps.option.name }}</div>
      </div>
    </template>
  </Listbox>

    <!-- <VirtualScroller 
      :items="users" 
      :itemSize="38" 
      class="relative h-full w-full overflow-y-auto text-black dark:text-surface-0" 
      >
        <template v-slot:item="{ item, options }">
          <div 
            @click="newUserChat(item)"
            class="flex items-center p-2 relative cursor-pointer bg-surface-0 dark:bg-surface-700 hover:bg-[var(--contact-hover)] transition-colors duration-300">
            <div class="messenger-avatar w-[40px] h-[40px] flex items-center justify-center mr-[10px] bg-[#dfe9ea] rounded-full overflow-hidden">
              <img class="w-[40px] h-[40px] -mb-[10px]" src="images/user-avatar-default.svg" />
            </div>            
            <div>
              <div>{{ item.name }}</div>
            </div>
          </div>
        </template>
    </VirtualScroller> -->

    <!-- <IftaLabel class="grow">
      <label class="text-surface-400">Чат с пользователем</label>
        <Select
        v-model="selectedUser"
        @update:modelValue="newUserChat"
        :options="users"
        filter
        optionLabel="name"
        placeholder="Выберите пользователя"
        class="w-full"
        pt:root:class="dark:!border-[rgba(255,255,255,0.25)]"
        pt:label:class="py-[2px]"
        :virtualScrollerOptions="virtualScrollerOptions"
      />      
    </IftaLabel> -->


  </div>
</template>


<style>
  .messenger-contact-list .p-virtualscroller {
    height: 100% !important;
  }
</style>