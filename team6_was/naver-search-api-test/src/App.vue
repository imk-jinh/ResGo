<template>
  <div>
    <form @keypress.enter="onSearch">
      <input type="text" v-model="search"/> 
    </form>
  </div>
  <div 
    v-for="(item, i) in items" 
    :key="i"
  >  
    <span class="title">
      {{ item.title }}
    </span>
    <span class="category">
      {{ item.category  }}
    </span>
    <span>
      <a :href="item.link" target="blank">{{ item.link }}</a>
    </span>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue'

const search = ref<string>('')

const items = ref<ResultItem[]>()

interface ResultItem {
  title: string
  link: string
  category: string
  description: string
  telephone: string
}

interface SearchResult {
  display: number 
  items: ResultItem[]
  lastBuildDate: string
  start: number
  total: number
}

const onSearch = async (e: KeyboardEvent) => {
  e.preventDefault()

  const url = `/api/v1/search/local.json?query=${search.value}&display=10&start=3&sort=random`
  try {
    const res = await axios.get<SearchResult>(url, {
      headers: {
        'X-Naver-Client-Id': 'rGPIxdlycZyV9ELh3sTX',
        'X-Naver-Client-Secret': 'aP9NEZCDSk',
        'Access-Control-Allow-Origin':'*',
        'content-type':'application/json',
      }
    })    

    items.value = res.data.items.map((item: ResultItem) => ({      
      ...item,
      title: item.title.replace(/<\/?b>/gi, '')
    }))        
  } catch (e) {
    console.log(e)
  }

}


</script>

<style scoped>
.category {
  margin-left: 10px;
}
</style>