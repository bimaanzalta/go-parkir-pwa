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
          v-for="(trx, idx) in transactions"
          @click="router.push(`/detail-vehicle/${trx.id}`)"
        >
          <div class="flex flex-col justify-start">
            <p class="font-bold text-lg text-white p-0">{{ trx.jenis }}</p>
            <p class="font-light text-sm text-white p-0 text-left">{{ trx.plat_nomor }}</p>
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

const transactions: any = ref([]);

const hitApi = async () => {
  try {
    // Call API if validation passes
    const response = (await axios.get(`http://localhost:3000/api/transaksi/all`)).data;

    transactions.value = response;
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
      