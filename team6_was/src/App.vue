<template>
  <v-app>
    <v-main>
      <AppHeader />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import AppHeader from './layouts/AppHeader.vue'
import { useStore } from './store';

const { loadLatLng, loadRecommend } = useStore()

onMounted(() => {
  if (sessionStorage.fonts) {
    document.documentElement.classList.add('wf-active')
  }

  loadLatLng()
  loadRecommend()
})
</script>

<style lang="scss">
$chip-border-radius: 0px !important;
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

body {
  background-color: #fff !important;
  font-family: 'Pretendard';
  color: #fd9f28
}
  
// #app {
//   height: calc(var(--vh, 1vh) * 100);
//   overflow: scroll;
//   .v-application--wrap {
//     min-height: calc(var(--vh, 1vh) * 100) !important; // 덮어씌우기
//   }
// }

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}

.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}

.fade-leave-active,
.fade-enter-active {
  transition: opacity .5s;
}


</style>
