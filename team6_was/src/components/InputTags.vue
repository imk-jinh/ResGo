<template>
  <v-combobox       
    class="ComboBox"
    label="태그를 입력해주세요."
    multiple
    chips
    ref="comboBox"    
    variant="solo"
    closable-chips
    v-model="tag"
    append-inner-icon="mdi-magnify"
    small-chips
  >        
  </v-combobox>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { computed, ref } from 'vue';
import { VCombobox } from 'vuetify/components';

interface InputTagProp {
  tags: string[]
}

interface InputTagEmit {
  (e: 'update:tags', value: string[]): void
}

const prop = defineProps<InputTagProp>()
const emit = defineEmits<InputTagEmit>()

const comboBox = ref<VCombobox | null>(null)

const tag = computed({
  get() {
    return prop.tags
  },

  set(value) {
    emit('update:tags', value)
  }
})

const log = (chip: any) => {
  console.log(chip)
}

onMounted(() => {  
  setTimeout(() => {
    (document.querySelector('#input-0') as HTMLInputElement).focus()
  }, 3000)
})
 
</script>

<style scoped>
.ComboBox { 
  color: black;
  width: 300px;
}
</style>