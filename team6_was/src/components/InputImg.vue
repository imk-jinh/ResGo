<template>  
  <div :class="['ImgBox', imgs.length !== 0 ? 'active' : '']"  >    
    <v-img
      v-if="imgs.length !== 0"
      class="Img"
      ref="imgObj"      
      :src="img"
    />
    <div v-else class="Input">
      <v-file-input
        class="FileInput"  
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon=""
        @change="imgChange"
        v-model="imgs"
        variant="plain"
      />      
      <span class="label">
        <img src="../../public/picture.svg" alt="">
      </span>
    </div>

    <v-btn 
      v-if="imgs.length !== 0"
      density="compact"
      elevation="0"
      class="CloseBtn" 
      icon="mdi-close"
      @click="imgs = []"
    />
  </div>       
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { VFileInput, VImg } from 'vuetify/components';

export type ImgChangeType = {
  img: string
  uploadFile: File
}

interface InputImgEmit {
  (e: 'img-change', value: ImgChangeType): void 
}

const img = ref<string>()
const imgs = ref<File[]>([])

const emit = defineEmits<InputImgEmit>()

const imgChange = (e: Event) => nextTick(() => {
  const target = e.target as HTMLInputElement
  if(!(target.files instanceof FileList)) return  
  const uploadFile = target.files[0]
  const url = URL.createObjectURL(target.files[0])
  img.value = url
  
  emit('img-change', {
    img: img.value,
    uploadFile: uploadFile
  })  
})

</script>

<style scoped lang="scss">
.FileInput {
  width: 350px !important; 
  height: 350px !important;
}

.ImgBox {
  height: 350px;
  width: 350px;
  font-size: 12px;
  position: relative;  
  border-radius: 10%;
  color: rgb(112, 103, 103);
  background-color: white;
  display: flex; 
  padding: 1rem;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  animation-fill-mode: forwards;
  border: 3px dashed rgba(176, 180, 184, 0.4);
  box-sizing: border-box;

  &.active {
    border: none;
  }
  

  .Input {
    position: relative;
    text-align: center;
    
    .label {
      cursor: not-allowed;
      pointer-events: none;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: .3s;
      opacity: .05;
      margin: auto;
    }
  }  

  &:hover {
    .label {
      color: black;
    }
  }
}


@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}


.Img {
  max-width: 97%;
  max-height: 97% !important;
}

.CloseBtn {
  position: absolute;
  top: 15px;
  right: 15px;
}

</style>