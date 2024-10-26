<!-- src/views/Login.vue -->

<template>
  <div class="login">
    <div class="flex w-full">
      <img src="/assets/images/icon.png" alt="" class="w-1/2" />
    </div>
    <div class="flex flex-col w-full items-start">
      <p style="color: #004aad" class="text-2xl font-bold">Masuk ke Akun Anda!!</p>
      <p class="text-left">Selamat datang kembali! Masukkan Email dan Password Anda untuk melanjutkan</p>
    </div>
    <form @submit.prevent="handleLogin" class="w-full">
      <div class="w-full justify-start flex mb-3 mt-5">
        <input
          class="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          v-model="username"
          id="username"
          type="text"
          placeholder="Masukkan email Anda"
          required
        />
      </div>
      <div class="w-full justify-start flex mb-3">
        <input
          class="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          type="password"
          id="password"
          placeholder="Masukkan password Anda"
          v-model="password"
          required
        />
      </div>
      <div class="w-full">
        <button type="submit" class="w-full btn btn-primary">Login</button>
      </div>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/auth';
import axios from 'axios';

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter();
    const { login } = useAuth();
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const handleLogin = async () => {
      try {
        const response = (
          await axios.post('http://localhost:3000/api/users/login', {
            email: username.value,
            password: password.value,
          })
        ).data;

        localStorage.setItem('user', JSON.stringify({ username: response.username, loggedIn: true, role: response.role }));
        login(response); // Update the global isAuthenticated state
        router.push('/');
      } catch (error) {
        errorMessage.value = 'Invalid username or password';
      }
    };

    return {
      username,
      password,
      errorMessage,
      handleLogin,
    };
  },
});
</script>
  
  <style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 400px;
  margin: auto;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
  