<script setup>
  import { ref, watch, nextTick, onMounted, onUnmounted, onBeforeUnmount } from "vue";
  import UserChatCreate from '@/Components/UserChatCreate.vue';
  import { dateFormat } from '@/utils/date-functions.js';
  import { scrollToSmoothly  } from "../utils/scroll";

  // import { page } from '@/services/fakedata/imboxPageData.js';
  // import { fetchMessages, setImboxMessageViewed } from '@/services/api/imboxServices.js';
  // import { fetchUser } from "~/services/api/usersServices.js";
  //!!!
  import { fetchRooms } from '@/services/roomService.js';
  //!!!
  import { useMainStore } from '@/stores/main.js';
  const store = useMainStore();

  const props = defineProps(["modelValue", "requestParams", "lastMessage"]); // modelValue - объект активной сделки
  const emit = defineEmits(['update:modelValue']);
  const messages = ref([]);
  // const needReaction = ref(null);
  // const loadMoreEl = ref(null);
  // const offset = ref(0); // С какой записи запрашивать
  // const messagesLoaded = ref(0);
  // const loadSize = 50; //Количество сообщений, подгружаемых за один раз

  //!!! const me = useSanctumUser().value;
  const user = ref({});

  // const UserChatCreateRef = ref(null);
  //Подгрузка новых сообщений при прокрутке
  const lastIntersectingValue = ref(true);
  const loading = ref(false);

  const getMessages = async function() {
    console.log('[Notifications] getMessages');
    loading.value = true;
    // let params = Object.assign({}, props.requestParams)


    // if (offset.value == 0) {
    //   loading.value = true;
    //   messages.value = [{}]
    // }

    // if (offset.value > 0) {
    //   params.offset = offset.value;
    // }

    const response = await fetchRooms();
    console.log('[Rooms] getMessages response', response);
    loading.value = false;
    if (response.success) { 
        let messages = response.data;
        
        if (messages.length > 0) {
          if (!props.modelValue.room) {
            emit('update:modelValue', {
              // deal_id: messages[0].deal?.id,
              room: messages[0].room,
              index: 0,
              type: messages[0].type,
              message: messages[0]
            });
          }
          else {
            // Если room установлено из store, находим и устанавливаем остальные параметры modelValue
            let index = messages.findIndex(message => message.room == props.modelValue.room);
            if (index > 0) {
              emit('update:modelValue', {
                // deal_id: messages[index].deal?.id,
                room: messages[index].room,
                index: index,
                type: messages[index].type,
                message: messages[index]
              });          
            } else {
              // переписка из room из store не подгружена
              emit('update:modelValue', {
                // deal_id: messages[0].deal?.id,
                room: messages[0].room,
                index: 0,
                type: messages[0].type,
                message: messages[0]
              });
            }
          }
        } else {
          emit('update:modelValue', {
            // deal_id: null,
            room: null,
            index: null,
            type: null,
            message: null
          });        
        }          
    }
    return {
      messages: response.data,
      needReaction: 1
    }
  }


  //!!!
  // В WA не добавляется новый чат вверх списка, список обновляется только при получении нового сообщения
  //!!!
  // watch(() => props.lastMessage,(newVal) => {
  //   console.log('[Notifications] watch(() => props.lastMessage newVal: ', newVal)
  //   if (props.modelValue.type == 'user' && props.modelValue.index == null && props.lastMessage.id >= 0) {
  //     // Если открыт чат пользователя и в нем уже есть новые сообщения, но переписки нет в списке, то добавляем переписку
  //     let newMessage = {
  //       room: props.modelValue.room,
  //       type: 'user',
  //       title: props.modelValue.title,
  //       last_message: props.lastMessage
  //     };      
  //     addNewNotification(newMessage);
  //   }
  // })

  watch(() => props.requestParams,
    async (newValue) => {

      // Поменялись фильтры - запрашиваем заново с начала
      // offset.value = 0;
      const response = await getMessages();
      messages.value = response.messages;
   
      // messagesLoaded.value = messages.value.length;
      lastIntersectingValue.value = true;      
    }, {deep: true});

  watch(
    () => props.modelValue,
    (newValue, oldValue) => {
      console.log(`[Notifications] WATCH props.modelValue`,oldValue,newValue,newValue.action,newValue.type,messages.value.length);      
      if (newValue.action != 'click' && newValue.type == 'user' && newValue.index == null) {
        // Найдем, есть ли чат с пользователем в списке
        let index = messages.value.findIndex(item => item.room == newValue.room);
        console.log('[Notifications] WATCH props.modelValue index: ', index);
        if (index >= 0) {
          emit('update:modelValue', { room: newValue.room, index: index, type: 'user', message: messages.value[index]}); 
        } 
        // else {
        //   // Чата нет в списке, открываем правую вкладку
        //   emit('update:modelValue', { deal_id: null, room: room, index: null, type: 'user', title: name});
        // }
      }
    }
  )    

  // watch(lastIntersectingValue, async (newValue) => {
  //   if (!newValue || messagesLoaded.value < loadSize) {
  //     return;
  //   }
  //   // Подгружаем, начиная с последнего загруженного
  //   // offset.value = messagesLoaded.value;
  //   const response = await getMessages();
  //   // Проверить что нет дублей
  //   let responseFiltered = response.messages.filter(responseMessage => !messages.value.some(message => message.room === responseMessage.room));
  //   messages.value = [...messages.value, ...responseFiltered];
  //   messagesLoaded.value = messages.value.length;
  // })

  const isMobile = ref(false);

  const calcIsMobile = () => {
    if (document.documentElement.clientWidth >= 1024) {
      isMobile.value = false;
    } else {
      isMobile.value = true;
    }
  }

  // Фильтры по сделке
  const checkFiltersDeal = (deal) => {
    // Поиск по UID, address, contact.name, contact.phone
    if (props.requestParams.search) {
      const searchTerm = props.requestParams.search.toUpperCase();
      const searchFields = [];
      searchFields.push(deal.uid);
      if (deal.address) searchFields.push(deal.address);
      if (deal.contacts && deal.contacts.length > 0) {
        for (let contact of deal.contacts) {
          searchFields.push(contact.name);
          searchFields.push(contact.phone);
        }
      }
      let result = searchFields.some(str => str.toUpperCase().includes(searchTerm));
      if (!result) return false;
    }

    //  Прораб
    if (props.requestParams.filter && props.requestParams.filter.prorab && props.requestParams.filter.prorab.length > 0) {
      let result =  props.requestParams.filter.prorab.some(id => id == deal.prorab);
      if (!result) return false;
    }

    //  Ответственные
    if (props.requestParams.filter && props.requestParams.filter.responsible && props.requestParams.filter.responsible.length > 0) {
      let result =  props.requestParams.filter.responsible.some(id => id == deal.responsible);
      if (!result) return false;
    }

    //  Участники
    if (props.requestParams.filter && props.requestParams.filter.team && props.requestParams.filter.team.length > 0) {
      // Участники сделки
      let teamDeal = [];
      if (deal.designer) teamDeal.push(deal.designer);
      if (deal.operator) teamDeal.push(deal.operator);
      if (deal.prorab) teamDeal.push(deal.propab);
      if (deal.responsible) teamDeal.push(deal.responsible);
      // Если хотя бы один участник из фильтра есть в сделке
      let result =  props.requestParams.filter.team.some(id => teamDeal.includes(id));
      if (!result) return false;
    }

    // Теги
    if (props.requestParams.filter && props.requestParams.filter.tags && props.requestParams.filter.tags.length > 0) {
      let result =  props.requestParams.filter.tags.some(tag => deal.tags.includes(tag));
      if (!result) return false;
    }
    
    // Этапы
    if (props.requestParams.filter && props.requestParams.filter.stage && props.requestParams.filter.stage.length > 0) {
      let result = props.requestParams.filter.stage.some(stage => deal.stages.includes(stage))
      if (!result) return false;
    }    
  }

  const checkFilters = (data, deal) => {

    if (!props.requestParams) {
      return true;
    }

    if (props.requestParams.filter && props.requestParams.filter.type.length > 0) {
      if (!props.requestParams.filter.type.includes(data.type)) {
        return false;
      }
    }

    if (data.last_message) {

      let message = data.last_message;

      // Даты
      if (props.requestParams.filter && props.requestParams.filter.last_message && props.requestParams.filter.last_message.startDate) {
        let filterStart = new Date(new Date(props.requestParams.filter.last_message.startDate).setHours(0, 0, 0, 0));
        let messageCreated = new Date(message.created_at);
        if (messageCreated < filterStart) return false;
      }
      if (props.requestParams.filter && props.requestParams.filter.last_message && props.requestParams.filter.last_message.endDate) {
        let filterEnd = new Date(new Date(props.requestParams.filter.last_message.endDate).setHours(0, 0, 0, 0));
        filterEnd.setDate(filterEnd.getDate() + 1);
        let messageCreated = new Date(message.created_at);
        if (messageCreated > filterEnd) return false;
      }
      if (props.requestParams.filter && props.requestParams.filter.last_message && props.requestParams.filter.last_message.lastDays) {
        let filterStart = new Date(new Date().setHours(0, 0, 0, 0));
        filterStart.setDate(filterStart.getDate() - props.requestParams.filter.last_message.lastDays + 1);
        let filterEnd = new Date(new Date().setHours(0, 0, 0, 0));
        filterEnd.setDate(filterEnd.getDate() + 1);
        let messageCreated = new Date(message.created_at);
        if (messageCreated < filterStart || messageCreated > filterEnd) return false;
      }
      // Требует ответа
      if (props.requestParams.filter && props.requestParams.filter.need_answer) {
        if (!message.need_answer) return false;
      }      
    }

    if (deal) {
      if (!checkFiltersDeal(deal)) {
        return false;
      }
    }

    return true;
  }

  const addNewNotification = async (data) => {
      console.log('[Notifications] addNewNotification data',data);
      let newMessage = {...data};
      messages.value.unshift(newMessage);
      let addedMessage = messages.value.find(message => message.room == newMessage.room);
      await nextTick();
        addedMessage.isNew = true;
        setTimeout(() => {
          addedMessage.isNew = false;
        },1000)
  }

  const updateNotification = (data, deal) => {
    console.log('[Notifications] updateNotification');
    if (!data.last_message) {
      return;
    }
    // Если передан message - в чате появилось новое сообщение
    let index = messages.value.findIndex(item => item.room == data.room);
    if (index >= 0) {
      // Imbox message для такого room уже есть
      if (data.last_message.id == messages.value[index].last_message.id) {
        // Обновилось старое imbox message (прочитано)
        messages.value[index].last_message = data.last_message;
      } else {
        // Появилось новое сообщение в том же room
        // Удаляем старое
        messages.value.splice(index, 1);            
        // Добавляем новую запись в начало списка
        addNewNotification(data);
      }
    } else {
      // Если updated не равно created - значит изменилось на Прочитано, а не новое сообщение, не добавляем новую переписку
      console.log('[ImboxNotifications] check if message updated', new Date(data.last_message.created_at), new Date(data.last_message.updated_at), new Date(data.last_message.created_at).getTime() != new Date(data.last_message.updated_at).getTime());
      if (new Date(data.last_message.created_at).getTime() != new Date(data.last_message.updated_at).getTime()) {
        return;
      }
      // Появилось новое сообщение в чате
      // Проверяем, есть ли фильтр и попадет ли в фильтр, только для типа переписки - deal
      console.log('[ImboxNotificatinos] checkFilters', checkFilters(data.last_message,deal));
      if (Object.keys(props.requestParams).length > 0) {
        if (!checkFilters(data, deal)) {
          return;
        }
      }
      // Добавляем в начало
      addNewNotification(data);
      // messagesLoaded.value += 1;      
    }
  }

  //!!! Тут лучше изменять параметр activeRoom и во watch искать чат, если надо перенести его наверх,
  // но в watsapp чат не переносится наверх при открытии, если его нет, только при новом сообщении
  const openUserChat = async(room, name) => {
    // Найдем, есть ли чат с пользователем в списке
    let index = messages.value.findIndex(item => item.room == room);
    if (index >= 0) {
      emit('update:modelValue', { room: room, index: index, type: 'user', message: messages[index]}); 
    } else {
      // Чата нет в списке, открываем правую вкладку
      emit('update:modelValue', { room: room, index: null, type: 'user', message: messages[index]});
    }
  }  

  onMounted(async () => {
    // if (store.activeRoom) {
    //   //!!! Найти message по store.activeRoom и передать
    //   let index = messages.value.findIndex(item => item.room == room);
    //   if (index > 0) {
    //     emit('update:modelValue', { room: store.activeRoom, index: index, type: null, message: messages[index] });
    //   }
 
    // }

    await nextTick();

    const response = await getMessages();
    messages.value = response.messages;
    // needReaction.value = response.needReaction;
    // messagesLoaded.value = messages.value.length;
    // lastIntersectingValue.value = true;

    // Echo.join('imbox')
    //   .listen('Update', (e) => {   
    //     updateNotification(e.data,e.deal);
    //   })

    // let observer = new IntersectionObserver (
    //   (entries, observer) => {
    //     lastIntersectingValue.value = entries[0].isIntersecting;
    //   },
    //   {
    //     threshold: [0.75],
    //   }
    // );
    // if (loadMoreEl.value) {
    //   observer.observe(loadMoreEl.value);
    // }


    calcIsMobile();
    window.addEventListener('resize', calcIsMobile);

    // imboxStore.addedNotificationsReset();

  })

  // watch(needReaction, (newVal,oldVal) => {
  //   let sidebarOptions = {};
  //   sidebarOptions['imbox'] = sidebarOptions['imbox'] ? sidebarOptions['imbox'] : {};
  //   sidebarOptions['imbox']['super'] = newVal;
  //   // store.commit('setSidebarOptions', sidebarOptions);
  //   // emit('setNeedReaction', needReaction.value);
  // })


  onBeforeUnmount(() => {
    // store.activeRoom = props.modelValue.room;
  })

  onUnmounted(() => {
    // Echo.leave('imbox'); - не отписываемся, так как есть обработчик в app.vue для количества обновленных переписок в сайдбаре
  })

  const getMsgDate = (message) => {
    let result = '';
    if (!message.last_message) {
      return result;
    }
    // Дата и время
    let today = new Date(new Date().toDateString());
    let yesterday = new Date(new Date().toDateString()).setDate(today.getDate() - 1);
    let msgDate = new Date(new Date(message.last_message.created_at).toDateString());
    let dateStr = '';
    if (msgDate.getTime() == today.getTime()) {
      dateStr = 'сегодня';
    } else if (msgDate.getTime() == yesterday) {
      dateStr = 'вчера';
    } else {
      let options = {
        month: "long",
        day: "numeric",
      };
      if ( msgDate.getFullYear() != today.getFullYear() ) {
        options.year = "numeric"
      }
      dateStr = new Intl.DateTimeFormat("ru-RU", options).format(msgDate);
    }
    result += ` ${dateStr} в ${dateFormat(message.last_message.created_at, true)}`;
    return `${result}`;
  }

  const getMsgIcon = (type) => {
    switch(type) {
      case 'deal':
        return 'pi pi-dollar';
      case 'user': 
        return 'pi pi-user';
      case 'group':
        return 'pi pi-users';
    }
  }

  // const getMsgHeading = (message) => {
  //   let result = '';
  //   if (message.type == 'deal') {
  //     result += `${message.last_message.uid}`
  //   } else if (message.type == 'user') {
  //     result += `Чат с пользователем`
  //   } else if (message.type == 'group') {
  //     result += message.room;
  //   }

  //   return `${result}`;
  // }

  const getMsgContent = (message) => {
    let result = '';
    //  Автор для сообщения чата
    if (message.last_message) {
      if (message.last_message.user.id) {
          result += message.last_message.user && message.last_message.user.name;
      }
      result += `: ${message.last_message.text ? message.last_message.text : ''}`;    
    }
    return `
                  ${result}
          `;
  }

  // const openDeal = (deal_id) => {
  //   const deal = {
  //     id: deal_id,
  //     noCollapsed: true,
  //   }
  //   store.setNewModal({modalData: deal, modalTitle: 'deal'})
  // }

  const clickNotification = (message, index) => {
    emit('update:modelValue', {room: message.room, index: index, type: message.type, action: 'click', message: message});
    // if (index >= 0) {
    //   UserChatCreateRef.value && UserChatCreateRef.value.cleanSelected();
    // }
  }

  const setViewed = async (messageId) => {
    //!!! const response = await setImboxMessageViewed(messageId);  
  }

</script>

<template>
  <div
    id="imbox-notifications1"
    class="flex flex-col overflow-hidden grow"
  >
    <!-- <UserChatCreate
      @open-user-chat="openUserChat"
      ref="UserChatCreateRef"
    /> -->
    <ul v-if="loading">
      <li v-for="i in 7"
        class="flex justify-between items-start pt-[6px] pl-[6px] pb-[9px] pr-[12px] border border-solid border-[rgba(0,0,0,0.15)] dark:border-surface-200 lg:border-0 !z-[11]">
        <div class="mr-auto">
          <Skeleton width="9rem" class="my-1"/>
          <Skeleton width="15rem"/>
        </div>
        <div class="">
          <Skeleton width="6rem"/>
        </div>
      </li>
    </ul>

    <VirtualScroller 
      :items="messages" 
      :itemSize="55" 
      class="imbox-notifications-list relative h-full overflow-y-auto text-black dark:text-surface-0"
      pt:content:class="w-full"
    >
      <template v-slot:item="{ item, options }">
        <div 
          @click.stop = "clickNotification(item, index)"
          class="imbox-notifications-item -mb-[1px] relative lg:shadow-[inset_0_0_0_1px_var(--p-surface-300)] dark:lg:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)] cursor-pointer bg-surface-0 dark:bg-surface-700"
          :class="[item.room == modelValue.room ?
          isMobile ? '' : '!ring-4 !ring-inset !ring-surface-400 !z-[10]' : '',
          false && item.last_message && item.last_message.user.id == 42 && !item.last_message.is_viewed ?
            '!bg-[#d5d8ff]' : '',
          item.isNew ? 'imbox-notifications-item--highlight' : '']"
        >

          <div class="imbox-notifications-item__inner relative flex justify-between items-start pt-[6px] pl-[6px] pb-[9px] pr-[12px] border border-solid border-[rgba(0,0,0,0.15)] dark:border-surface-200 lg:border-0 !z-[11]">
            <div class="max-w-[calc(100%-110px)] mr-auto">
              <a
                class="imbox-message-header inline-flex items-center text-sm font-bold leading-[120%] text-ellipsis overflow-hidden hover:underline">
                <span :class="getMsgIcon(item.type)" class="mr-1"></span>
                <span>{{ item.title }}</span>
              </a>

              <div
                class="text-xs whitespace-nowrap text-ellipsis overflow-hidden"
                v-html="getMsgContent(item)">
              </div>
            </div>
            <div 
              class="flex flex-col items-end">
              <div class="text-xs mb-1"
                v-html="getMsgDate(item)">
              </div>
              <Button 
                v-if="item.last_message && item.last_message.user.id == 42 && !item.last_message.is_viewed"
                @click.stop="setViewed(item.last_message.id)"
                icon="pi pi-check-circle" 
                aria-label="Отметить прочитанным" 
                :pt="{ root: '!p-1 !w-auto rounded' }"
                :ptOptions="{ mergeProps: true }"
              />             
            </div>
          </div>          

        </div>
      </template>
    </VirtualScroller>

  </div>
</template>

<style scoped>
  .imbox-message-header {
    color: var(--p-highlight-color);
  }
  .imbox-message-header:hover {
    text-decoration: underline;
  }
  .imbox-notifications-item {
    position: relative;
  }
  .imbox-notifications-item__inner {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }
  .imbox-notifications-item::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: #B3E5FC;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  .imbox-notifications-item--highlight::before {
    opacity: 1;
  }
  .imbox-notifications-item--highlight .imbox-notifications-item__inner {
    opacity: 0.6;
  }
</style>
