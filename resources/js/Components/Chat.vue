<template>
  <div id="chat" ref="chatRef" class="chat__bg w-full h-[calc(100%-60px)] relative flex flex-col" :class="propClass">
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
      class="relative flex flex-col overflow-auto dark:bg-surface-950 h-[calc(100%-54px)]"
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
                class="chat__date-title font-bold text-[rgba(0,0,0,0.6)] dark:text-surface-100 bg-[#ffffff80]">
                <span class="mt-[2px]">{{ index }}</span>
              </div>
            </div>

            <template v-for="message in filteredMessages[index]" :key="message.id">

            <div
              class="chat__msg-wrapper flex px-3 mb-2 relative before:absolute before:inset-0 before:bg-[#B4D1E8] before:opacity-0 before:transition-opacity before:duration-500"
              :class="isMyMessage(message) ? 'justify-end' : 'justify-start'"
              :data-id="message.id">

              <div class="chat__msg-outer relative"
                :class="isMyMessage(message) ? 'pr-[7px]' : 'pl-[7px]'"                
              >
                <div class="chat__msg w-full chat-work__msg group relative overflow-hidden"
                    :class="[isMyMessage(message) ? 'chat-work__msg--me' : '',
                      message.file?.mime.includes('image') ? 'p-[3px]' : 'pt-[6px] pr-[7px] pb-[8px] pl-[9px]']"
                >
                  <!-- <a href="" class="chat-work__msg-user" v-if="message.user && !message.sameUser">
                    {{ message.user.name }}
                  </a> -->
                  <!-- Если это ответ на другое сообщение -->
                  <div v-if="message.reply_to && message.reply_to.id > 0"
                    class="pl-[10px] text-sm leading-[130%] border-l-2 border-solid border-[#fffff]">
                    {{ message.reply_to && message.reply_to.user.name }}
                    <div class="whitespace-nowrap text-ellipsis overflow-hidden"
                      @click="(event) => repliedMsgClick(event, message.reply_to)">
                      <div v-if="message.text" class="cursor-pointer">
                        {{ message.reply_to && message.reply_to.text }}
                      </div>
                      <div v-if="!message.reply_to.text && message.reply_to.file">Прикреплен файл</div>
                    </div>
                  </div>
                  <!-- Изображение -->
                  <div v-if="message.file && message.file.mime.includes('image')" ref='imagesWrappers'
                    :style="getImageStyle(message.file)" class="bg-[#eee]">
                    <a :data-lg-size="`${message.file.dimensions[0]}-${message.file.dimensions[1]}`"
                      class="gallery-item block w-full h-full cursor-pointer"
                      :data-thumb="message.file.thumb ? `${message.file.thumb}` : `${message.file.url}`"
                      :data-src="`${message.file.url}`" @click="galleryRef.launch($event, message.id)">
                      <img
                        :data-src="message.file.thumb ? `${message.file.thumb}` : `${message.file.url}`"
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
                    :target="['application/pdf', 'text/plain'].includes(message.file.mime) ? '_blank' : ''" v-if="message.file &&
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
                    <span>{{ message.text }}</span>
                    <span class="inline-flex">
                      <span class="w-[19px] invisible"></span>
                      <span class="invisible text-[11px]">{{ dateFormat(message.created_at, true) }}</span>
                    </span>
                  </span>
                  <div class="inline-flex absolute bottom-[5px] right-[5px] mt-1 text-[rgba(0,0,0,0.6)]">
                    <span 
                      class="chat-work__created text-[11px] text-right"
                      :class="message.file ? 'text-[#fff]' : ''"
                    >
                      {{ dateFormat(message.created_at, true) }}
                    </span>
                    <span 
                      class="ml-[3px]"
                      :class="message.is_viewed ? 'text-[#007BFC]' : ''"
                    >
                      <svg viewBox="0 0 16 11" height="11" width="16" preserveAspectRatio="xMidYMid meet" class="" fill="none">
                        <path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="currentColor"></path></svg>
                    </span>
                  </div>
                  <div @click="(e) => msgMenu(e, message)"
                    class="chat__msg-menu-icon absolute w-5 h-5 top-1 right-1 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 rounded"
                    :class="isMyMessage(message) ? 'bg-[#d9fdd3]' : 'bg-[#fff]'"
                  >
                    <i class="pi pi-chevron-down"></i>
                  </div>
                </div>
                <!-- Уголок -->
                <div 
                  v-if="!message.sameUser"
                  class="chat-message-angle absolute"
                  :class="[
                    isMyMessage(message) ? 'text-[#d9fdd3] top-0 right-0' : 'text-[#fff] top-0 left-0'
                  ]"
                >
                  <span aria-hidden="true" data-icon="tail-out" class="_amk7">
                    <svg 
                      v-if="isMyMessage(message)"
                      viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1"
                      x="0px" y="0px" enable-background="new 0 0 8 13">
                      <path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path>
                      <path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path>
                    </svg>
                    <svg v-else viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1"  x="0px" y="0px" enable-background="new 0 0 8 13">
                      <path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path>
                      <path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path>
                    </svg>
                  </span>
                </div>
              </div>


            </div>

            </template>
          </div>


        </template>

      </div>
    </div>

    <!-- Input -->
    <div class="w-full absolute bottom-0 z-[10]">
      <div class="flex mb-[10px] mx-[12px] rounded-md overflow-hidden">

        <div class="flex items-center w-full relative mr-[6px] bg-[#fff]">

          <!-- Уголок -->
          <div class="chat-message-angle absolute top-0 right-0 translate-x-full">
            <span aria-hidden="true" data-icon="tail-out" class="_amk7">
              <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1"
                x="0px" y="0px" enable-background="new 0 0 8 13">
                <path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path>
                <path fill="#fff" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path>
              </svg>
            </span>
          </div>

          <!--Смайлик-->
          <div class="chat-input-emoji ml-[12px] text-[0px] leading-[0] cursor-pointer">
            <button class="cursor-pointer" tabindex="0" data-tab="10" type="button" aria-label="Выбор выражений">
              <span aria-hidden="true" data-icon="expressions" class="">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 523.15625 523.23175"
                  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:svg="http://www.w3.org/2000/svg">
                  <path
                    style="display:inline;fill:#525252;stroke:#525252;stroke-width:12;stroke-dasharray:none;stroke-opacity:0.996826"
                    d="m 238.07857,516.51222 c -49.91232,-5.15838 -94.58665,-23.01107 -134.5,-53.74869 C 84.106441,447.76787 58.849193,419.62475 44.171465,396.56861 37.963591,386.81713 25.696184,361.66845 21.203213,349.48276 16.099153,335.6397 10.898697,315.17533 8.3918442,299.06861 5.2678951,278.997 5.2707863,244.10443 8.3980588,224.06861 17.119104,168.19457 41.120889,120.91721 81.024032,81.014073 103.06393,58.974174 122.27291,45.155701 149.07857,32.057292 c 25.26317,-12.34468 47.74012,-19.438259 75,-23.669511 18.68397,-2.9001066 53.97112,-3.1294283 72,-0.4679086 58.57508,8.6471686 108.84654,34.2396156 149.11938,75.9144446 19.72292,20.409523 33.57141,40.088603 45.90644,65.234293 12.24436,24.96087 19.40595,47.66157 23.66091,75 3.12039,20.04878 3.12039,54.95122 0,75 -4.25496,27.33843 -11.41655,50.03913 -23.66091,75 -13.21787,26.94541 -26.96166,46.04491 -48.97128,68.05454 -22.00963,22.00962 -41.10913,35.75341 -68.05454,48.97128 -25.13288,12.32874 -47.9503,19.51991 -74.79912,23.5738 -15.30192,2.31042 -47.3457,3.27591 -61.20088,1.84399 z m 55.97315,-26.57707 c 92.2718,-13.28938 168.01842,-81.3981 190.98076,-171.72325 5.17904,-20.37236 6.86906,-34.27165 6.8873,-56.64329 0.0182,-22.33818 -1.64621,-36.02686 -6.8873,-56.64329 C 464.19,122.9389 399.81153,58.591117 318.07857,38.050994 c -20.93252,-5.260505 -34.26278,-6.851486 -57,-6.803014 -22.52983,0.04803 -38.42485,2.062204 -58.5,7.412959 C 121.6677,60.226621 58.734964,123.85218 38.124658,204.92532 c -5.223766,20.54831 -6.899059,34.30295 -6.899059,56.64329 0,22.34034 1.675293,36.09498 6.899059,56.64329 20.605188,81.053 83.677402,144.81449 164.453912,166.25111 29.47961,7.82335 61.74583,9.75359 91.47315,5.47214 z m -59.97315,-64.2534 c -54.63123,-10.01673 -98.35708,-43.06161 -121.90236,-92.12509 -5.44255,-11.34115 -11.59764,-28.36568 -11.59764,-32.07823 0,-1.87185 3.20068,-1.90982 161,-1.90982 157.79932,0 161,0.038 161,1.90982 0,3.71228 -6.15498,20.73689 -11.60169,32.09018 -22.27397,46.42848 -63.12086,78.90967 -113.89831,90.5712 -10.60912,2.43649 -14.37609,2.79182 -32.5,3.06568 -16.57605,0.25048 -22.41412,-0.0412 -30.5,-1.52374 z m 54.6063,-26.09592 c 39.57697,-7.63109 73.15333,-31.31411 94.38654,-66.57535 1.92894,-3.20332 3.50716,-6.18819 3.50716,-6.63304 0,-0.44486 -56.25,-0.80883 -125,-0.80883 -68.75,0 -125,0.36397 -125,0.80883 0,0.44485 1.57822,3.42972 3.50716,6.63304 17.52993,29.11133 44.00041,50.77943 75.00724,61.39912 23.55983,8.06914 49.22586,9.87441 73.5919,5.17623 z M 165.51736,235.24166 c -12.19784,-3.39096 -19.72836,-14.2479 -18.70711,-26.97051 0.5775,-7.19446 2.38771,-11.25527 7.1324,-15.99996 12.38516,-12.38516 33.29203,-9.06737 41.05733,6.51555 4.62612,9.28343 3.18929,20.53438 -3.60869,28.25729 -6.62271,7.5238 -16.75273,10.73329 -25.87393,8.19763 z m 179.77871,0.24624 c -5.67847,-1.35344 -8.96836,-3.34768 -13.13982,-7.96499 -5.02672,-5.56397 -6.57768,-9.62568 -6.57768,-17.22584 0,-23.34721 27.75948,-34.34377 44.12548,-17.47972 9.68496,9.97969 8.90432,27.37183 -1.64429,36.63363 -6.3546,5.57942 -15.03018,7.88018 -22.76369,6.03692 z"
                    id="path237"/>
                </svg>
              </span>
            </button>
          </div>

          <!-- Текст сообщения -->
          <div
            class="chat-input grow px-[10px] pt-[14px] pb-[12px] text-sm leading-[18px] text-surface-700 dark:text-surface-0 cursor-pointer dark:bg-surface-600 bg-[#fff]"
            contenteditable="true" 
            @input="handleInput" 
            @keydown="() => console.log('keydown')"
            @keyup="() => console.log('keyup')" 
            @blur="console.log('blur')" 
            ref="chatInput">
            <span class="unicode text">&#x1F469;&#x200D;&#x1F4BB;</span>
            <!-- <audio class="hidden" ref="audiosRefs"></audio> -->

          </div>

          <!--Камера-->
          <div class="chat-input-camera mr-[12px] text-[0px] leading-[0] cursor-pointer">
            <button class="cursor-pointer" tabindex="0" data-tab="10" type="button" aria-label="Выбор выражений">
              <span aria-hidden="true" data-icon="expressions" class="">
                <svg width="20px" height="20px" viewBox="0 -2 32 32" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink">

                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Icon-Set-Filled" transform="translate(-258.000000, -467.000000)" fill="#7f7f7f">
                      <path
                        d="M286,471 L283,471 L282,469 C281.411,467.837 281.104,467 280,467 L268,467 C266.896,467 266.53,467.954 266,469 L265,471 L262,471 C259.791,471 258,472.791 258,475 L258,491 C258,493.209 259.791,495 262,495 L286,495 C288.209,495 290,493.209 290,491 L290,475 C290,472.791 288.209,471 286,471 Z M274,491 C269.582,491 266,487.418 266,483 C266,478.582 269.582,475 274,475 C278.418,475 282,478.582 282,483 C282,487.418 278.418,491 274,491 Z M274,477 C270.687,477 268,479.687 268,483 C268,486.313 270.687,489 274,489 C277.313,489 280,486.313 280,483 C280,479.687 277.313,477 274,477 L274,477 Z"
                        id="camera"></path>
                    </g>
                  </g>
                </svg>
              </span>
            </button>
          </div>            

        </div>

        <!-- Микрофон             -->
        <div class="vac-box-footer flex items-center justify-center w-[42px] h-[42px] shrink-0"
          :class="[{ 'vac-box-footer-border': !audioFiles.length }, { '!w-auto': isRecording }]">

          <div v-if="showAudio && !audioFiles.length" class="vac-icon-textarea-right h-full rounded-md">
            <template v-if="isRecording">
              <div class="vac-svg-button vac-icon-audio-stop cursor-pointer" @click="stopRecording">
                <svg viewBox="0 0 24 25" height="25" width="24" preserveAspectRatio="xMidYMid meet" class="x1n2onr6">
                  <path
                    d="M7 21.5C6.45 21.5 5.97917 21.3042 5.5875 20.9125C5.19583 20.5208 5 20.05 5 19.5V6.5C4.71667 6.5 4.47917 6.40417 4.2875 6.2125C4.09583 6.02083 4 5.78333 4 5.5C4 5.21667 4.09583 4.97917 4.2875 4.7875C4.47917 4.59583 4.71667 4.5 5 4.5H9C9 4.21667 9.09583 3.97917 9.2875 3.7875C9.47917 3.59583 9.71667 3.5 10 3.5H14C14.2833 3.5 14.5208 3.59583 14.7125 3.7875C14.9042 3.97917 15 4.21667 15 4.5H19C19.2833 4.5 19.5208 4.59583 19.7125 4.7875C19.9042 4.97917 20 5.21667 20 5.5C20 5.78333 19.9042 6.02083 19.7125 6.2125C19.5208 6.40417 19.2833 6.5 19 6.5V19.5C19 20.05 18.8042 20.5208 18.4125 20.9125C18.0208 21.3042 17.55 21.5 17 21.5H7ZM17 6.5H7V19.5H17V6.5ZM10 17.5C10.2833 17.5 10.5208 17.4042 10.7125 17.2125C10.9042 17.0208 11 16.7833 11 16.5V9.5C11 9.21667 10.9042 8.97917 10.7125 8.7875C10.5208 8.59583 10.2833 8.5 10 8.5C9.71667 8.5 9.47917 8.59583 9.2875 8.7875C9.09583 8.97917 9 9.21667 9 9.5V16.5C9 16.7833 9.09583 17.0208 9.2875 17.2125C9.47917 17.4042 9.71667 17.5 10 17.5ZM14 17.5C14.2833 17.5 14.5208 17.4042 14.7125 17.2125C14.9042 17.0208 15 16.7833 15 16.5V9.5C15 9.21667 14.9042 8.97917 14.7125 8.7875C14.5208 8.59583 14.2833 8.5 14 8.5C13.7167 8.5 13.4792 8.59583 13.2875 8.7875C13.0958 8.97917 13 9.21667 13 9.5V16.5C13 16.7833 13.0958 17.0208 13.2875 17.2125C13.4792 17.4042 13.7167 17.5 14 17.5Z"
                    fill="currentColor"></path>
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

          <button @click="toggleRecording"
            class="audio-record-start h-full flex items-center justify-center w-[42px] shriink-0 bg-accent-bg rounded-full cursor-pointer text-[#fff]"
            tabindex="0" data-tab="11" type="button" aria-label="Голосовое сообщение">

            <span v-if="!isRecording" aria-hidden="true" data-icon="mic-outlined" class="">
              <svg
                viewBox="0 0 24 24"
                width="24">
                <path
                  d="m 12,12 c 0.2833,0 0.5208,-0.0958 0.7125,-0.2875 C 12.9042,11.5208 13,11.2833 13,11 V 5 C 13,4.71667 12.9042,4.47917 12.7125,4.2875 12.5208,4.09583 12.2833,4 12,4 11.7167,4 11.4792,4.09583 11.2875,4.2875 11.0958,4.47917 11,4.71667 11,5 v 6 c 0,0.2833 0.0958,0.5208 0.2875,0.7125 C 11.4792,11.9042 11.7167,12 12,12 Z"
                  id="path481" fill="currentColor" />
                <path
                  d="m 12,21 c -0.5523,0 -1,-0.4477 -1,-1 V 17.925 C 9.26667,17.6917 7.83333,16.9167 6.7,15.6 5.78727,14.5396 5.24207,13.3387 5.06441,11.9973 4.9919,11.4498 5.44772,11 6,11 c 0.55228,0 0.98782,0.4518 1.0905,0.9945 0.18221,0.9629 0.63954,1.8105 1.372,2.543 C 9.4375,15.5125 10.6167,16 12,16 c 1.3833,0 2.5625,-0.4875 3.5375,-1.4625 0.7325,-0.7325 1.1898,-1.5801 1.372,-2.543 C 17.0122,11.4518 17.4477,11 18,11 c 0.5523,0 1.0081,0.4498 0.9356,0.9973 C 18.7579,13.3387 18.2127,14.5396 17.3,15.6 16.1667,16.9167 14.7333,17.6917 13,17.925 V 20 c 0,0.5523 -0.4477,1 -1,1 z"
                  id="path479" fill="currentColor"/>
                <path
                  d="M 12,14 C 11.1667,14 10.4583,13.7083 9.875,13.125 9.29167,12.5417 9,11.8333 9,11 V 5 C 9,4.16667 9.29167,3.45833 9.875,2.875 10.4583,2.29167 11.1667,2 12,2 12.8333,2 13.5417,2.29167 14.125,2.875 14.7083,3.45833 15,4.16667 15,5 v 6 c 0,0.8333 -0.2917,1.5417 -0.875,2.125 C 13.5417,13.7083 12.8333,14 12,14 Z"
                  id="path415" fill="currentColor"/>
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
            <div class="text-[15px] leading-[120%] text-[#42A5F5]">{{ activeMessage.user.name }}</div>
            <div class="overflow-hidden text-ellipsis">{{ activeMessage.text }}</div>
          </div>
        </div>
      </div>
    </div>

    <!--Upload File-->
    <CommonUploadFileForm :isShow="isShowFileForm" :uploadRoute="'/messages/upload'" :dealId="deal" :room="room"
      @close="closeFileForm" @filesUploaded="filesUploaded" ref="uploadFileFormRef"
      :selectedPhone="selectedUser && selectedUser.phone" />

  </div>
  <Menu ref="msgMenuElRef" id="overlay_menu" :model="msgMenuItems" :popup="true" />
  <CommonMediaGallery :groupMessages="filteredMessages" :apiBase="apiBase" ref="galleryRef" type="chat" />
</template>

<script setup>
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import AvatarGroup from "primevue/avatargroup";
import Avatar from "primevue/avatar";
import { ref, nextTick, onUpdated, onMounted, onUnmounted, computed, watch } from "vue";
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
//!!! import { fetchMessages, fetchDeal, createMessage, fetchFile  } from '@/services/api/chatWorkServices.js';
import { fetchMessages } from '@/services/chatService.js';
//!!! import { setImboxMessageViewed } from '@/services/api/commonServices.js';
import throttle from "lodash.throttle";
import { dateFormat } from '@/utils/date-functions.js';

import { useMainStore } from '@/stores/main.js';
const store = useMainStore();


const isMyMessage = (message) => {
  if (message.user && message.user.id && message.user.id === store.lists.me.id) {
    return true;
  } else {
    return false;
  }
}


//!!! WAVESURFER.JS
import WaveSurfer from 'wavesurfer.js'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.js';

const isRecording = ref(false); // Записывается аудио сообщение
const wavesurferInstance = ref(null);
const record = ref(null);

const startRecording = () => {
  isRecording.value = true;
}

const stopRecording = () => {
  isRecording.value = false;
}

const toggleRecording = () => {
  isRecording.value = !isRecording.value;
}
//!!!


//!!! новое аудио
// import { useAudioRecorder } from '@/utils/recorder.js';
// const isRecording = ref(true); // Записывается аудио сообщение

// const micFailed = () => {
//     isRecording.value = false;   
//     recorder = initRecorder()
// } 
// const initRecorder = () => {
//     isRecording.value = false

//     return useAudioRecorder({
//       bitRate: Number(128),
//       sampleRate: Number(new window.AudioContext().sampleRate),
//       beforeRecording: null,
//       afterRecording: null,
//       pauseRecording: null,
//       micFailed: micFailed
//     })
// } 

// const recorder = initRecorder();
// console.log('[Chat.vue] recorder ', recorder);

// const toggleRecorder = (recording) => {
//   isRecording.value = recording;
//   if (!recorder.isRecording.value) {
//     console.log('[Chat.vue] toggleRecorder 1 ');
//     setTimeout(() => recorder.start(), 200)
//   } else {
//     console.log('[Chat.vue] toggleRecorder 2 ');
//     try {
//       recorder.stop()
//       console.log('[Chat.vue] toggleRecorder record.stop', recorder, recorder.records.value );

//       const record = recorder.records[0];

//       console.log('[Chat.vue] toggleRecorder record', record );

//       //!!! this.files.push({
//       // 	blob: record.blob,
//       // 	name: `audio.${this.format}`,
//       // 	size: record.blob.size,
//       // 	duration: record.duration,
//       // 	type: record.blob.type,
//       // 	audio: true,
//       // 	localUrl: URL.createObjectURL(record.blob)
//       // })

//       recorder = initRecorder()
//       //!!! this.sendMessage()
//     } catch {
//       //!!! setTimeout(() => this.stopRecorder(), 100)
//     }
//   }      
// }
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

const props = defineProps({
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
const chunks = ref([]);
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


onMounted(async () => {

  // wavesurferInstance.value = WaveSurfer.create({
  //   container: '#waveform',
  //   waveColor: '#4F4A85',
  //   progressColor: '#383351',
  //   url: '/audio.mp3',
  // })

  // record = wavesurferInstance.registerPlugin(
  //   RecordPlugin.create({
  //     renderRecordedAudio: false,
  //     scrollingWaveform: false,
  //     continuousWaveform: true,
  //     continuousWaveformDuration: 30, // optional
  //   }),
  // )

  chatInput.value.addEventListener('input', () => {
    console.log('handle input - native tests');
  });

  //!!! const runtimeConfig = useRuntimeConfig();
  // apiBase.value = runtimeConfig.public.apiBase;

  // Получить id текущего пользовтаеля
  //!!! const currentUser = useSanctumUser();
  // me.value = currentUser.value;

  await nextTick();
  observer.value = new IntersectionObserver(
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

  chatBodyRef.value.addEventListener('scroll', throttle((event) => {
    for (let i = 0; i < messagesNotViewed.value.length; i++) {
      if (messagesNotViewed.value[i] < event.target.scrollTop + event.target.clientHeight) {
        messagesNotViewed.value.splice(i, 1);
        i--;
      } else {
        break;
      }
    }
  }, 300));

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
  console.log('[Chat] handleInput chatInput.value.textContent.trim()', chatInput.value.textContent.trim());
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
  async (newValue, oldValue) => {
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
  { immediate: true }
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
  { deep: true });


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
  for (let i = unprocessed.length - 1; i > -1; i--) {
    let image = unprocessed[i];
    if (image.dataset && image.dataset.src) {
      image.setAttribute('loading', 'lazy');
      image.setAttribute('src', image.dataset.src);
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
      lastLoadedIndex.value = messages.value.length - 1;
    }
    let prevLastLoadedIndex = lastLoadedIndex.value;
    for (let i = lastLoadedIndex.value; i > -1; i--) {
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
    let start = lastLoadedIndex.value == 0 ? 0 : lastLoadedIndex.value + 1;
    if (lastLoadedIndex.value == 0 && observer.value) {
      observer.value.unobserve(scrollObserverRef.value);
    }
    let lastMessages;
    lastMessages = messages.value.slice(start, prevLastLoadedIndex + 1);
    groupByDate(lastMessages);
  } else {
    groupMessages.value = {};
  }
};
const setObserver = async () => {
  await nextTick();
  if (scrollObserverRef.value && messages.value.length > 0) {
    console.log('[Chat.vue] setObserver 2 observer',observer.value);
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
  let width, height;
  if (imageFile.dimensions[0] >= imageFile.dimensions[1]) {
    width = 320;
  }
  else {
    width = 240;
  }
  height = imageFile.dimensions[1] / imageFile.dimensions[0] * width;
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
const repliedMsgClick = async (event, repliedMsg) => {

  let messageEl = document.querySelector(`[data-id="${repliedMsg.id}"]`);
  if (!messageEl && searchTerm.value) {
    searchTerm.value = null;
    searchRef.value = null;
  }
  await nextTick();
  messageEl = document.querySelector(`[data-id="${repliedMsg.id}"]`);
  chatBodyRef.value.scrollTop = scrollToSmoothly(messageEl.offsetTop - chatBodyRef.value.offsetHeight / 2, chatBodyRef.value.scrollTop, 500);

  messageEl.classList.remove(['before:!duration-1000']);
  messageEl.classList.add(['before:!opacity-100']);
  messageEl.addEventListener('transitionend', (event) => {
    messageEl.classList.add('before:!duration-[2000ms]');
    messageEl.classList.remove('before:!opacity-100');
  }, { once: true });

};
const msgMenu = (event, message) => {
  activeMessage.value = message;

  if (message.user_id !== store.lists.me.id) {
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
const drop = async (event) => {
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
  let activeMessageSaved = { ...activeMessage.value };
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

  let messageData = {
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
  if (chatBodyRef.value.scrollTop + chatBodyRef.value.clientHeight < messageEl.offsetTop + messageEl.clientHeight / 2) {
    messagesNotViewed.value.push(messageEl.offsetTop + messageEl.clientHeight / 2);
  }
}
const addMessage = async (message) => {
  let created_at_date = message.created_at.split("T")[0]; // Оставляем только дату
  //Если ответ, ищем и добавляем сообщение, на которое ответ
  if (message.reply_to > 0) {
    for (let key of Object.keys(groupMessages.value)) {
      let repliedMsg = groupMessages.value[key].find((msg) => msg.id === message.reply_to);
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
    acc.push({ ...messages[key], key: key });
    return acc;
  }, []);
  _groupMessages = groupArr.reduce((acc, cur) => {
    let date = cur['created_at'].split('T')[0]; // Оставляем только дату
    (acc[date] = acc[date] || []).push(cur);  // Если нет acc[date], то создаем пустой
    return acc;
  }, {});
  console.log('[Chat.vue] groupByDate _groupMessages: ', _groupMessages);
  for (let key of Object.keys(_groupMessages)) {
    _groupMessages[key].reduce((acc, cur) => {
      cur.sameUser = !!(cur.user_id && acc === cur.user_id);
      return cur.user_id;
    }, 0);
  }
  groupMessages.value = { ..._groupMessages, ...groupMessages.value };
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
    setTimeout(() => { loadingSearchDelayMin.value = false }, 600);
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
    selectedUser.value = { ...contact };
    addSelectedUsers();
  }
};
const openUserSelect = async () => {
  if (!isInputUserList.value) {
    isInputUserList.value = true;
  }
  isInputUserListShow.value = !isInputUserListShow.value;
  await nextTick();
  let ul = userSelectRef.value.$el.querySelector('ul');
  ul.focus();

  if (userList.value.length == 0) {
    userList.value = [
      {
        label: 'Контакты',
        code: 'contacts',
        items: [...contactList.value]
      },
    ]
    userListFiltered.value = userList.value;
  }

};


</script>

<style>

#chat {
  font-family: "NimbusSans";
}


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

.chat-input-camera:focus,
.chat-input-camera,
.chat-input-camera span:focus,
.chat-input-camera span,
.chat-input-camera svg:focus,
.chat-input-camera svg,
.chat-input-camera g:focus,
.chat-input-camera g,
.chat-input-camera button:focus,
.chat-input-camera button {
  outline: none;
}

.chat-input-emoji:focus,
.chat-input-emoji,
.chat-input-emoji span:focus,
.chat-input-emoji span,
.chat-input-emoji svg:focus,
.chat-input-emoji svg,
.chat-input-emoji g:focus,
.chat-input-emoji g,
.chat-input-emoji button:focus,
.chat-input-emoji button {
  outline: none;
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
.vac-icon-textarea-right .vac-wrapper {
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


/*!!!! TEST */

.main {
  position: relative;
  font-family: 'NimbusSans';
}

.main::before {
    z-index: 999;
    position: absolute;
    /* left: 0; 
    top: 0; */
    opacity: 0.4;
    /* content: url('../../../public/images/main_reference.jpg'); */
    /**right bottom */
    /* right: -102px;
    bottom: -78px; */
    top: -100px;
    left: -122px;
    /* bottom: 0;
    left: 0; */
    bottom: -82px;
    left: -124px;    
}

#chat * {
  color: '#ff0000' !important;
}


/*!!!! TEST */
</style>
