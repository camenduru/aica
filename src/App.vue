<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useFetch } from "@vueuse/core";

const url = ref("https://aica.vercel.app/all.json");
const refetch = ref(false);
const { data, error, statusCode, isFetching, isFinished, canAbort } = useFetch(
  url,
  { refetch }
).get();
const text = reactive({
  isFinished,
  isFetching,
  canAbort,
  statusCode,
  error,
  data: computed(() => {
    try {
      return JSON.parse(data.value as string);
    } catch (e) {
      return null;
    }
  }),
});
</script>

<template>
  <div class="creator-archive">
    <img src="https://emojicdn.elk.sh/🏛?style=apple" width="42" height="42" />
    <span style="font-size: 50px;"> AICA </span>
    <span style="font-size: 14px;">AI Creator Archive</span>
  </div>
  <masonry-wall v-if="text.data" :items="text.data" :ssr-columns="1" :column-width="350" :gap="10">
    <template #default="{ item, index }">
      <div class="grid-item">
        <span style="font-size: 16px;">{{ item.model_name }}</span>
        <span style="float: right; font-size: 12px;">v{{ item.model_version }}</span>
        <img :src="`${item.images[0]}`" width="288" />
        <br />
        <!-- <div>
          <img style="padding-right: 3px;" :src="`https://via.placeholder.com/69x69`" />
          <img style="padding-right: 3px;" :src="`https://via.placeholder.com/69x69`" />
          <img style="padding-right: 3px;" :src="`https://via.placeholder.com/69x69`" />
          <img :src="`https://via.placeholder.com/69x69`" />
        </div> -->
        <a :href="`${item.online[0]}`"><img :src="`https://badgen.net/badge/🦓/lite/yellow`" /></a>&nbsp;
        <a :href="`${item.online[1]}`"><img :src="`https://badgen.net/badge/🐴/stable/orange`" /></a>&nbsp;
        <a :href="`${item.online[2]}`"><img :src="`https://badgen.net/badge/🦄/nightly/pink`" /></a>
        <p>Creator: {{ item.creator_username }}</p>
        <p>Type: {{ item.type[0] }}</p>
        <span v-if="item.tokens[0]">Tokens: </span>
        <span v-for="(token, token_index) in item.tokens" :key="token_index">
          {{ token }}&nbsp;
        </span>
      </div>
    </template>
  </masonry-wall>
</template>