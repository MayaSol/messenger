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

  console.log('[UserChatCreate] users: ', users);

  const selectedUser = ref(null);
  //!!! const currentUser = useSanctumUser().value;
  const currentUser = store.lists.me;

  const newUserChat = async () => {
    console.log('[UserChatCreate] ',selectedUser.value,currentUser.id);
    const [user1, user2] =
      selectedUser.value.id < currentUser.id
        ? [selectedUser.value.id, currentUser.id]
        : [currentUser.id, selectedUser.value.id];
    console.log('[UserChatCreate] newUserChat',user1,user2);
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
    itemSize: 38, 
    lazy: true, 
    // onLazyLoad: onLazyLoad,
    // onScroll: onScroll
  }

  defineExpose({
    cleanSelected,
  });

  onMounted(() => {
    console.log('[UserChatCreate] onMounted');
  })

</script>

<template>
  <div class="flex gap-1 w-full -mb-[1px]">
    <IftaLabel class="grow">
      <label class="text-surface-400">Чат с пользователем</label>
      <Select
        v-model="selectedUser"
        @update:modelValue="newUserChat"
        :options="users"
        filter
        optionLabel="name"
        optionValue="id"
        placeholder="Выберите пользователя"
        class="w-full"
        pt:root:class="dark:!border-[rgba(255,255,255,0.25)]"
        pt:label:class="py-[2px]"
        :virtualScrollerOptions="virtualScrollerOptions"
      />
    </IftaLabel>
  </div>
</template>
