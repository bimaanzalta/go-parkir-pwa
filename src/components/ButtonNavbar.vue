<!-- src/components/BottomNavbar.vue -->

<template>
  <nav class="bottom-navbar">
    <router-link v-for="link in links" :key="link.path" :to="link.path" class="nav-item">
      <span>{{ link.label }}</span>
    </router-link>
    <button v-if="isAuthenticated" @click="handleLogout" class="nav-item">Logout</button>
  </nav>
</template>
  
  <script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAuth } from '@/auth';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'BottomNavbar',
  setup() {
    const router = useRouter();
    const { isAuthenticated, userRole, logout } = useAuth();

    const links = computed(() => [
      { path: '/', label: 'Home' },
      ...(isAuthenticated.value && userRole.value !== 'Pengendara' ? [{ path: '/qr-scan', label: 'QR Scan' }] : []),
      ...(isAuthenticated.value && userRole.value === 'Pengendara' ? [{ path: '/qr-display', label: 'QR Kendaraan' }] : []),
      { path: isAuthenticated.value ? '/profile' : '/login', label: isAuthenticated.value ? 'Profile' : 'Login' },
    ]);

    const handleLogout = () => {
      logout();
      router.push('/login');
    };

    return {
      links,
      isAuthenticated,
      handleLogout,
    };
  },
});
</script>

<style scoped>
.bottom-navbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #004aad;
  padding: 15px 0;
  color: white;
}

.nav-item {
  color: white;
  text-align: center;
  font-size: 14px;
  text-decoration: none;
}
</style>