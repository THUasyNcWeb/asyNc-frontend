<!--
 * @FileDescription: 搜索结果项
 * @Author: 王博文
 * @Date: 2022-10-20 01:05
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-17 13:15
-->

<template>
  <n-a :href="news.url" style="text-decoration: none;" @click="newsClick(news.id)">
    <n-thing>
      <n-h2 align-text prefix="bar">
        <span v-for="span, id in titleSpans" :key="id" :class="{ em: span.em }">
          {{span.text}}
        </span>
      </n-h2>
      <n-space>
        <n-image v-if="news.picture_url" width=160 height=120 object-fit="cover"
          :src="news.picture_url" preview-disabled
          style="border-radius: 8px; box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, .16)"
          :fallback-src="default_logo"
          />
        <n-ellipsis :class="{ narrow: news.picture_url, wide: !news.picture_url }" id="content"
          line-clamp=3 :tooltip="false">
          <span v-for="span, id in contentSpans" :key="id" :class="{ em: span.em }">
            {{span.text}}
          </span>
        </n-ellipsis>
      </n-space>
      <template #footer>
        <n-space>
          <n-button type="warning" text style="font-size: 20px" @click.prevent="favoritesClick('favorites')">
            <n-icon>
              <favorites-icon-filled v-if="news.is_favorites" />
              <favorites-icon v-else />
            </n-icon>
          </n-button>
          <n-button type="error" text style="font-size: 20px" @click.prevent="favoritesClick('readlater')">
            <n-icon>
              <read-icon-filled v-if="news.is_readlater" />
              <read-icon v-else />
            </n-icon>
          </n-button>
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
import { NA, NButton, NEllipsis, NH2, NIcon, NImage, NSpace, NText, NThing, useMessage } from 'naive-ui';

import {
  Bookmark as ReadIconFilled,
  BookmarkOutline as ReadIcon,
  Star as FavoritesIconFilled,
  StarOutline as FavoritesIcon,
} from '@vicons/ionicons5/';

import { newsClick } from '@/main';
import API from '@/store/axiosInstance';

export interface News {
  id: number,
  title: string,
  url: string,
  media: string,
  pub_time: Date,
  picture_url?: string,
  content: string,
  title_keywords: [number, number][],
  keywords: [number, number][],
  is_favorites: boolean,
  is_readlater: boolean,
}

const props = defineProps<{
  news: News,
}>();

const emits = defineEmits(['favoritesUpdate', 'readlaterUpdate']);

const message = useMessage();

// Add or remove this news to or from favorites or read later
function favoritesClick(type: 'favorites' | 'readlater') {
  const favorite = props.news['is_' + type];
  const action = favorite ? '移除' : '添加';
  const target = type === 'favorites' ? '收藏' : '稍后再看';
  props.news['is_' + type] = !favorite;

  API({
    headers: {
      Authorization: window.localStorage.getItem('token'),
    },
    url: type,
    method: favorite ? 'delete' : 'post',
    params: {
      id: props.news.id
    },
  }).then(response => {
    if (response.status === 200) {
      message.success(`${action}${target}成功`);
      const emit = `${type}Update` as 'favoritesUpdate' | 'readlaterUpdate';
      emits(emit);
    } else {
      props.news['is_' + type] = false;
      message.error(`${action}${target}失败`);
    }
  }).catch(error => {
    props.news['is_' + type] = false;
    message.error(`${action}${target}失败`);
  });
}

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
const default_logo = require("../assets/asyNc.png")
// 加载失败时的默认图片
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