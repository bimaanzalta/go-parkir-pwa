<template>
  <div class="max-w-md mx-auto mt-10 px-5">
    <div class="w-full flex flex-col items-start">
      <h2 class="text-2xl font-bold mb-3">Tambah Kendaraan</h2>
      <label for="select" class="block text-sm font-medium text-gray-700">Pilih Jenis Kendaraan</label>
      <select
        id="select"
        v-model="form.jenis"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <label for="plat_nomor" class="block text-sm font-medium text-gray-700 mt-2">Plat Kendaraan</label>
      <input v-model="form.plat_nomor" type="text" id="plat_nomor" class="mt-1 p-2 border rounded-md w-full" required />
      <label for="select-brand" class="block text-sm font-medium text-gray-700 mt-2">Pilih Brand Kendaraan</label>
      <select
        id="select-brand"
        v-model="form.brand"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
      >
        <option :value="'Yamaha'">Yamaha</option>
        <option :value="'Honda'">Honda</option>
      </select>
      <label for="model" class="block text-sm font-medium text-gray-700 mt-2">Pilih Model Kendaraan</label>
      <input v-model="form.model" type="text" id="model" class="mt-1 p-2 border rounded-md w-full" required />
      <label for="tahun" class="block text-sm font-medium text-gray-700 mt-2">Pilih Tahun Keluaran Kendaraan</label>
      <input v-model="form.tahun_keluaran" type="number" id="tahun" class="mt-1 p-2 border rounded-md w-full" required />
      <label for="color" class="block text-sm font-medium text-gray-700 mt-2">Pilih Warna Kendaraan</label>
      <select
        id="color"
        v-model="form.warna"
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
      >
        <option :value="'Hitam'">Hitam</option>
        <option :value="'Putih'">Putih</option>
        <option :value="'Biru'">Biru</option>
        <option :value="'Merah'">Merah</option>
      </select>
      <label for="nomormesin" class="block text-sm font-medium text-gray-700 mt-2">Nomor Mesin Kendaraan</label>
      <input v-model="form.nomor_mesin" type="number" id="nomormesin" class="mt-1 p-2 border rounded-md w-full" required />
      <label for="rangkamesin" class="block text-sm font-medium text-gray-700 mt-2">Nomor Rangka Kendaraan</label>
      <input v-model="form.rangka_kendaraan" type="number" id="rangkamesin" class="mt-1 p-2 border rounded-md w-full" required />
      <button class="btn btn-primary mt-1" @click="handleSubmit">Tambah Kendaraan</button>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  jenis: '',
  plat_nomor: '',
  brand: '',
  model: '',
  tahun_keluaran: '',
  warna: '',
  nomor_mesin: '',
  rangka_kendaraan: '',
  userId: 'dc73f656-b29f-4c93-b003-17972b2bd132',
});

const options = ref([
  { value: 'Sepeda Motor', label: 'Sepeda Motor' },
  { value: 'Mobil Roda Empat', label: 'Mobil Roda Empat' },
  { value: 'Mobil Roda Empat Satu Ton', label: 'Mobil Roda Empat Satu Ton' },
  { value: 'Mobil Roda Enam Ke Atas', label: 'Mobil Roda Enam Ke Atas' },
]);

const selectedOption = ref(options.value[0].value);
form.jenis = selectedOption.value;

const handleSubmit = async () => {
  // Check if all required fields are filled
  if (!form.plat_nomor || !form.brand || !form.model || !form.tahun_keluaran || !form.warna || !form.nomor_mesin || !form.rangka_kendaraan) {
    alert('Semua field yang diperlukan harus diisi!');
    return; // Stop submission if any required field is empty
  }

  try {
    // Call API if validation passes
    const response = await axios.post(`http://localhost:3000/api/kendaraan/create`, form);
    router.push('/detail-vehicle')
  } catch (apiError: any) {
    console.error('API Call Error:', apiError);
  }

  console.log(form);
  // Tambahkan logika pengiriman data ke server di sini
};
</script>
  
  <style scoped>
/* Anda dapat menambahkan styling tambahan di sini */
</style>
  