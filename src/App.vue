<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useFetch } from '@vueuse/core'

const url = ref('https://aica.pages.dev/all.json')
const refetch = ref(false)
const {
  data,
  error,
  statusCode,
  isFetching,
  isFinished,
  canAbort,
} = useFetch(url, { refetch }).get()
const text = reactive({
  isFinished,
  isFetching,
  canAbort,
  statusCode,
  error,
  data: computed(() => {
    try {
      return JSON.parse(data.value as string)
    }
    catch (e) {
      return null
    }
  }),
})
</script>

<template>
    <masonry-wall :items="text.data" :ssr-columns="1" :column-width="350" :gap="10">
      <template #default="{ item, index }">
        <div>
          <h1>{{ item.creator_username }}</h1>
          <img :src="`https://via.placeholder.com/300x300`" />
          <br>
          <div>
            <img :src="`https://via.placeholder.com/72x64`" /> <img :src="`https://via.placeholder.com/72x64`" /> <img :src="`https://via.placeholder.com/72x64`" /> <img :src="`https://via.placeholder.com/72x64`" /> 
          </div>
          <a :href="`${item.online[0]}`"><img :src="`https://colab.research.google.com/assets/colab-badge.svg`" /></a>
          <p>name: {{ item.model_name }}</p>
          <p>version: {{ item.model_version }}</p>
          <p>type: {{ item.type[0] }}</p>
          <p>tokens:</p>
          <div v-for="(token, token_index) in item.tokens" :key="token_index">{{ token }}</div>
        </div>
      </template>
    </masonry-wall>
</template>
