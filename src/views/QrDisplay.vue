<!-- src/views/QrDisplay.vue -->

<template>
  <div class="qr-display h-screen">
    <h1 class="my-10">Kode QR Kendaraan Saya</h1>
    <!-- <qrcode-vue :value="value" :level="level" :render-as="renderAs" :background="background" :foreground="foreground" :image-settings="imageSettings" /> -->
     <img src="/assets/qrcode.png" class="mt-10" alt="">
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import QrcodeVue from 'qrcode.vue';
import type { Level, RenderAs, ImageSettings } from 'qrcode.vue';

const value = ref('qrcode');
const level = ref<Level>('M');
const renderAs = ref<RenderAs>('svg');
const background = ref('#ffffff');
const foreground = ref('#000000');
const margin = ref(0);
const imageSettings = ref<ImageSettings>({
  src: 'https://96a5-114-10-137-158.ngrok-free.app/aOA4QHu2aA',
  width: 50,
  height: 50,
  // x: 10,
  // y: 10,
  excavate: true,
});
</script>
  
  <style scoped>
.qr-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>
  