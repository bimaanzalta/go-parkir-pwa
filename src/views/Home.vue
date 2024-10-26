<!-- src/views/Home.vue -->

<template>
  <div class="home">
    <div class="w-full flex justify-between">
      <div class="flex">
        <div class="rounded-full h-10 w-10 bg-blue-700 mr-1"></div>
        <div class="flex flex-col items-start">
          <p class="font-light text-sm">Selamat Datang!</p>
          <p class="font-bold text-lg">{{ user.username }}</p>
        </div>
      </div>
      <img src="/assets/notif.svg" alt="" />
    </div>
    <div class="w-full rounded-md p-5 flex mt-3 justify-between items-center" style="background-color: #004aad">
      <div class="flex flex-col items-start">
        <p class="font-bold text-2xl text-white">Saldo Anda</p>
        <p class="font-light italic text-white">RP {{ user.saldo }}</p>
      </div>
      <img src="/assets/bg.png" alt="" />
    </div>
    <div class="w-full flex justify-between mt-5">
      <div class="w-1/4 flex flex-col items-center">
        <img src="/assets/plus.svg" class="w-8 h-8 mb-1" alt="" />
        <p class="text-xs">Isi Ulang Saldo</p>
      </div>
      <div class="w-1/4 flex flex-col items-center">
        <img src="/assets/pindah-saldo.svg" class="w-8 h-8 mb-1" alt="" />
        <p class="text-xs">Pindah Saldo</p>
      </div>
      <div class="w-1/4 flex flex-col items-center">
        <img src="/assets/minta-saldo.svg" class="w-8 h-8 mb-1" alt="" />
        <p class="text-xs">Minta Saldo</p>
      </div>
      <div class="w-1/4 flex flex-col items-center">
        <img src="/assets/aktivitas.svg" class="w-8 h-8 mb-1" alt="" />
        <p class="text-xs">Aktivitas</p>
      </div>
    </div>
    <div class="w-full flex justify-between mt-5">
      <div class="w-1/4 flex flex-col items-center" @click="router.push('/list-vehicle')">
        <img src="/assets/kendaraan-saya.svg" class="w-8 h-8 mb-1" alt="" />
        <p class="text-xs">Kendaraan Saya</p>
      </div>
      <div class="w-1/4 flex flex-col items-center">
        <img src="/assets/lokasi-parkir.svg" class="w-8 h-8 mb-1" alt="" />
        <p class="text-xs">Lokasi Parkir</p>
      </div>
      <div class="w-1/4 flex flex-col items-center">
        <img src="/assets/berita.svg" class="w-8 h-8 mb-1" alt="" />
        <p class="text-xs">Berita</p>
      </div>
      <div class="w-1/4 flex flex-col items-center">
        <img src="/assets/komplain.svg" class="w-8 h-8 mb-1" alt="" />
        <p class="text-xs">Pengaduan</p>
      </div>
    </div>
    <div class="w-full flex flex-col items-start rounded-md mt-5 p-5" style="background-color: #e6edf7">
      <p class="font-bold" style="color: #004aad">Informasi Penting</p>
      <p class="text-xs text-left">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/auth';
import axios from 'axios';

const router = useRouter();

const saldo = ref(0);

const user: any = ref(null);

user.value = useAuth().userData.value;

const hitApi = async () => {
  try {
    // Call API if validation passes
    const response = (
      await axios.get(`http://localhost:3000/api/users/${user.value.id}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
    ).data;

    user.value = response;
  } catch (apiError: any) {
    console.error('API Call Error:', apiError);
  }
};
onMounted(() => {
  hitApi();
});

defineComponent({
  name: 'Home',
});
</script>

<style scoped>
/* Full page content setup */
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  padding: 20px;
}
</style>
