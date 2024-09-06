<template>
  <VContainer class="SearchDetail" v-if="!storeDetail.loading">
    <div class="#693D0D">
      <VCardTitle>      
        {{ currentStore.title }}
        {{ star }}
      </VCardTitle>
      <VCardSubtitle>
        {{ currentStore.address }}
        <v-icon size="x-small" class="copy" @click="onIconClick">
          mdi-content-copy
        </v-icon>
      </VCardSubtitle>
      <VCardText>
        <DetailMenus 
          v-for="(menu, i) in storeDetail.data?.lists"
          :menu="menu"
          :key="i"
        />
      </VCardText>
      {{ storeDetail.data?.openTime}}
    </div>

    <div class="result-card-wrapper">
      유사 가게 추천
      <ResultCard 
        v-for="store in recommendStores" 
        :key="store.id"
        :store="store"
        @click="onStoreSelect(store.id)"
      />        
    </div>
  </VContainer>

  <VProgressCircular 
    v-else 
    class="ProgressCircular"
    model-value="80"
    color="#693D0D"
    indeterminate
  />
</template> 

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from '../store';
import { ResultItem, LatLng } from '../api/type';
import DetailMenus from '../components/detail/DetailMenus.vue';
import ResultCard from '../components/result/ResultCard.vue';
import { useRouter } from 'vue-router';

const { 
  asyncStates: { naverLocationSearchResult, storeDetail },
  states,  
  loadStoreDetail
} = useStore()

const { push } = useRouter()

const currentStore = computed<ResultItem & LatLng>(() => naverLocationSearchResult.data?.find((result) => result.id === states.selectedStoreId)!)

const onIconClick = (): void => {
  navigator.clipboard.writeText(currentStore.value.address.split(' ').slice(0, 4).join(' '))
}

const onStoreSelect = (storeId: number) => {

  // 상세 검색 스토어를 미리 변경시킵니다.
  states.selectedStoreId = storeId
  const currentStore = naverLocationSearchResult.data?.find((result) => result.id === states.selectedStoreId)!
  const address = currentStore.address.split(' ').slice(0, 4).join(' ')
  const title = currentStore.title
  loadStoreDetail(`${title} ${address}`)
  push(`/detail/${storeId}`)
}

const recommendStores = computed<(ResultItem & LatLng)[]>(() => {
  return naverLocationSearchResult.data?.filter(store => store.id !== currentStore.value.id) || []
})

const star = computed(() => storeDetail.data?.star || '별점 정보가 없습니다.')


</script>

<style lang="scss" scoped>
.SearchDetail {
  margin-top: 40px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .info {
    align-self: flex-start;
  }
}

.copy {
  cursor: pointer;;
}

.result-card-wrapper {
  width: 500px;
  padding-right: 40px;
  margin-top: 20px;  
}

.ProgressCircular {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>