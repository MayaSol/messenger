<template>
    <div class="flex align-center mx-[4px]"
        >
        <div class="messenger-avatar relative w-[44px] h-[44px] flex items-center justify-center mr-[10px] bg-[#dfe9ea] text-[0px] leading-none rounded-full">
            <img class="block w-[40px] h-[40px]" src="images/user-avatar-default.svg">
            <div class="icon-phone absolute w-[19px] h-[26px] -right-[5px] -bottom-[5px]">
            <span aria-hidden="true" data-icon="ptt-status" class="">
                <svg viewBox="0 0 19 26" height="26" width="19" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 19 26">
                <title>ptt-status</title>
                <path fill="#FFFFFF" class="ptt-status-background" d="M9.217,24.401c-1.158,0-2.1-0.941-2.1-2.1v-2.366c-2.646-0.848-4.652-3.146-5.061-5.958L2.004,13.62 l-0.003-0.081c-0.021-0.559,0.182-1.088,0.571-1.492c0.39-0.404,0.939-0.637,1.507-0.637h0.3c0.254,0,0.498,0.044,0.724,0.125v-6.27 C5.103,2.913,7.016,1,9.367,1c2.352,0,4.265,1.913,4.265,4.265v6.271c0.226-0.081,0.469-0.125,0.723-0.125h0.3 c0.564,0,1.112,0.233,1.501,0.64s0.597,0.963,0.571,1.526c0,0.005,0.001,0.124-0.08,0.6c-0.47,2.703-2.459,4.917-5.029,5.748v2.378 c0,1.158-0.942,2.1-2.1,2.1H9.217V24.401z"></path>
                <path fill="currentColor" class="ptt-status-icon" d="M9.367,15.668c1.527,0,2.765-1.238,2.765-2.765V5.265c0-1.527-1.238-2.765-2.765-2.765 S6.603,3.738,6.603,5.265v7.638C6.603,14.43,7.84,15.668,9.367,15.668z M14.655,12.91h-0.3c-0.33,0-0.614,0.269-0.631,0.598 c0,0,0,0-0.059,0.285c-0.41,1.997-2.182,3.505-4.298,3.505c-2.126,0-3.904-1.521-4.304-3.531C5.008,13.49,5.008,13.49,5.008,13.49 c-0.016-0.319-0.299-0.579-0.629-0.579h-0.3c-0.33,0-0.591,0.258-0.579,0.573c0,0,0,0,0.04,0.278 c0.378,2.599,2.464,4.643,5.076,4.978v3.562c0,0.33,0.27,0.6,0.6,0.6h0.3c0.33,0,0.6-0.27,0.6-0.6V18.73 c2.557-0.33,4.613-2.286,5.051-4.809c0.057-0.328,0.061-0.411,0.061-0.411C15.243,13.18,14.985,12.91,14.655,12.91z"></path>
                </svg>
            </span>
            </div>                         
        </div>
        <button 
            aria-hidden="true" 
            data-icon="audio-play" 
            @click="playAudio($event)"
            class="audio-play flex items-center text-[rgb(111,129,113)] cursor-pointer"
        >
            <svg 
                v-if="!isPlaying"
                viewBox="0 0 34 34" height="34" width="34" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 34 34">
                <path fill="currentColor" d="M8.5,8.7c0-1.7,1.2-2.4,2.6-1.5l14.4,8.3c1.4,0.8,1.4,2.2,0,3l-14.4,8.3 c-1.4,0.8-2.6,0.2-2.6-1.5V8.7z"></path>
            </svg>

            <svg 
                v-if="isPlaying"
                viewBox="0 0 34 34" height="34" width="34" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 34 34">
                <path fill="currentColor" d="M9.2,25c0,0.5,0.4,1,0.9,1h3.6c0.5,0,0.9-0.4,0.9-1V9c0-0.5-0.4-0.9-0.9-0.9h-3.6 C9.7,8,9.2,8.4,9.2,9V25z M20.2,8c-0.5,0-1,0.4-1,0.9V25c0,0.5,0.4,1,1,1h3.6c0.5,0,1-0.4,1-1V9c0-0.5-0.4-0.9-1-0.9 C23.8,8,20.2,8,20.2,8z"></path>
            </svg>                            
        </button>                          
        <span class="flex items-center w-[200px] grow">
            <span class="waveform flex-grow" ref="waveFormRef"></span>
            <span class="timer absolute bottom-0 text-[rgba(0,0,0,0.6)]" ref="timerRef"></span>
        </span>
        
    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import WaveSurfer from 'wavesurfer.js'
const isPlaying = ref(false); // Проигрывется аудио сообщение
let wavesurferInstance = null;
const waveFormRef = ref(null);
const timerRef = ref(null);
const currentTime = ref(null);


const props = defineProps({
  message: {
    type: Object,
    default: () =>({})
  }
})

onMounted(() => {

  if (wavesurferInstance) {
    wavesurferInstance.destroy();
  }

  wavesurferInstance = WaveSurfer.create({
    container: waveFormRef.value,
    waveColor: '#b0ceae',
    progressColor: '#728977',
    url: props.message.file.url,
    height: 35,
    barWidth: 2,
    barGap: 1,
    barRadius: 2,    
  });    

  // Добавляем стили курсора в shadow dom
  wavesurferInstance.on('ready', () => {
    //
    //  Стили ползунка
    //
    // Находим Shadow Root контейнера
    const container = waveFormRef.value.querySelector('div');
    const shadowRoot = container.shadowRoot;

    // Создаём стиль и добавляем его в Shadow DOM
    const style = document.createElement('style');
    style.textContent = `
      :host .cursor {
        width: 12px !important;
        height: 12px !important;
        border-radius: 50% !important;
        background: #4fc3f7 !important;
        top: 50% !important;
        transform: translateY(-50%) translateX(0) !important;
        pointer-events: auto !important;
        cursor: pointer;
      }
    `;
    shadowRoot.appendChild(style);


    //
    // Перетаскивание ползунка
    //
    const waveFormContainer = wavesurferInstance.getWrapper();
    const cursor = waveFormContainer.querySelector('.cursor');

    let isPointerDown = ref(false);

    cursor.addEventListener('pointerdown',(e) => {
      console.log('[Chat.vue] pointerdown');
      isPointerDown.value = true;
      document.documentElement.removeEventListener('pointermove', pointerMove);
      document.documentElement.addEventListener('pointermove', pointerMove);
      document.documentElement.addEventListener("pointerup", pointerUp, {
        once: true,
      });
      setTimerUpdate(false);
    })    

    const pointerUp = (e) => {
      console.log('[Chat.vue] pointerUp');
      isPointerDown.value = false;
      document.documentElement.removeEventListener('pointermove', pointerMove);
      setTimerUpdate();
    }

    const pointerMove = (e) => {
      console.log('[Chat.vue] pointermove e.clientX, e.pageX',e.clientX, e.pageX);
      const box = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - box.left, box.width));
      console.log('[Chat.vue] updateTime newTime',((x / box.width)*100).toFixed(2) + '%');
      cursor.style.left = ((x / box.width)*100).toFixed(2) + '%';
      const duration = wavesurferInstance.getDuration();
      const currentDuration = (x / box.width)*duration;
      console.log('currentDuration ',currentDuration);
      timerRef.value.textContent = formatTime(currentDuration);
    }

    // Форматирование времени в MM:SS
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    //
    // Продолжительность записи
    //
    timerRef.value.textContent = formatTime(wavesurferInstance.getDuration());

    // Обновление таймера
    function updateTimer() {
        timerRef.value.textContent = formatTime(wavesurferInstance.getCurrentTime());
    }

    let updateTimerIntervalId;
    function setTimerUpdate(isActivate = true) {
      if (isActivate) {
        clearInterval(updateTimerIntervalId);
        updateTimerIntervalId = setInterval(updateTimer, 200);
      } else {
        clearInterval(updateTimerIntervalId);
      }
    }
    //
    setTimerUpdate();

  })    
})

const playAudio = async (event) => {
  const audioButton = event.target.closest('.audio-play');

  if (isPlaying.value) {
    console.log('isPlaying.value 1', isPlaying.value);
    wavesurferInstance.pause();
  } else {
    console.log('isPlaying.value 2', isPlaying.value);
    wavesurferInstance.play();
  }

  wavesurferInstance.on('play', () => {
    isPlaying.value = true;
  });

  wavesurferInstance.on('pause', () => {
    isPlaying.value = false;
  });

  wavesurferInstance.on('finish', () => {
    isPlaying.value = false;
  });  

}

</script>

<style>

</style>