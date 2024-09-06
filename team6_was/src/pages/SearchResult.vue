<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from '../store';
import NaverMap from '../components/result/NaverMap.vue';
import { useRouter } from 'vue-router';
import ResultCard from '../components/result/ResultCard.vue';
import { onMounted } from 'vue';

const { 
  asyncStates: { result, naverLocationSearchResult, currentPosition },
  states,
  requestNaver,
  loadStoreDetail
} = useStore()

const { push } = useRouter()

const tags = computed<string[]>(() => result.data ?? [])
const tagExpand = ref<boolean>(false)

const chipSelect = ref<number>(0)

const countedTags = computed<string[]>(() => {
  if(tags.value.length < 5) return tags.value
  return tagExpand.value ? tags.value : tags.value.slice(0, 4)
})

const onStoreSelect = (storeId: number) => {

  // 상세 검색 스토어를 미리 변경시킵니다.
  states.selectedStoreId = storeId
  const currentStore = naverLocationSearchResult.data?.find((result) => result.id === states.selectedStoreId)!
  const address = currentStore.address.split(' ').slice(0, 4).join(' ')
  const title = currentStore.title
  loadStoreDetail(`${title} ${address}`)
  push(`/detail/${storeId}`)
}

</script>

<template>    
  <VContainer class="SearchResult">

    <!-- 이미지 분석 결과 -->
    <template v-if="!result.loading && !currentPosition.loading">
      <div class="tag-wrapper">
        <VCardTitle>
          이미지 분석 결과
        </VCardTitle>      
  
        <VImg
          class="img"
          :src="states.imgUrl"
        />
        <VChipGroup 
          selected-class="text-info" 
          v-model="chipSelect"
          :class="['chip-wrapper', tagExpand ? 'wrap': '']"
        >
          <VChip
            v-for="(tag, i) in countedTags" 
            @click="requestNaver(tag)"
            :key="i"
            class="chip"            
            color="black"
            variant="outlined"
          >
            {{ tag }}
          </VChip>          
        </VChipGroup>
        
        <div 
          v-if="tags.length > 4"
          class="more"
          @click="tagExpand = !tagExpand"
        >
          <v-icon>
            {{ tagExpand ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </div>
  
      </div>  

      
    </template>
  
    <VProgressCircular 
      v-else 
     class="ProgressCircular" 
      model-value="80"
      color="#693D0D"
      indeterminate
    />
      
    <!-- 결과 리스트 -->
    <template v-if="!result.loading && !currentPosition.loading && !naverLocationSearchResult.loading">
      <div>
        <VDivider class="mt-5 mb-5"/>
        <template v-if="states.isSearchSuccess">
          <VCardTitle>
            이미지 분석 결과를 토대로 검색해보았어요.
          </VCardTitle>              
          <VCardSubtitle>
            <span class="font-weight-bold mr-1 text-info">
              {{ states.currentSearch }}
            </span>와 연관된 가게들입니다.
          </VCardSubtitle>
        </template>
        <template v-else>
          <VCardTitle>
            이미지 에서 음식을 분석 하는 데 실패했어요!
          </VCardTitle>
          <VCardSubtitle>
            대신 가까운 맛집을 추천 해 드릴게요.
          </VCardSubtitle>
        </template>
      </div>
      
      <div class="result-card-wrapper">
        <ResultCard 
          v-for="store in naverLocationSearchResult.data" 
          :key="store.id"
          :store="store"
          @click="onStoreSelect(store.id)"
        />        
      </div>
      
      <NaverMap @marker-click="id => onStoreSelect(id)" />
    </template>

  </VContainer>  
</template>

<style lang="scss" scoped>

.SearchResult {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tag-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  margin-top: 30px;  
  .img {
    min-width: 100% !important;
    border-radius: 1rem;
  }

  .chip-wrapper {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    max-width: 100%;
    overflow-x: scroll;
    
    .chip {      
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;      
    }

    &.wrap {
      flex-wrap: wrap;
    }
  }  

  .more {
    align-self: flex-end;
    font-size: 12px;
    margin-top: .25rem;
    cursor: pointer;
  }  
}

.ProgressCircular {
  position: absolute;
  top: 50%;
  left: 50%;
}

.result-card-wrapper {
  width: 500px;
  padding-right: 40px;
  padding-left: 40px;
  margin-top: 20px;  
}

</style>