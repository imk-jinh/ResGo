<script setup lang="ts">
import { useRouter } from 'vue-router';
</script>

<template>
  <v-sheet 
    class="Header"
    height="10"
    width="100%"
    color="secondary"
  >

  </v-sheet>
</template>

<style lang="scss">
.Header {
  position: fixed;
  display: flex;
  z-index: 1;
  justify-content: flex-end;
  align-items: flex-end;
}

.logo {  
  cursor: pointer;
  margin-left: 20px;
  font-weight: bold;
}

</style>