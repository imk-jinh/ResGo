<template>
  <article>
    <VCardTitle>
      {{ store.title }}
      <VChip 
        class="chip"
        label 
      >
        {{ computedCategory }}
      </VChip>
    </VCardTitle>
    <VCardSubtitle>
      {{ store.address }}
    </VCardSubtitle>
    
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { LatLng, ResultItem } from '../../api';

interface ResultCardProps {
  store: ResultItem & LatLng
}

const { store } = defineProps<ResultCardProps>()

const computedCategory = computed<string>(() => store.category.split('>')[1])

</script>

<style scoped lang="scss">
article {
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 20px;
  margin-top: 10px;

  position: relative;
  cursor: pointer;
  opacity: .8;
  transition: .2s all;

  box-shadow: 2px 3px 16px 1px rgba(221, 221, 221, 0.08), 2px 3px 6px 3px rgba(230, 230, 230, 0.16);
  border-radius: 16px;

  .chip {
    position: absolute;
    right: 30px;
    top: 20px;

  }

  &:hover {
    opacity: 1;
  }
}
</style>