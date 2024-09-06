<template>
  <v-carousel
    cycle
    height="30"
    class="carousel"
    hide-delimiter-background
    direction="vertical"
    :show-arrows="false"
    hide-delimiters
  >
    <template v-if="!recommends.loading || testRanks">
      <v-carousel-item
        v-for="{ rank, title } in testRanks"
        :key="rank"
        inline
        class="item"
      >
        <span class="text-item">
          <span class="rank">
          {{ rank }}
          </span>
          . {{ title }}
        </span>
      </v-carousel-item>
      <div class="label">이슈 검색어</div>
    </template>
  </v-carousel>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../store';

const {
  asyncStates: { recommends },
} = useStore();

type Rank = {
  rank: number;
  title: string;
};

const testRanks: Rank[] = [
  {
    rank: 1,
    title: '전복죽'
  },
  {
    rank: 2,
    title: '곱창'
  },
  {
    rank: 3,
    title: '쌈밥'
  },
  {
    rank: 4,
    title: '막국수'
  },
  {
    rank: 5,
    title: '토마토스파게티'
  },
]
const ranks = computed<Rank[]>(
  () =>
    recommends.data?.map((recommend, i) => ({
      rank: i + 1,
      title: recommend,
    })) ?? []
);
</script>
<style lang="scss" scoped>
.carousel {
  height: 100px;
  padding-left: 100px;
  position: absolute;

  margin: 0 auto;
  z-index: 2;
  top: 40%;
  margin-top: 20px;

  .item {
    top: 20%;
    
  }
  .text-item {
    opacity: .5;
    border: 1px solid black;
    background-color: #969491;
    border: none;
    border-radius: 10px;
    color: white;
    padding: .2rem;
    margin-left: 180px;
    text-align: right;
    font-weight: bold;

    .chip {
    }

    // .rank {
    //   color: #18a8f1;
    // }
  }

  
}

.label {
  position: absolute;
  background-color: #969491;
  color: white;
  left: 0%;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 15px;
  border-radius: 10px;
}
</style>
