<template>
  <div class="max-w-md mx-auto mt-10">
    <div class="w-full flex px-5">
      <h2 class="text-2xl font-bold mb-6">Kendaraan Saya</h2>
    </div>
    <div class="w-full flex flex-col justify-between">
      <ul class="px-5">
        <li
          class="my-3 px-3 py-2 w-full flex justify-between rounded-md items-center"
          style="background-color: #004aad"
          :key="idx"
          v-for="(vhc, idx) in vehicles"
          @click="router.push(`/detail-vehicle/${vhc.id}`)"
        >
          <div class="flex flex-col justify-start">
            <p class="font-bold text-lg text-white p-0">{{ vhc.jenis }}</p>
            <p class="font-light text-sm text-white p-0 text-left">{{ vhc.plat_nomor }}</p>
          </div>
          <img src="/assets/qrcode.png" class="w-10 h-10" alt="" />
        </li>
      </ul>
      <div class="w-full px-5">
        <button class="btn btn-primary w-full" @click="router.push('/add-vehicle')">Tambah Kendaraan Saya</button>
      </div>
    </div>
  </div>
</template>
    
    <script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();

const vehicles: any = ref([]);

const hitApi = async () => {
  try {
    // Call API if validation passes
    const response = (await axios.get(`http://localhost:3000/api/kendaraan/all/e72b3980-c37a-43b3-b348-d7297186de22`)).data;

    vehicles.value = [
      {
        id: 'bdfba909-9660-429e-bf84-21735b010e87',
        jenis: 'Mobil Roda Empat',
        plat_nomor: 'KB 1400 FJ',
        brand: 'Yamaha',
        model: 'Jupiter',
        tahun_keluaran: '2018',
        warna: 'biru',
        nomor_mesin: 'nasda1233',
        rangka_kendaraan: 'asdasd',
        kode_qr: 'rHLtiQpJLm',
        createdAt: '2024-10-25T18:21:51.913Z',
        updatedAt: '2024-10-25T18:21:51.913Z',
      },
    ];
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
    