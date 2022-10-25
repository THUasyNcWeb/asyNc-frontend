<!--
 * @FileDescription: 搜索结果项
 * @Author: 王博文
 * @Date: 2022-10-20 01:05
 * @LastEditors: 王博文
 * @LastEditTime: 2022-10-25 22:08
-->

<template>
  <n-a :href="news.url" style="text-decoration: none;">
    <n-thing>
      <n-h2 align-text prefix="bar">
        <span v-for="span, id in titleSpans" :key="id" :class="{ em: span.em }">
          {{span.text}}
        </span>
      </n-h2>
      <n-space>
        <n-image v-if="news.picture_url" width=160 height=120 object-fit="cover"
          :src="news.picture_url" preview-disabled
          style="border-radius: 8px; box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, .16)"/>
        <n-ellipsis :class="{ narrow: news.picture_url, wide: !news.picture_url }" id="content"
          line-clamp=3 :tooltip="false">
          <span v-for="span, id in contentSpans" :key="id" :class="{ em: span.em }">
            {{span.text}}
          </span>
        </n-ellipsis>
      </n-space>
      <template #footer>
        <n-space>
          <n-text type="info">
            {{news.media}}
          </n-text>
          <n-text depth=3>
            {{news.pub_time.toLocaleDateString()}}
          </n-text>
        </n-space>
      </template>
    </n-thing>
  </n-a>
</template>
  
<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { NA, NEllipsis, NH2, NImage, NSpace, NText, NThing } from 'naive-ui';

export interface News {
  title: string,
  url: string,
  media: string,
  pub_time: Date,
  picture_url?: string,
  content: string,
  title_keywords: [number, number][],
  keywords: [number, number][],
}

const props = defineProps<{
  news: News,
}>();

interface Span {
  em: boolean,
  text: string,
}

// Split content into spans for rendering keywords colored
function spans(text: string, keywords: [number, number][]): Span[] {
  const spans: Span[] = [];
  let last = 0;
  keywords.forEach(keyword => {
    let [begin, end] = keyword;
    spans.push({
      em: false,
      text: text.slice(last, begin),
    }, {
      em: true,
      text: text.slice(begin, end),
    });
    last = end;
  });
  spans.push({
    em: false,
    text: text.slice(last, text.length),
  });
  return spans;
}

const titleSpans = computed(() => spans(props.news.title, props.news.title_keywords));
const contentSpans = computed(() => spans(props.news.content, props.news.keywords));
</script>

<style scoped>
.em {
  font-weight: bold;
  color:rgb(75, 158, 95)
}
.wide {
  width: 80vw
}
.narrow {
  width: 65vw
}
</style>