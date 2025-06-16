<template>
  <div id="chat" ref="chatRef" class="w-full relative grow flex flex-col h-section" :class="propClass">
    <div v-if="messagesNotViewed.length > 0" @click="scrollChatBody"
      class="unviewed absolute w-8 h-8 right-4 bottom-[50px] bg-[var(--p-surface-200)] hover:bg-[var(--p-surface-100)] rounded-full flex items-center justify-center z-[10] cursor-pointer transition-[background-color] transition-300">
      <i class="pi pi-chevron-down text-[var(--p-surface-500)]"></i>
      <i
        class="absolute flex items-center justify-center w-5 h-5 bg-emerald-500 rounded-full -right-1 -bottom-1 text-white text-sm">
        <span class="px-1">{{ messagesNotViewed.length }}</span>
      </i>
    </div>

    <!-- Messages -->
    <div ref="chatBodyRef" @dragover.prevent @dragenter.prevent @drop="drop($event)"
      class="chat__bg relative flex flex-col flex-1 overflow-auto dark:bg-surface-950 bg-[#F5F1EB]"
      :class="type == 'discussion' ? 'chat__bg--discussion' : ''">

      <div class="preloader w-full h-full relative px-[12px]"
        v-if="!isMounted || loadingSearchDelayMin || loadingSearch || loadingChat">
        <div class="flex justify-center">
          <Skeleton width="100px" height="28px" class="mt-[24px] mb-[10px] bg-[#ffffff]" />
        </div>
        <div class="flex">
          <Skeleton width="88px" height="69px" class="ml-auto mb-2 bg-[#ffffff]" />
        </div>
        <div class="flex">
          <Skeleton width="120px" height="40px" class="ml-auto mb-2 bg-[#ffffff]" />
        </div>
        <div class="flex">
          <Skeleton width="180px" height="69px" class="mr-auto mb-2 bg-[#ffffff]" />
        </div>
        <!-- <div class="absolute w-[80px] h-[80px] top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2">
          <div class="w-full h-full rounded-full border-8 border-[#e5e5e5] border-t-transparent animate-spin"></div>
        </div> -->
      </div>

      <!---->


      <!-- Input -->
      <div class="w-full absolute bottom-0 z-[10]">
        <div class="flex mb-[10px] mx-[12px] rounded-md overflow-hidden">
          <!-- <div class="chat-input relative flex grow mr-[6px] px-[10px] pt-[2px] items-center text-surface-700 dark:text-surface-0 cursor-pointer dark:bg-surface-600 bg-[#fff]" contenteditable="true"
              @input="handleInput"
              @keydown="() => console.log('keydown')" 
              @keyup="() => console.log('keyup')" 
              @blur="console.log('blur')"     
              @focus="() => {setTimeout(() => editable.focus(), 10);}"       
              ref="chatInput"                
            >           -->

          <!-- Текст сообщения -->
          <div
            class="chat-input relative grow mr-[6px] px-[10px] py-[12px] text-sm leading-[18px] text-surface-700 dark:text-surface-0 cursor-pointer dark:bg-surface-600 bg-[#fff]"
            contenteditable="true" @input="handleInput" @keydown="() => console.log('keydown')"
            @keyup="() => console.log('keyup')" @blur="console.log('blur')" ref="chatInput">


            <!-- Уголок -->
            <div class="chat-message-angle absolute top-0 right-0 translate-x-full">
              <span aria-hidden="true" data-icon="tail-out" class="_amk7">
                <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1"
                  x="0px" y="0px" enable-background="new 0 0 8 13">
                  <title>tail-out</title>
                  <path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path>
                  <path fill="#fff" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path>
                </svg>
              </span>
            </div>

            <!-- <audio class="hidden" ref="audiosRefs"></audio> -->

          </div>



          <!-- Микрофон             -->
          <div class="vac-box-footer flex items-center justify-center w-[42px] h-[42px] shrink-0"
            :class="[{ 'vac-box-footer-border': !audioFiles.length }, {  '!w-auto': isRecording}]">

            <div v-if="showAudio && !audioFiles.length" class="vac-icon-textarea-right h-full rounded-md">
              <template v-if="isRecording">
                <div class="vac-svg-button vac-icon-audio-stop cursor-pointer" @click="toggleRecorder(false)">
                  <svg viewBox="0 0 24 25" height="25" width="24" preserveAspectRatio="xMidYMid meet" class="x1n2onr6">
                    <path d="M7 21.5C6.45 21.5 5.97917 21.3042 5.5875 20.9125C5.19583 20.5208 5 20.05 5 19.5V6.5C4.71667 6.5 4.47917 6.40417 4.2875 6.2125C4.09583 6.02083 4 5.78333 4 5.5C4 5.21667 4.09583 4.97917 4.2875 4.7875C4.47917 4.59583 4.71667 4.5 5 4.5H9C9 4.21667 9.09583 3.97917 9.2875 3.7875C9.47917 3.59583 9.71667 3.5 10 3.5H14C14.2833 3.5 14.5208 3.59583 14.7125 3.7875C14.9042 3.97917 15 4.21667 15 4.5H19C19.2833 4.5 19.5208 4.59583 19.7125 4.7875C19.9042 4.97917 20 5.21667 20 5.5C20 5.78333 19.9042 6.02083 19.7125 6.2125C19.5208 6.40417 19.2833 6.5 19 6.5V19.5C19 20.05 18.8042 20.5208 18.4125 20.9125C18.0208 21.3042 17.55 21.5 17 21.5H7ZM17 6.5H7V19.5H17V6.5ZM10 17.5C10.2833 17.5 10.5208 17.4042 10.7125 17.2125C10.9042 17.0208 11 16.7833 11 16.5V9.5C11 9.21667 10.9042 8.97917 10.7125 8.7875C10.5208 8.59583 10.2833 8.5 10 8.5C9.71667 8.5 9.47917 8.59583 9.2875 8.7875C9.09583 8.97917 9 9.21667 9 9.5V16.5C9 16.7833 9.09583 17.0208 9.2875 17.2125C9.47917 17.4042 9.71667 17.5 10 17.5ZM14 17.5C14.2833 17.5 14.5208 17.4042 14.7125 17.2125C14.9042 17.0208 15 16.7833 15 16.5V9.5C15 9.21667 14.9042 8.97917 14.7125 8.7875C14.5208 8.59583 14.2833 8.5 14 8.5C13.7167 8.5 13.4792 8.59583 13.2875 8.7875C13.0958 8.97917 13 9.21667 13 9.5V16.5C13 16.7833 13.0958 17.0208 13.2875 17.2125C13.4792 17.4042 13.7167 17.5 14 17.5Z" fill="currentColor"></path>
                  </svg>
                </div>

                <div class="vac-dot-audio-record" />

                <div class="vac-dot-audio-record-time">
                  {{ recordedTime }}
                </div>

              </template>

              <div v-else class="vac-svg-button" @click="toggleRecorder(true)">
                <slot name="microphone-icon">
                  <svg-icon name="microphone" class="vac-icon-microphone" />
                </slot>
              </div>
            </div>

            <button @click="toggleRecorder(true)"
              class="audio-start-record h-full flex items-center justify-center w-[42px] shriink-0 bg-accent-bg rounded-full cursor-pointer"
              tabindex="0" data-tab="11" type="button" aria-label="Голосовое сообщение">

              <span v-if="!isRecording" aria-hidden="true" data-icon="mic-outlined" class="">
                <svg viewBox="0 0 24 24" width="24" preserveAspectRatio="xMidYMid meet" class="">
                  <path
                    d="M12 14C11.1667 14 10.4583 13.7083 9.875 13.125C9.29167 12.5417 9 11.8333 9 11V5C9 4.16667 9.29167 3.45833 9.875 2.875C10.4583 2.29167 11.1667 2 12 2C12.8333 2 13.5417 2.29167 14.125 2.875C14.7083 3.45833 15 4.16667 15 5V11C15 11.8333 14.7083 12.5417 14.125 13.125C13.5417 13.7083 12.8333 14 12 14ZM12 21C11.4477 21 11 20.5523 11 20V17.925C9.26667 17.6917 7.83333 16.9167 6.7 15.6C5.78727 14.5396 5.24207 13.3387 5.06441 11.9973C4.9919 11.4498 5.44772 11 6 11C6.55228 11 6.98782 11.4518 7.0905 11.9945C7.27271 12.9574 7.73004 13.805 8.4625 14.5375C9.4375 15.5125 10.6167 16 12 16C13.3833 16 14.5625 15.5125 15.5375 14.5375C16.27 13.805 16.7273 12.9574 16.9095 11.9945C17.0122 11.4518 17.4477 11 18 11C18.5523 11 19.0081 11.4498 18.9356 11.9973C18.7579 13.3387 18.2127 14.5396 17.3 15.6C16.1667 16.9167 14.7333 17.6917 13 17.925V20C13 20.5523 12.5523 21 12 21ZM12 12C12.2833 12 12.5208 11.9042 12.7125 11.7125C12.9042 11.5208 13 11.2833 13 11V5C13 4.71667 12.9042 4.47917 12.7125 4.2875C12.5208 4.09583 12.2833 4 12 4C11.7167 4 11.4792 4.09583 11.2875 4.2875C11.0958 4.47917 11 4.71667 11 5V11C11 11.2833 11.0958 11.5208 11.2875 11.7125C11.4792 11.9042 11.7167 12 12 12Z"
                    fill="#fff">
                  </path>
                </svg>
              </span>

              <span v-if="isRecording" aria-hidden="true" data-icon="mic-outlined" class="">
                <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class=""
                  fill="none">
                  <path
                    d="M5.4 19.425C5.06667 19.5583 4.75 19.5291 4.45 19.3375C4.15 19.1458 4 18.8666 4 18.5V14L12 12L4 9.99997V5.49997C4 5.1333 4.15 4.85414 4.45 4.66247C4.75 4.4708 5.06667 4.44164 5.4 4.57497L20.8 11.075C21.2167 11.2583 21.425 11.5666 21.425 12C21.425 12.4333 21.2167 12.7416 20.8 12.925L5.4 19.425Z"
                    fill="#fff"></path>
                </svg>
              </span>

            </button>

          </div>

        </div>
      </div>

      <!---->

      <div class="chat__scroll-observer h-4" ref="scrollObserverRef"></div>

      <div v-if="isMounted" v-show="!loadingSearchDelayMin && !loadingSearch && !loadingChat" ref="chatContent"
        class="chat__content relative py-2 flex flex-col grow">


        <div class="chat__date-title px-3 mx-auto text-surface-600 dark:text-surface-100 bg-[#ffffff80]" v-if="isEmpty">
          Нет сообщений
        </div>

        <template v-for="(data, index) in filteredMessages" :key="index">

          <div class="chat__day">
            <div
              class="chat__date sticky top-[10px] w-[84px] mx-auto mb-[10px] z-[10] rounded-md bg-[rgba(255,255,255,0.9)]">
              <div
                class="chat__date-title text-[rgba(0,0,0,0.6)] font-[NimbusSanLBol] dark:text-surface-100 bg-[#ffffff80]">
                <span class="mt-[2px]">{{ index }}</span>
              </div>
            </div>

            <template v-for="message in filteredMessages[index]" :key="message.id">

              <div
                class="chat__msg-wrapper flex px-3 mb-2 relative before:absolute before:inset-0 before:bg-[#B4D1E8] before:opacity-0 before:transition-opacity before:duration-500"
                :class="(message.user && message.user.id && message.user.id === store.lists.me.id) ? 'justify-end' : 'justify-start'"
                :data-id="message.id">
                <div class="chat__msg chat-work__msg group relative overflow-hidden" :class="
                    (message.user && message.user.id && message.user.id === store.lists.me.id) ? 'chat-work__msg--me' :
                    (message.user && message.user.id && message.user.id === 42) ? 'chat-work__msg--client' : ''
                  ">
                  <a href="" class="chat-work__msg-user" v-if="message.user && !message.sameUser">
                    {{ message.user.name }}
                    <!-- {{ message.user.id === 42 ? customer_name : message.user.name }} -->
                  </a>
                  <!--  -->
                  <div v-if="message.reply_to && message.reply_to.id > 0"
                    class="pl-[10px] text-sm leading-[130%] border-l-2 border-solid border-[#fffff]">
                    {{message.reply_to && message.reply_to.user.name}}
                    <div class="whitespace-nowrap text-ellipsis overflow-hidden"
                      @click="(event) => repliedMsgClick(event, message.reply_to)">
                      <div v-if="message.text" class="cursor-pointer">
                        {{message.reply_to && message.reply_to.text}}
                      </div>
                      <div v-if="!message.reply_to.text && message.reply_to.file">Прикреплен файл</div>
                    </div>
                  </div>
                  <!-- Изображение -->
                  <div v-if="message.file && message.file.mime.includes('image')" ref='imagesWrappers'
                    :style="getImageStyle(message.file)" class="bg-[#eee]">
                    <a :data-lg-size="`${message.file.dimensions[0]}-${message.file.dimensions[1]}`"
                      class="gallery-item block w-full h-full cursor-pointer"
                      :data-thumb="message.file.thumb ? `${apiBase}/chat/${message.file.thumb}` : `${apiBase}/chat/${message.file.url}`"
                      :data-src="`${apiBase}/chat/${message.file.url}`" @click="galleryRef.launch($event, message.id)">
                      <img
                        :data-src="message.file.thumb ? `${apiBase}/chat/${message.file.thumb}` : `${apiBase}/chat/${message.file.url}`"
                        alt="" ref="imagesRefs" class="w-full h-full object-cover" />
                    </a>
                  </div>
                  <!-- Аудио -->
                  <!-- <audio
                      controls
                      v-if="message.file && message.file.mime.includes('audio')"
                    >
                      <source
                        :src="`${apiBase}/chat/${message.file.url}`"
                        type="audio/mpeg"
                      />
                      Ваш браузер не поддерживает аудио элемент.
                    </audio> -->
                  <!-- Файлы pdf -->
                  <!-- <a`
                      class="flex"
                      :href="`${apiBase}/chat/${message.file.url}`"
                      :target="'_blank'"
                      v-if="
                        message.file &&
                        message.file.mime == 'application/pdf'
                      "
                    >
                      <img width="80" height="80"
                        :src="`/images/filetypes/${getFileTypeIcon(message.file.name)}`"
                        alt="file"
                      >

                      <span class="font-semibold pl-2 overflow-hidden break-words">
                        {{ message.file.name }}
                      </span>
                    </a>                       -->
                  <!-- Другие файлы -->
                  <a class="flex cursor-pointer relative" :href="`${apiBase}/chat/${message.file.url}`"
                    :target="['application/pdf','text/plain'].includes(message.file.mime) ? '_blank' : ''" v-if="message.file &&
                        !message.file.mime.includes('image') &&
                        !message.file.mime.includes('audio') && 
                        !message.file.mime.includes('video')">
                    <img width="80" height="80" :src="`/images/filetypes/${getFileTypeIcon(message.file.name)}`"
                      alt="file">
                    <span class="font-semibold pl-2 overflow-hidden break-words">
                      {{ message.file.name }}
                    </span>
                  </a>
                  <!-- Видео -->
                  <div v-if="message.file && message.file.mime.includes('video')">

                    <video width="280" controls preload="metadata">
                      <source :src="`${apiBase}/chat/${message.file.url}#t=0.1`" :type="message.file.mime">
                    </video>

                  </div>
                  <!--Текст-->
                  <span v-if="!message.file" class="break-words">
                    {{ message.text }}
                  </span>


                  <span class="text-sm mt-1 text-right chat-work__created">
                    {{ dateFormat(message.created_at, true) }}
                  </span>
                  <div @click="(e) => msgMenu(e,message)"
                    class=" chat__msg-menu-icon absolute w-5 h-5 top-1 right-1 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 rounded bg-[#d5d5d5]">
                    <i class="pi pi-chevron-down"></i>
                  </div>
                </div>
              </div>

            </template>
          </div>


        </template>

      </div>
    </div>

    <div v-if="showForm === 'reply'" class="entity-feed-form-wrapper z-50">
      <div class="entity-feed-form relative p-[10px] bg-white dark:bg-surface-600 rounded">
        <div @click="showForm = false; activeMessage = null;"
          class="group entity-feed-form__close absolute top-[5px] right-0 flex items-center justify-center w-6 h-6 text-[#92a3b4] rounded-full cursor-pointer">
          <svg width="20" height="20" class="text-[#92a3b4] group-hover:text-[#343f4a]">
            <use xlink:href="/images/sprite.svg#close" />
          </svg>
        </div>
        <div class="flex items-center">
          <i class="pi pi-reply mr-2 -scale-x-100 text-sm"></i>
          <div class="overflow-hidden">
            <div class="text-[15px] leading-[120%] text-[#42A5F5]">{{ activeMessage.user.name}}</div>
            <div class="overflow-hidden text-ellipsis">{{ activeMessage.text}}</div>
          </div>
        </div>
      </div>
    </div>

    <!--Upload File-->
    <CommonUploadFileForm :isShow="isShowFileForm" :uploadRoute="'/messages/upload'" :dealId="deal" :room="room"
      @close="closeFileForm" @filesUploaded="filesUploaded" ref="uploadFileFormRef"
      :selectedPhone="selectedUser && selectedUser.phone" />


    <!-- Listbox -->
    <Listbox v-if="isInputUserList" v-show="isInputUserListShow" v-model="selectedUser" @update:modelValue="selectUser"
      ref="userSelectRef" pt:root:class="absolute w-full bottom-[43px] z-20 rounded-none"
      :ptOptions="{mergeProps: true}" optionLabel="name" optionGroupLabel="label" optionGroupChildren="items"
      :options="userListFiltered" @blur="userListBlur" @keydown.enter.exact.prevent="addSelectedUsers">
      <template #footer="slotProps">
        <div class="flex align-items-center">
          <button class="w-full py-1 px-2 bg-slate-400 text-white" @click="removeSelectedUsers">
            Очистить
          </button>
        </div>
      </template>
    </Listbox>
  </div>
  <Menu ref="msgMenuElRef" id="overlay_menu" :model="msgMenuItems" :popup="true" />
  <CommonMediaGallery :groupMessages="filteredMessages" :apiBase="apiBase" ref="galleryRef" type="chat" />
</template>

<script setup>
  import InputText from "primevue/inputtext";
  import Textarea from "primevue/textarea";
  import AvatarGroup from "primevue/avatargroup";
  import Avatar from "primevue/avatar";
  import { ref, nextTick, onUpdated, onMounted, onUnmounted, computed, watch  } from "vue";
  import EmojiPicker from 'vue3-emoji-picker';
  import 'vue3-emoji-picker/css';
  //!!! import { fetchMessages, fetchDeal, createMessage, fetchFile  } from '@/services/api/chatWorkServices.js';
  import { fetchMessages  } from '@/services/chatService.js';
  //!!! import { setImboxMessageViewed } from '@/services/api/commonServices.js';
  import throttle from "lodash.throttle";
  import { dateFormat } from '@/utils/date-functions.js';
  
  import { useMainStore } from '@/stores/main.js';
  const store = useMainStore();


  //!!! новое аудио
  import { useAudioRecorder } from '@/utils/recorder.js';
  const isRecording = ref(true); // Записывается аудио сообщение

  const micFailed = () => {
      isRecording.value = false;   
      recorder = initRecorder()
  } 
  const initRecorder = () => {
      isRecording.value = false

      return useAudioRecorder({
        bitRate: Number(128),
        sampleRate: Number(new window.AudioContext().sampleRate),
        beforeRecording: null,
        afterRecording: null,
        pauseRecording: null,
        micFailed: micFailed
      })
  } 

  const recorder = initRecorder();
  console.log('[Chat.vue] recorder ', recorder);
  
  const toggleRecorder = (recording) => {
    isRecording.value = recording;
    if (!recorder.isRecording.value) {
      console.log('[Chat.vue] toggleRecorder 1 ');
      setTimeout(() => recorder.start(), 200)
    } else {
      console.log('[Chat.vue] toggleRecorder 2 ');
      try {
        recorder.stop()
        console.log('[Chat.vue] toggleRecorder record.stop', recorder, recorder.records.value );

        const record = recorder.records[0];

        console.log('[Chat.vue] toggleRecorder record', record );

        //!!! this.files.push({
        // 	blob: record.blob,
        // 	name: `audio.${this.format}`,
        // 	size: record.blob.size,
        // 	duration: record.duration,
        // 	type: record.blob.type,
        // 	audio: true,
        // 	localUrl: URL.createObjectURL(record.blob)
        // })

        recorder = initRecorder()
        //!!! this.sendMessage()
      } catch {
        //!!! setTimeout(() => this.stopRecorder(), 100)
      }
    }      
  }
  //!!!

  const ptDialog = {
    root: ({ state }) => ({
      class: [
        // Shape
        "rounded-lg",
        "shadow-lg",
        "border-0",

        // Size
        "max-h-[90vh]",
        "w-[50vw]",
        "min-w-[320px]",
        "md:min-w-[600px]",
        "max-w-[1000px]",
        "m-0",

        // Color
        "dark:border",
        "dark:border-surface-700",

        // Transitions
        "transform",
        "scale-100",

        // Maximized State
        {
          "transition-none": state.maximized,
          "transform-none": state.maximized,
          "!w-screen": state.maximized,
          "!h-screen": state.maximized,
          "!max-h-full": state.maximized,
          "!top-0": state.maximized,
          "!left-0": state.maximized,
        },
      ],
    }),
    header: {
      class: [
        // Flexbox and Alignment
        "flex items-center justify-between",
        "shrink-0",

        // Spacing
        "py-4 px-6",

        // Shape
        "border-t-0",
        "rounded-tl-lg",
        "rounded-tr-lg",

        // Colors
        "bg-surface-0 dark:bg-surface-800",
        "text-surface-700 dark:text-surface-0/80",
      ],
    },
    mask: {
      class: [
        "transition-all",
        "duration-300",
        "backdrop-blur-none",
        "bg-[#00000066]",
      ],
    },
  };

  const props = defineProps( {
    type: String,
    deal: String,
    room: String,
    isUnreadOpenTab: Boolean, // Пришло сообщение на открытую вкладку
    contacts: { type: Array, default: null },
    propClass: String,
    isActive: Boolean,
  });

  const emit = defineEmits(['last-message']);

  const newMessage = ref("");
  const messages = ref([]); // Только для загрузки сообщений первый раз после открытия чата, новые добавляются к существующему набору
  const groupMessages = ref({}); // Все сообщения, сгруппированные по дате, сюда добавляем новые из сокета
  const users = ref([]); // Активные пользователи в чате
  const file = ref(null);
  const showAudio = ref(true);
  const mediaRecorder = ref(null);
  const chunks =  ref([]);
  const audio = ref(null);
  const searchTerm = ref("");
  const showForm = ref(false);
  const activeMessage = ref(null);
  const msgMenuItems = ref([
    {
      label: 'Ответить',
      command: (e) => {
                  showForm.value = 'reply';
                  document.querySelector(messageInputSelector).focus();
              }
    }
  ]); //Массив для контекстного меню сообщения
  const isMounted = ref(false);
  const isEmpty = ref(false);
  // const subscriptionId = ref(null);
  const loadingSearch = ref(false);
  const loadingSearchDelay = ref(null);
  const loadingSearchDelayMin = ref(null);
  const messageInputSelector = '#message-input';
  // messageInputRows: 1,
  const msgQueue = ref([]);
  const isMsgQueueSending = ref(false);
  const contactActiveId = ref(null);
  const roomPrev = ref(null);
  const contactList = ref([]);
  // roomInner: null, // Использовать вместо room внутри компонента
  const loadingChat = ref(false);
  const isInputUserList = ref(false);
  const isInputUserListShow = ref(false);
  const userList = ref([]);
  const userListFiltered = ref([]);
  const selectedUser = ref(null);
  // selectedUsersAll: [],
  const isShowFileForm = ref(false);
  const observer = ref(null);
  const lastLoadedIndex = ref(null);
  const firstDayEl = ref(null);
  const firstLoad = ref(true);
  // const $api = useNuxtApp();
  const apiBase = ref('');

  const scrollObserverRef = ref(null);
  const chatBodyRef = ref(null);
  const chatRef = ref(null);
  const galleryRef = ref(null);
  const uploadFileFormRef = ref(null);
  const userInputRef = ref(null);
  const newMessageTextareaRef = ref(null);
  const audiosRefs = ref(null);
  const imagesRefs = ref(null);
  const searchRef = ref(null);
  const userSelectRef = ref(null);
  const msgMenuElRef = ref(null);

  const messagesNotViewed = ref([]);

  onUpdated(async () => {
    await nextTick();
    processImages();
  });

  //!!! test
  const chatInput = ref(null);

  const audioFiles = ref([]);

  //!!!





  onMounted( async () => {
    chatInput.value.addEventListener('input', () => {
      console.log('handle input - native tests');
    });

    //!!! const runtimeConfig = useRuntimeConfig();
    // apiBase.value = runtimeConfig.public.apiBase;

    // Получить id текущего пользовтаеля
    //!!! const currentUser = useSanctumUser();
    // me.value = currentUser.value;

    await nextTick();
    observer.value = new IntersectionObserver (
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
              firstDayEl.value = chatBodyRef.value.querySelector('.chat__day');
              getPortion();
          }
        });
      },
      {
        threshold: [1],
      }
    );
    // recalcUserInput();

    chatBodyRef.value.addEventListener('scroll',throttle((event) => {
      for (let i = 0; i < messagesNotViewed.value.length; i++) {
        if (messagesNotViewed.value[i] < event.target.scrollTop + event.target.clientHeight) {
          messagesNotViewed.value.splice(i, 1);
          i--;
        } else {
          break;
        }
      }      
    },300));   

  });

  onUnmounted(() => {
    //!!!useSanctumUser().value Echo.leave(`chat.${props.room}`);
  });

  const filteredMessages = computed(() => {
    if (!searchTerm.value) {
      loadingSearch.value = false;
      return groupMessages.value;
    }
    if (contactActiveId.value) {

    }
    let result = {};
    for (let key of Object.keys(groupMessages.value)) {
        let array = groupMessages.value[key];
        array = array.filter((message) => {
          return message.text && message.text.toLowerCase().includes(searchTerm.value.toLowerCase())
          })
        if (array.length > 0) {
          result[key] = array;
        }
    }
    loadingSearch.value = false;
    return result;
  });

  const isInputEmpty = ref(true);

  const handleInput = () => {
    console.log('[Chat] handleInput chatInput.value.textContent.trim()',chatInput.value.textContent.trim());
    isInputEmpty.value = chatInput.value.textContent.trim() == "";
  };   

  const getContacts = async () => {
    //!!! if (!props.contacts && ( props.type == 'deal' || (props.room && props.room.includes('deal')) ) ) {
    //   let deal = props.deal ? props.deal : props.room.split('__')[1];
    //   const response = await fetchDeal(deal);
    //   if (response.success) {
    //     contactList.value = response.deal.contacts;
    //   }
    // }
  };  

  watch(() => props.isActive, async (newValue) => {
    if (newValue) {
      await nextTick();
      // recalcUserInput();
      scrollChatBody();
    }
  })  

  watch(() => props.room, 
    async (newValue, oldValue) =>  {
      // props room обновился
      loadingChat.value = true;
      //Список контактов
      if (props.contacts) {
        contactList.value = props.contacts;
      }
      // Нет списка контактов
      await getContacts();
      //Активный контакт из room
      // let roomParams = newValue && newValue.split('__');
      // в room есть контакт - обновить активный контакт
      // if (contactList.value && contactList.value.length > 0 && roomParams && roomParams.length > 2) {
      //   let activePhone = roomParams && roomParams[2];
      //   let contactActive = contactList.value.find((contact) =>
      //     {
      //       return contact.phone == activePhone;
      //     });
      //   if (contactActive) {
      //     contactActiveId.value = contactActive.id;
      //   }
      // }
      // Нет активного контакта
      // if (contactList.value && contactList.value.length > 0 && !contactActiveId.value) {
      //   contactActiveId.value = contactList.value[0].id;
      // }
      //
      if (roomPrev.value) {
        Echo.leave(`chat.${roomPrev.value}`);
      }
      getMessages();
      webSocketsSetup();

      loadingChat.value = false;
    },
    {immediate: true}
  ),
    
  watch(filteredMessages, async () => {
    await nextTick();
    if (firstDayEl.value) {
      chatBodyRef.value.scrollTop = firstDayEl.value.offsetTop;
      firstDayEl.value = null;
    }
    if (firstLoad.value) {
      scrollChatBody();
      firstLoad.value = false;
    }
    processImages();
  });


  watch(messages, async (value) => {
      lastLoadedIndex.value = null;
      getPortion(value);
      scrollChatBody();
      await nextTick();
      setObserver();
    },
    { deep: true });


  watch(groupMessages, (value) => {
      if (!isObjectEmpty(value) && isEmpty.value) {
        isEmpty.value = false;
      }
    },
    {deep: true});


  watch(props.isUnreadOpenTab, (value) => {
    if (value) {
      chatRef.value.addEventListener('mousemove', async () => {
        // Запрос обнуляет счетчик непрочитанных
        //!!! const response = await fetchMessages(props.room);      
       
      }, { once: true });
    }
  });


  watch(props.contacts, (value) => {
      contactList.value = value;
    },
    { deep: true }
  );

    const processImages = async () => {
      await nextTick();
      if (!imagesRefs.value) {
        return;
      }
      let unprocessed = imagesRefs.value.filter((image) => image.dataset && image.dataset.src);
      let lastImageLoaded;
      let proms = [];
      for (let i=unprocessed.length-1; i>-1; i--) {
        let image = unprocessed[i];
        if (image.dataset && image.dataset.src) {
                image.setAttribute('loading','lazy');
                image.setAttribute('src',image.dataset.src);
                image.removeAttribute('data-src');
        }
      }      
    };
    const getMessages = async () => {
      loadingChat.value = true;

      const messagesData = await fetchMessages(props.room);
      if (messagesData.success) {
        if (messagesData.data.length !== 0) {
          messages.value = messagesData.data;
        } else {
          messages.value = [];
          isEmpty.value = true;
        }
        isMounted.value = true;
        loadingChat.value = false;    
        if (messages.value.length > 0 &&
            messages.value[messages.value.length - 1].phone
            ) {
          setSelectedUser(messages.value[messages.value.length - 1].phone);
        }
        // Для чатов типа 'user' возвращаем последнее сообщение
        if (props.type == 'user' && messages.value.length > 0) {
          emit('last-message', messages.value[messages.value.length - 1]);
        }
      } else {
        console.log(messagesData.error);
        loadingChat.value = false;
      }
    };
    const webSocketsSetup = () => {    
      // Echo.join(`chat.${props.room}`)
      //   .here((hereUsers) => {
      //     users.value = hereUsers
      //   })
      //   .joining((user) => users.value.push(user))
      //   .leaving(
      //     (user) => (users.value = users.value.filter((u) => u.id !== user.id))
      //   )
      //   .error((error) => {
      //     console.error(error);
      //   })
      //   .listen("NewMessage", (e) => {
      //     addMessage(e.message);
      //   })    
    }
    const setViewed = async (messageId) => {
        //!!! const respone = await setImboxMessageViewed(messageId);
    }
    // Подгружает предыдущие или последние 2 дня и добавляет к сообщениям
    const getPortion = async () => {
      if (messages.value.length > 0) {
        let dateChanged = 0;
        let prevDate = null;
        if (!lastLoadedIndex.value) {
          lastLoadedIndex.value = messages.value.length-1;
        }
        let prevLastLoadedIndex = lastLoadedIndex.value;
        for (let i=lastLoadedIndex.value; i>-1; i--) {
          let curDate = getDateString(messages.value[i].created_at);
          if (prevDate !== curDate) {
            prevDate = getDateString(messages.value[i].created_at);
            dateChanged += 1;
          }
          lastLoadedIndex.value = i;
          if (dateChanged > 2) { // подгрузить сообщения за 2 предыдуших дня
            break;
          }
        }
        let start = lastLoadedIndex.value == 0 ? 0 : lastLoadedIndex.value+1;
        if (lastLoadedIndex.value == 0 && observer.value) {
          observer.value.unobserve(scrollObserverRef.value);
        }
        let lastMessages;
        lastMessages = messages.value.slice(start,prevLastLoadedIndex+1);
        groupByDate(lastMessages);
      } else {
        groupMessages.value = {};
      }
    };
    const setObserver = async () => {
      await nextTick();
      if (scrollObserverRef.value && messages.value.length > 0) {
          observer.value.observe(scrollObserverRef.value);
      }    
    };
    const getFileTypeIcon = (filename) => {
      let extension = filename.split('.').pop();
      switch (extension) {
        case 'pdf':
          return 'pdf.svg';
        case 'doc':
        case 'docx':
          return 'doc.svg';
        case 'xls':
        case 'xlsx':
          return 'xls.svg';
        case 'txt':

          return 'txt.svg';
        case 'zip':
        case 'rar':
        case '7z':
          return 'zip.svg';
        case 'mp3':
        case 'wav':
        case 'ogg':
          return 'audio.svg';
        case 'mp4':
        case 'mov':
        case 'avi':
          return 'video.svg';
        default:
          return 'file.svg';
      }
    };
    const getImageStyle = (imageFile) => {
      let width,height;
      if (imageFile.dimensions[0] >= imageFile.dimensions[1]) {
        width = 320;
      }
      else {
        width = 240;
      }
      height = imageFile.dimensions[1]/imageFile.dimensions[0] * width;
      return `width: ${width}px; height: ${height}px;`;
    };
    const getRepliedMsg = (id) => {
      let info = {};
      info = messages.value.find((msg) => {
        return msg.id === id
      });
      return info;

    };
    const scrollToSmoothly = (pos, currentPos, time) => {
      var start = null;
          if (time == null) time = 500;
          pos = +pos, time = +time;

          const step = (currentTime) => {
            start = !start ? currentTime : start;
            var progress = currentTime - start;

            if (currentPos < pos) {
              chatBodyRef.value.scrollTop = (pos - currentPos) * progress / time + currentPos;
            } else {
              chatBodyRef.value.scrollTop = currentPos - (currentPos - pos) * progress / time;
            }

            if (progress < time) {
              window.requestAnimationFrame(step);
            } else {
              chatBodyRef.value.scrollTop = pos;
            }
          }

          window.requestAnimationFrame(step);
    };
    const repliedMsgClick = async (event,repliedMsg) => {

        let messageEl = document.querySelector(`[data-id="${repliedMsg.id}"]`);
        if (!messageEl && searchTerm.value) {
         searchTerm.value = null;
          searchRef.value = null;
        }
        await nextTick();
        messageEl = document.querySelector(`[data-id="${repliedMsg.id}"]`);
        chatBodyRef.value.scrollTop = scrollToSmoothly(messageEl.offsetTop - chatBodyRef.value.offsetHeight / 2, chatBodyRef.value.scrollTop ,500);

              messageEl.classList.remove(['before:!duration-1000']);
              messageEl.classList.add(['before:!opacity-100']);
              messageEl.addEventListener('transitionend',(event) => {
                messageEl.classList.add('before:!duration-[2000ms]');
                messageEl.classList.remove('before:!opacity-100');
              },{once: true});

    };
    const msgMenu = (event,message) => {
      activeMessage.value = message;

      if (message.user_id !== store.lists.me.id){
        msgMenuItems.value = [
          {
            label: 'Ответить',
            command: (e) => {
              showForm.value = 'reply';
              document.querySelector(messageInputSelector).focus();
            }
          },
          {
            label: 'Отметить прочитанным',
            command: (e) => {
              setViewed(activeMessage.value.id);
            }
          }
        ]
      }
      else {
        msgMenuItems.value = [{
            label: 'Ответить',
            command: (e) => {
              showForm.value = 'reply';
              document.querySelector(messageInputSelector).focus();
            }
          }]
      }

      msgMenuElRef.value.toggle(event);
    };
    // Дату из строки
    const getDate = (date) => {
      return new Date(
        new Date(Date.parse(date)).toLocaleString("en-US", { timeZone: "UTC" })
      );
    };
    // Строку с датой без времени
    const getDateString = (date) => {
      return date.split("T")[0];
    };
    // const startRecording = () => {
    //   navigator.mediaDevices
    //     .getUserMedia({ audio: true })
    //     .then((stream) => {
    //       mediaRecorder.value = new MediaRecorder(stream);
    //       mediaRecorder.value.start();
    //       isRecording.value = true;

    //       mediaRecorder.value.ondataavailable = (e) => {
    //         chunks.value.push(e.data);
    //       };
    //     })
    //     .catch((err) => {
    //       console.log("Устройство не найдено:", err);
    //     });
    // };
    // const stopRecording = () => {
    //   if (!mediaRecorder.value) {
    //     console.log("Медиа-рекордер не инициализирован");
    //     return;
    //   }

    //   mediaRecorder.value.stop();
    //   isRecording.value = false;

    //   mediaRecorder.value.onstop = () => {
    //     let blob = new Blob(chunks.value, {
    //       type: "audio/ogg; codecs=opus",
    //     });
    //     audiosRefs.value.src = window.URL.createObjectURL(blob);

    //     // Создаем объект File из Blob
    //     file.value = new File([blob], "recording.ogg", {
    //       type: "audio/ogg; codecs=opus",
    //     });

    //     // Вызываем функцию uploadFile с созданным файлом
    //     uploadFile();
    //   };
    // };
    // Добавление файлов
    const openFileForm = () => {
      showForm.value = '';
      isShowFileForm.value = true;
    };
    const closeFileForm = () => {
      isShowFileForm.value = false;
    };
    const filesUploaded = () => {
      newMessage.value = "";
    };
    const drop = async(event) => {
      event.preventDefault();
      openFileForm();
      await nextTick();
      uploadFileFormRef.value.fileUploadComp.onDrop(event);
    };
    const paste = async (event) => {
      const files = (event.clipboardData || event.originalEvent.clipboardData).files;
      if (files.length > 0) {
        event.preventDefault();
        openFileForm();
        await nextTick();
        const dataTransfer = new DataTransfer();
        for (let key of Object.keys(files)) {
          dataTransfer.items.add(files[key]);
        }
        const fakeEvent = new DragEvent("drop", { dataTransfer });
        uploadFileFormRef.value.fileUploadComp.onFileSelect(fakeEvent);
      }
    };
    //
    const sendFromQueue = async () => {
      isMsgQueueSending.value = true;
      if (msgQueue.value.length > 0) {
        let curMsgSend = msgQueue.value[0];
        msgQueue.value.shift();
        await curMsgSend();
        sendFromQueue();
      } else {
        isMsgQueueSending.value = false;
      }
    };
    const sendMessage = () => {

      if (newMessage.value.length == 0) {
        return;
      }

      let message = newMessage.value;
      let activeMessageSaved = {...activeMessage.value};
      newMessage.value = "";
      activeMessage.value = null;
      showForm.value = null;
      document.getElementById("message-input").value = "";

      let recipient = null;
      if (selectedUser.value) {
        if (selectedUser.value.phone) {
          recipient = 42;
        }
        else {
          recipient = selectedUser.value.id;
        }
      }

      let messageData =  {
              room: props.room,
              text: message,
              reply_to: activeMessageSaved.id ? activeMessageSaved.id : 0,
              recipient: recipient,
              phone: selectedUser.value && selectedUser.value.phone ? selectedUser.value.phone : null
      };

      let send = async () => {

        //!!! let response = await createMessage(messageData);      
        // if (response.success) {
        //   activeMessageSaved = null;
        // }

      };
     msgQueue.value.push(send);
      if (!isMsgQueueSending.value) {
        sendFromQueue();
      }
    };
    const addNotViewed = async (message) => {
      await nextTick();
      let messageEl = document.querySelector(`[data-id='${message.id}']`);
      if (chatBodyRef.value.scrollTop + chatBodyRef.value.clientHeight < messageEl.offsetTop + messageEl.clientHeight/2) {
        messagesNotViewed.value.push(messageEl.offsetTop + messageEl.clientHeight/2);
      }
    }
    const addMessage = async (message) => {
        let created_at_date = message.created_at.split("T")[0]; // Оставляем только дату
         //Если ответ, ищем и добавляем сообщение, на которое ответ
        if (message.reply_to > 0) {
          for (let key of Object.keys(groupMessages.value)) {
            let repliedMsg = groupMessages.value[key].find((msg)=>msg.id === message.reply_to);
            if (repliedMsg) {
              message.reply_to = repliedMsg;
              break;
            }
          }
        }
        //  Добавляем в массив groupMessages за нужную дату
        if (!groupMessages.value[created_at_date]) {
          groupMessages.value[created_at_date] = [];
        }
        if (groupMessages.value[created_at_date].length > 0) {
          let lastMessage = groupMessages.value[created_at_date][groupMessages.value[created_at_date].length - 1];
          if (lastMessage.user_id === message.user_id) {
            message.sameUser = true;
          }
        }
        groupMessages.value[created_at_date].push(message);
        if (message.user.id == store.lists.me.id) {
          scrollChatBody();
        } else {
          await addNotViewed(message);
        }
    }
    const onSelectEmoji = (emoji) => {
      newMessage.value += emoji.i;
    };
  
    // Группирует аргумент по дате и добавляет к результату groupMessages
    const groupByDate = (messages) => {
      let _groupMessages = {};

      if (messages.length == 0) {
        return;
      }
      let groupArr = Object.keys(messages).reduce((acc, key) => {
        acc.push({...messages[key], key: key});
        return acc;
      }, []);
      _groupMessages = groupArr.reduce((acc, cur) => {
        let date = cur['created_at'].split('T')[0]; // Оставляем только дату
        (acc[date] = acc[date] || []).push(cur);  // Если нет acc[date], то создаем пустой
        return acc;
      }, {});
      for (let key of Object.keys(_groupMessages)) {
        _groupMessages[key].reduce((acc,cur) => {
          cur.sameUser = !!(cur.user_id && acc === cur.user_id);
          return cur.user_id;
        },0);

      }
      groupMessages.value = {..._groupMessages, ...groupMessages.value};
    };
    const scrollChatBody = async () => {
      await nextTick();
      if (chatBodyRef.value) {
        chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight;
      }
      if (document.documentElement.clientWidth > 1023) {
        let input = document.querySelector(messageInputSelector);
        if (input) {
          input.focus();
        }
      }
    };
    const isObjectEmpty = (obj) => {
      for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
          return false;
        }
      }
      return true;
    };
    const unsubscribe = () => {

      // axios
      //     .get(route('unsubscription',this.subscriptionId))
      //     .then(
      //       (response) => {
      //         this.$emit('unsubscribe',this.subscriptionId);
      //       },
      //       (error) => {
      //         console.log("Ошибка unsubscribe:", error);
      //       }
      //     );
    };
    const onInputSearch = (event) => {
      if (loadingSearchDelay.value) {
        clearTimeout(loadingSearchDelay.value);
      }
      loadingSearchDelay.value = setTimeout(() => {
      loadingSearch.value = true;

        searchTerm.value = event.target.value;

        loadingSearchDelayMin.value = true;
        setTimeout(() => {loadingSearchDelayMin.value = false},600);
      }, 1500);
    };
    const userListBlur = (event) => {
      let overlay = event.explicitOriginalTarget 
        && event.explicitOriginalTarget.nodeType == 1 
        && event.explicitOriginalTarget.closest('div[data-pc-name="listbox"]');
      if (event.explicitOriginalTarget && event.explicitOriginalTarget.nodeType == 1 && !overlay) {
        isInputUserListShow.value = false;
      }
    };
    // const recalcUserInput = () => {
    //   let userInput = userInputRef.value;
    //   let width = userInput.clientWidth;
    //   let textarea = newMessageTextareaRef.value.$el;
    //   textarea.style.textIndent = `${width + 2}px`;
    // };
    const addSelectedUsers = async () => {
      let userInput = userInputRef.value;
      userInput.innerText = selectedUser.value?.name ? `@ ${selectedUser.value.name}` : '';
      await nextTick();
      // recalcUserInput();
      isInputUserListShow.value = false;
    };
    const removeSelectedUsers = () => {
      // selectedUser.value = {};
      selectedUser.value = null;
      addSelectedUsers();
    };  
    const selectUser = (event) => {
      addSelectedUsers();
    };
    const setSelectedUser = (userPhone) => {
      let contact = contactList.value.find(item => item.phone == userPhone);
      if (contact) {
        selectedUser.value = {...contact};
        addSelectedUsers();
      }
    };
    const openUserSelect = async () =>  {
      if (!isInputUserList.value) {
        isInputUserList.value = true;
      }
      isInputUserListShow.value = !isInputUserListShow.value;
      await nextTick();
      let ul = userSelectRef.value.$el.querySelector('ul');
      ul.focus();

      if (userList.value.length == 0) {
        userList.value= [
          { label: 'Контакты',
            code: 'contacts',
            items: [...contactList.value]
          },
        ]
        userListFiltered.value = userList.value;
      }
      
    };


</script>

<style>
  .chat-input:focus-visible {
    outline: none;
  }
  .chat-input div:focus-visible {
    outline: none;
  }
  .lexical-rich-text-input {
    outline: none;
  }
  .lexical-rich-text-input div:focus-visible {
    outline: none;
  }
  .chat-input:empty:before {
    content: 'Введите сообщение';
    color: #888;
    pointer-events: none;
  }  


.vac-icon-textarea,
.vac-icon-textarea-right {
	display: flex;
	align-items: center;
}

.vac-icon-textarea svg,
.vac-icon-textarea-right svg,
.vac-icon-textarea .vac-wrapper,
.vac-icon-textarea-right .vac-wrapper {
		margin: 0 7px;
}


.vac-icon-textarea svg,
.vac-icon-textarea-right svg,
.vac-icon-textarea .vac-wrapper,
.vac-icon-textarea-right .vac-wrapper
 {
  margin: 0 7px;
}

	.vac-dot-audio-record {
		height: 15px;
		width: 15px;
		border-radius: 50%;
		background-color: '#0a0a0a';
		animation: vac-scaling 0.8s ease-in-out infinite alternate;

		@keyframes vac-scaling {
			0% {
				transform: scale(1);
				opacity: 0.4;
			}
			100% {
				transform: scale(1.1);
				opacity: 1;
			}
		}
	}

	.vac-dot-audio-record-time {
		font-size: 16px;
		color: '#0a0a0a';
		margin-left: 8px;
		width: 45px;
	}

  .vac-icon-audio-stop,
	.vac-icon-audio-confirm {
		min-height: 28px;
		min-width: 28px;
	}

  .vac-icon-audio-confirm svg,
  .vac-icon-audio-stop svg {
			min-height: 28px;
			min-width: 28px;    
  }

  	.vac-icon-audio-stop {
		margin-right: 20px;
	}

  .vac-icon-audio-stop #vac-icon-close-outline {
    fill: '#eb4034';
  }

	.vac-icon-audio-confirm {
		margin-right: 3px;
		margin-left: 12px;
	}

  .vac-icon-audio-confirm #vac-icon-checkmark {
    fill: '#eb4034';
  }

  .vac-dot-audio-record {
    background-color: red;
  }

  .vac-icon-textarea-right {
    background-color: white;
  }

</style>
