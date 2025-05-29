
<script setup>
import { computed, onBeforeMount, onMounted } from "vue";

import { useMainStore } from '@/stores/main.js';
const store = useMainStore();

const asideChatsStyle = computed(() => {
  if (store.isImboxMobileChatsOpen) {
    return {
      "max-width": `100%`,
      "transition-timing-function": 'cubic-bezier(0, 0, 0.2, 1)',
      opacity: '100',
    };
  } else {
    return {
      "transition-timing-function": 'cubic-bezier(0.4, 0, 1, 1)',
      opacity: '0',
    };
  }
});

onBeforeMount(() => {
  console.log('[AuthenticatedLayout] onBeforeMount');
  store.getLists();
})



</script>

<template>
    <div class="flex flex-col-reverse h-[100dvh] md:flex-row text-text-color">
        <div class="flex-auto relative h-[calc(100%-60px)] md:h-full z-[1]">
            <div class="flex h-full w-full">
                <main class="main relative flex-1 overflow-hidden m-0">
                    <slot />
                </main>

                <aside 
                    class="aside-chats max-w-[0] w-full transition-all duration-300 absolute top-0 right-0 bottom-0 flex items-center text-aside-base z-[100] lg:static bg-body-bg overflow-hidden border-l border-l-sidebar-border bg-white" :style="asideChatsStyle">
                    <div class="w-full h-full lg:border-l-[1px] border-aside-bg">
                        <div class="aside__inner h-full overflow-auto">
                            <slot name="chats"></slot>
                        </div>
                    </div>
                </aside>                 

            </div>
        </div>
    </div>
    <DynamicDialog/>
</template>