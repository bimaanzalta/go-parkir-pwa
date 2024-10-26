<!-- <template>
    <div
        class="main-section antialiased relative font-nunito text-sm font-normal"
        :class="[store.sidebar ? 'toggle-sidebar' : '', store.menu, store.layout, store.rtlClass]"
    >
        <component v-bind:is="mainLayout"></component>
    </div>
</template>

<script lang="ts" setup>
    import { computed } from 'vue';

    import appLayout from '@/layouts/app-layout.vue';
    import authLayout from '@/layouts/auth-layout.vue';

    import { useAppStore } from '@/stores/index';
    import { useMeta } from '@/composables/use-meta';

    const store = useAppStore();

    // meta
    useMeta({ title: 'Sales Admin' });

    const mainLayout = computed(() => {
        return store.mainLayout === 'auth' ? authLayout : appLayout;
    });
</script> -->

<!-- src/App.vue -->

<template>
  <div id="app">
    <router-view />
    <BottomNavbar v-if="showNavbar" />
  </div>
</template>
  
  <script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useAuth } from '@/auth';
import BottomNavbar from '@/components/ButtonNavbar.vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  components: {
    BottomNavbar,
  },
  setup() {
    const router = useRouter();

    // Check if the current route is the login page to conditionally show navbar
    const showNavbar = computed(() => router.currentRoute.value.name !== 'Login');

    return { showNavbar };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>