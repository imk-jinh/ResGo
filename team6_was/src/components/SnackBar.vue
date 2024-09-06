<template>
  <v-snackbar 
    rounded="pill"
    v-model="enable"
    timeout="1000"
    elevation="24"
    class="SnackBar"    
  >
    이미지 또는 태그를 등록해주세요.
    <template v-slot:actions>
      <v-btn
        class="CloseBtn"
        color="red"
        variant="text"
        @click="emit('clicked')"
      >
        닫기
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface SnackBarProp {
  snackBar: boolean
}

interface SnackBarEmit {
  (e: 'updateValue', value: boolean): void
  (e: 'clicked'): void
}

const prop = defineProps<SnackBarProp>()
const emit = defineEmits<SnackBarEmit>()

const enable = computed({
  get: () => prop.snackBar,
  set: (value: boolean) => emit('updateValue', value)
})


</script>