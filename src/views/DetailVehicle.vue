<template>
  <div class="max-w-md mx-auto mt-10">
    <div class="px-5">
      <div class="w-full flex">
        <h2 class="text-2xl font-bold mb-6">Detail Kendaraan Saya</h2>
      </div>
      <div class="w-full flex flex-col items-start mb-5">
        <p class="font-light text-sm">Jenis Kendaraan</p>
        <p class="font-bold" style="color: #004aad">Sepeda Motor</p>
      </div>
      <div class="w-full flex flex-col items-start mb-5">
        <p class="font-light text-sm">Plat No Kendaraan</p>
        <p class="font-bold" style="color: #004aad">KB 1400 FJ</p>
      </div>
      <div class="w-full flex flex-col items-start mb-5">
        <p class="font-light text-sm">Brand Kendaraan</p>
        <p class="font-bold" style="color: #004aad">Yamaha</p>
      </div>
      <div class="w-full flex flex-col items-start mb-5">
        <p class="font-light text-sm">Model Kendaraan</p>
        <p class="font-bold" style="color: #004aad">Jupiter Z</p>
      </div>
      <div class="w-full flex flex-col items-start mb-5">
        <p class="font-light text-sm">Tahun Keluaraan Kendaraan</p>
        <p class="font-bold" style="color: #004aad">2018</p>
      </div>
      <div class="w-full flex flex-col items-start mb-5">
        <p class="font-light text-sm">Warna Kendaraan</p>
        <p class="font-bold" style="color: #004aad">Biru</p>
      </div>
      <div class="w-full flex flex-col items-start mb-5">
        <p class="font-light text-sm">Nomor Mesin Kendaraan</p>
        <p class="font-bold" style="color: #004aad">KBR4R-3467891</p>
      </div>
      <div class="w-full flex flex-col items-start mb-5">
        <p class="font-light text-sm">Nomor Rangka Kendaraan</p>
        <p class="font-bold" style="color: #004aad">MB1JKME989657897</p>
      </div>
    </div>
  </div>
</template>
      
      <script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();

const transactions: any = ref([]);

const hitApi = async () => {
  try {
    // Call API if validation passes
    const response = (await axios.get(`http://localhost:3000/api/kendaraan/${route.params.id}`)).data;
  } catch (apiError: any) {
    console.error('API Call Error:', apiError);
  }
};

onMounted(() => {
  hitApi();
});
</script>
      
      <style scoped>
/* Anda dapat menambahkan styling tambahan di sini */
</style>
      