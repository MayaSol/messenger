<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import throttle from "lodash.throttle";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import TopNav from "@/Components/TopNav.vue";
import { getRoomType } from "../utils/room-functions";

import Chat from "@/Components/Chat.vue";

const imboxActive = ref({
    room: "123",
    // room: 'group__456',
    title: "Armin",
});

onMounted(() => {
    console.log("[Home] onMounted");
});

// import GroupModal from "~/components/Common/GroupModal.vue";
import ptDialog from "@/assets/presets/custom/modalPreset.js";

import { useMainStore } from "@/stores/main.js";
const store = useMainStore();

const lastMessage = ref({});

import { useDialog } from "primevue/usedialog";

const dialog = useDialog();

const isMobile = ref(false);
const setIsMobile = () => {
    if (document.documentElement.clientWidth < 1024) {
        isMobile.value = true;
    } else {
        isMobile.value = false;
        store.isImboxMobileChatsOpen = false;
    }
};
const onResize = throttle(() => {
    setIsMobile();
});
</script>

<template>
    <AuthenticatedLayout>
        <section class="messenger absolute h-full w-full flex">
            <div class="flex flex-col max-w-[1000px] ml-auto mr-auto w-full">
                <div class="flex items-center min-h-[68px] pl-[32px] pr-[20px] text-surface-0 bg-accent-bg">
                    <div class="flex items-center">
                        <div
                            class="messenger-avatar w-[44px] h-[44px] flex items-center justify-center mr-[10px] bg-[#dfe9ea] text-[0px] leading-none rounded-full overflow-hidden"
                        >
                            <img
                                class="block w-[40px] h-[40px]"
                                src="images/user-avatar-default.svg"
                            />
                        </div>
                        <div>
                            <div class="text-white text-xl font-bold">
                                {{ imboxActive && imboxActive.title }}
                            </div>
                        </div>
                    </div>
                    <button class="ml-auto cursor-pointer">
                        <svg
                            viewBox="0 0 122.7082 110.09245"
                            width="25"
                            height="auto"
                        >
                            <title>Загрузить файл</title>
                            <path
                                fill="currentColor"
                                d="m 55.657745,11.105389 a 4.0941483,4.0941483 0 1 1 5.79,-5.7900005 L 114.12774,58.005389 A 30.77,30.77 0 0 1 70.387745,101.28539 L 7.1377451,38.055389 l -0.3,-0.33 c -4.21,-4.77 -6.58999998,-9.75 -6.81999998,-15 -0.23,-5.25 1.76999998,-10.62 6.33999998,-15.8900005 v 0 l 0.06,-0.07 v 0 l 0.15,-0.15 a 23.21,23.21 0 0 1 7.9999999,-5.3400002 18.84,18.84 0 0 1 9.15,-1.13 22.87,22.87 0 0 1 10.47,4.0000002 51.46,51.46 0 0 1 7.35,6.4300005 l 58.699995,58.68 a 13.05,13.05 0 0 1 0.09,18.34 l -0.09,0.09 a 13,13 0 0 1 -18.149995,0.24 l -0.27,-0.24 -50.52,-50.54 a 4.0941483,4.0941483 0 0 1 5.79,-5.79 l 50.67,50.65 a 4.89,4.89 0 0 0 6.67,-0.13 v 0 a 4.84,4.84 0 0 0 0,-6.83 l -58.67,-58.71 a 46,46 0 0 0 -6.17,-5.45 15,15 0 0 0 -6.83,-2.6200005 10.92,10.92 0 0 0 -5.25,0.64 15.28,15.28 0 0 0 -5.07,3.4200005 c -3.0599999,3.56 -4.3999999,6.91 -4.2599999,10.09 0.14,3.18 1.81,6.51 4.7899999,9.88 l 63.2,63.2 a 22.59,22.59 0 0 0 32.139995,-31.74 z"
                            />
                        </svg>
                    </button>
                </div>
                <Chat></Chat>
            </div>
        </section>
    </AuthenticatedLayout>
</template>


<style>
    .messenger {
        font-family: 'NimbusSans';
    }
</style>