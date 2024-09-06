<script setup lang="ts">
  import { ref } from 'vue'
  import { useStore } from '../store'
  import InputImg, { ImgChangeType } from '../components/InputImg.vue'
  import SnackBar from '../components/SnackBar.vue'
  import { useRouter } from 'vue-router'
import RecommendCarousel from '../components/RecommendCarousel.vue'

  const { 
    requestKakao, 
    requestNaver, 
    states,
    asyncStates: { recommends } 
  } = useStore()

  const router = useRouter()

  const img = ref<string>('')
  const uploadFile = ref<File>()
  const tags = ref<string[]>([])
  const snackBar = ref<boolean>(false)

  const onImgChange = (e: ImgChangeType): void => {
    img.value = e.img
    uploadFile.value = e.uploadFile
  }
  
  const onBtnClick = (): void => {
    if(!img.value) {
      snackBar.value = true
      return
    }

    states.imgUrl = img.value
    router.push('/result')
    beforeDetail()    
  }

  const beforeDetail = async () => {
    const query = await requestKakao(uploadFile.value!)
    await requestNaver(query[0])
  }
  
</script>

<template>
  <div class="Main">
    <div class="Logo">
      <img class="logoImg" src="../../public/logov3.svg"/>
    </div>    
    <RecommendCarousel />

  
    <InputImg @img-change="onImgChange"/>
    
    <VBtn 
      class="SubmitBtn"
      color="primary"
      variant="elevated"
      elevation="0"
      @click="onBtnClick"
    >
      제출
    </VBtn>
  </div>
  
  <SnackBar 
    v-model:snackBar="snackBar"
    @clicked="snackBar = false"
  />
</template>

<style lang="scss">
.Main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  height: -webkit-fill-available;
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  height: fill-available;
}


.Logo {
  color: black;
  font-weight: bold;
  animation-name: fade-in;
  animation-duration: 1s;  
  letter-spacing: .5rem;
}

.SubmitBtn {
  font-size: 20px;  transition: .3s;
  background-color: rgb(242, 252, 253);
  color: white !important;
  animation-name: up;
  animation-duration: .5s;
  animation-timing-function:cubic-bezier(0.28, 0.5, 0.265, 0.7);
  width: 80%;
  height: 50px !important;
  border-radius: 15px;
  bottom: 40px;
  width: 70%;
  height: 50px !important;
  border-radius: 15px;
  position: absolute;
}

.LoadingCircular {
  position: absolute;
  text-align: center;
  font-size: 15px;
  margin-top: 350px;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    letter-spacing: 0rem;
  }

  75% {
    opacity: 1;
  }

  100% {
    letter-spacing: .5rem;
  }
}

@keyframes slide-in {
  0% {    
    transform: translateX(1700px);
  }

  100% {
    transform: translateX(0px);
  }
}

@keyframes up {
  0% {
    transform: translateY(700px);
  }

  100% {
    transform: translateY(0px);
  }
}

.logoImg {
  margin-top: 3rem;
}


</style>