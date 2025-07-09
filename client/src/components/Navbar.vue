<script setup>
import { ref, watch } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';

const theme = ref(loadState('theme') || 'light')

function toggleTheme() {
  theme.value = theme.value == 'light' ? 'dark' : 'light'
}

watch(theme, () => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
  saveState('theme', theme.value)
}, { immediate: true })

</script>

<template>
  <nav class="navbar navbar-expand-md  border-vue p-4">
    <div class="container gap-2">
      <RouterLink :to="{ name: 'Home' }" class="d-flex align-items-center text-primary">
        <img class="" alt="logo" src="https://media.istockphoto.com/id/1482381591/photo/caricature-of-a-funny-and-cute-giraffe-upside-down-with-teeth-and-big-eyes-perspective-effect.webp?a=1&b=1&s=612x612&w=0&k=20&c=d7T9B_cjuHGNkA5e7K8Opbv0lGAyelAaqMcLMhOGQJs=" height="45" />
        <b class="fs-5">Tower</b>
      </RouterLink>
      <!-- collapse button -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-links"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="mdi mdi-menu text-light"></span>
      </button>
      <!-- collapsing menu -->
      <div class="collapse navbar-collapse " id="navbar-links">
        <ul class="navbar-nav">
          <li>
            <!-- <RouterLink :to="{ name: 'About' }" class="btn text-green selectable">
              About
            </RouterLink> -->
          </li>
        </ul>
        <!-- LOGIN COMPONENT HERE -->
        <div class="ms-auto">
          <button class="btn text-secondary" @click="toggleTheme"
            :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
            <i v-if="theme == 'dark'" class="mdi mdi-weather-sunny"></i>
            <i v-if="theme == 'light'" class="mdi mdi-weather-night"></i>
          </button>
        </div>
        <Login />
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
