<template>
  <VCard
    class="DetailMenu"
    elevation="0"
  >
    <div>
      {{ menu.food_name}}
    </div>
    <div>
      {{ menu.food_price }}
    </div>
  </VCard> 
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { MenuContent } from '../../api/type';

interface DetailMenusProp {
  menu: MenuContent
}

const { menu } = defineProps<DetailMenusProp>()

// https://1mini2.tistory.com/88
</script>

<style lang="scss">
.DetailMenu {
  
}

</style>