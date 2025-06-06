<script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import ptFieldsetDealModal from "@/assets/presets/custom/fieldsetDealModal.js";
  import VSelect from '@/Components/Form/VSelect.vue';
  //!!! import { fetchUsers, createGroupChat, updateGroupChat, fetchGroupInfo } from "@/services/api/imboxServices.js";
  //!!! import { createMessage  } from '@/services/api/chatWorkServices.js';

  import { useMainStore } from '@/stores/main.js';
  import { event } from "@primeuix/themes/aura/timeline";
  const store = useMainStore();

  const saving = ref(false);
  const errors = ref([]);
  const ptFieldsetOptions = { mergeSections: true, mergeProps: true };
  const isGroupChanged = ref(false);
  const loading = ref(false);

  const props = defineProps(["room"]);

  const group = ref({});
  const originalGroup = ref({});
  const activeTab = ref(0);
  const usersOptions = ref({});
  const selectedUsers = ref(null);
  const virtualScrollerOptions = {
    itemSize: 72, 
    lazy: true, 
    // autoSize: false,
    // onLazyLoad: onLazyLoad,
    // onScroll: onScroll
  }

  // const allUsers = computed(() => listsStore.usersWithRolesList
  //   ? listsStore.usersWithRolesList.filter(user => user.id != me.id )
  //   : []
  // );
  const allUsers = computed(() => store.lists.users
    ? store.lists.users.filter(user => user.id != store.lists.me.id )
    : []
  );
  const setGroupData = () => {
    if (!props.room)  {
      // Новая группа
      group.value.users = [{id: store.lists.me.id, name: store.lists.me.name}];
      group.value.owner = store.lists.me.id;
      return;
    }
    // Открыли существующую группу
    loading.value = true;
    let groupId = props.room.split('__')[1];
    // const response = await fetchGroupInfo(groupId);
    // if (response.success) {
    //   originalGroup.value = response.data;
    //   group.value = {...originalGroup.value};
    //   group.value.users = [...originalGroup.value.users];
    // }  

    loading.value = false;
  }

  const newGroup = async () => {
    //!!! const response = await createGroupChat(group.value.title,group.value.users.map(user => user.id),me.id);
    // if (response.success) {
    //   // Добавляем первое сообщение
    //     let messageData =  {
    //             room: `group__${response.data.id}`,
    //             text: `Создана новая группа`,
    //             reply_to: 0,
    //             recipient: null,
    //             phone: null
    //     };
    //     await createMessage(messageData);
    // } else {
    //   errors.value = response.error;
    // }  

    // return response;
  };

  const updateGroup = async () => {
    //!!! let groupId = props.room.split('__')[1];
    // const response = await updateGroupChat(groupId, group.value.title, group.value.users.map(user => user.id));
    // if (response.success) {
    //   isGroupChanged.value = false;
    // } else {
    //   errors.value = response.error;
    // }  
    // return response;
  }

  const readyToSave = () => {
    if (group.value.users && group.value.users.length > 1 && group.value.title && group.value.title.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  const availableUsers = computed(() => {
    if (Object.keys(group.value).length == 0) return [];
    return allUsers.value.filter(
      (user) =>
        !group.value.users.some((selectedUsers) => selectedUsers.id == user.id)
    );
  });


  const addParticipant = () => {
    if (!group.value.users) group.value.users = [];
    group.value.users.push(...selectedUsers.value);
    selectedUsers.value = null;
  };


  const removeParticipant = (userId) => {
      group.value.users = group.value.users.filter(user => user.id != userId);
  }

  const getIsGroupChanged = () => {
      const changed = JSON.stringify(group.value) !== JSON.stringify(originalGroup.value);
      if (changed) {
        isGroupChanged.value = true;
      } else {
        isGroupChanged.value = false;
      }
  }

  const isOwner = computed(() => {
    if (group.value.owner == store.lists.me.id) {
      return true;
    } else {
      return false;
    }
  })

  const removeUser = (event,userId) => {
    selectedUsers.value = selectedUsers.value.filter(item => item.id != userId);
  }

  onMounted(async () => {
    setGroupData();
  })

  watch(() => props.room,async (newVal) => {
    setGroupData();
  })

  watch(group, (newValue) => {
    if (!isGroupChanged.value) {
      getIsGroupChanged();
    }
  },{deep: true})


  defineExpose({
    newGroup,
    updateGroup,
    readyToSave,
    isGroupChanged,
    isOwner,
  });

</script>

<template>

  <div class="flex flex-col gap-2 mt-2" v-if="loading">
    <Skeleton class="w-full" height="58px"/>
    <div class="mt-[58px] flex flex-col gap-2">
      <Skeleton class="w-full" height="42px" v-for="i in 2"/>
    </div>
  </div>

  <div v-if="!loading" class="h-full flex flex-col">
    <div class="group-new-container gap-2">

      <ifta-label>
        <label class="text-sm text-gray-400">Название группы</label>
        <InputText
          v-model="group.title"
          class="w-full"
          :disabled="!isOwner"
        />
      </ifta-label>
    </div>
    <div class="my-2">Участники</div>
    <div class="h-full flex flex-col">
      <!-- <div
        v-for="(user, index) in group.users"
        :key="index"
        class="flex flex-col gap-2"
      >
        <div
          class="flex justify-between gap-2 border-[1px] border-slate-300 mb-2 py-1.5 px-4 rounded-md items-center"
        >
          <div>{{ user ? user.name : "null" }}</div>
          <button v-show="user.id != store.lists.me.id && isOwner" @click="removeParticipant(user.id)">
            <i
              class="pi pi-times-circle text-lg text-surface-400 hover:text-red-400"
            ></i>
          </button>
        </div>
      </div> -->

      <div class="selected-items">
        <Chip 
          v-for="(item, index) in selectedUsers" 
          :key="item.id" 
          class="selected-item"
          :label="item.name"
          removable
          @remove="(event) => removeUser(event,item.id)"
          data-user-id="item.id"
        />
      </div>          

      <Listbox 
        v-model="selectedUsers" 
        :options="availableUsers" 
        filter 
        multiple
        optionLabel="name" 
        class="w-full h-full border-none bg-transparent" 
        pt:root:class="h-[calc(100%-40px)]"
        pt:header:class="p-0 pb-2"
        pt:option:class="px-0"
        pt:listcontainer:class="h-[calc(100%-50px)]"
        listStyle="max-height: none;"
        scrollHeight="100%"
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

      <!-- <IftaLabel v-if="isOwner">
          <label>Новый участник</label>
          <VSelect
            v-model="selectedUsers"
            :options="availableUsers"
            label="name"
            value="id"
            multiple
            placeholder="Выберите участника"
            class="v-select-chatgroup"
          >
          </VSelect>
      </IftaLabel>
      <div class="flex justify-center mt-2">
          <button
          v-if="isOwner"
          @click="addParticipant"
          :disabled="!selectedUsers || selectedUsers.length == 0"
          class="button-modal"
          >
          Добавить участника
          </button>
      </div>             -->
    </div>
  </div>

</template>


<style>
 /* .v-select-chatgroup .vs__dropdown-toggle {
    padding-top: 5px;
    padding-bottom: 7px;
 } */

  .p-listbox-option-selected {
    background-color: var(--p-surface-100);
  }
</style>