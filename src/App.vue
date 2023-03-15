<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useFetch } from "@vueuse/core";

document.title = "AICA - AI Creator Archive";
const url = ref("/all.json");
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
    <img src="/logo.png" width="42" height="42" />
    <span style="font-size: 50px; color: #E6E6E6;"> AI</span><span style="font-size: 50px; color: hotpink;">CA </span>
    <a href="https://github.com/camenduru/ai-creator-archive"><span style="font-size: 12px; color: whitesmoke;"> AI
      </span>
      <span style="font-size: 12px; color: hotpink;">Creator Archive</span></a>
    + <a href="https://github.com/camenduru/stable-diffusion-webui-colab"><span
        style="font-size: 12px; color: whitesmoke;">Stable Diffusion</span> <span
        style="font-size: 12px; color: hotpink;">WebUI Colab</span></a>
  <br>
  <div>
    <a href="https://github.com/camenduru/stable-diffusion-webui-colab"><img alt="GitHub" src="/github.svg" /></a>&nbsp;
    <a href="https://twitter.com/camenduru"><img alt="Twitter" src="/twitter.svg" /></a>&nbsp;
    <a href="https://discord.gg/k5BwmmvJJU"><img alt="Discord" src="/discord.svg" /></a>&nbsp;
      <br>
      🚧<span style="font-size: 14px; color: hotpink;"> Still </span><span style="font-size: 14px; color: whitesmoke;">in
        development.</span> <span style="font-size: 14px; color: whitesmoke;">🚧 These</span> <span
        style="font-size: 14px; color: hotpink;">images</span> <span style="font-size: 14px; color: whitesmoke;">are for
        <span style="font-size: 14px; color: hotpink;">testing</span> purposes only. We will <span
          style="font-size: 14px; color: hotpink;">generate</span> images later.</span>
    </div>
    <br>
    <div>
      <p><img src="/lite.svg" /> has a stable WebUI and stable installed extensions.</p>
      <p><img src="/stable.svg" /> has ControlNet, a stable WebUI, and stable installed extensions.</p>
      <p><img src="/nightly.svg" /> has ControlNet, the latest WebUI, and daily installed extension updates.</p>
    </div>
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
        <a :href="`${item.online[0]}`"><img src="/lite.svg" /></a>&nbsp;
        <a :href="`${item.online[1]}`"><img src="/stable.svg" /></a>&nbsp;
        <a :href="`${item.online[2]}`"><img src="/nightly.svg" /></a>
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