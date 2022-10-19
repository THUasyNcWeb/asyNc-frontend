<!--
 * @FileDescription: 搜索框
 * @Author: 王博文
 * @Date: 2022-10-20 01:05
 * @LastEditors: 王博文
 * @LastEditTime: 2022-10-20 04:02
-->

<template >
  <n-a :href="news.url">
    <n-thing>
      <n-h2 align-text prefix="bar">
        {{news.title}}
      </n-h2>
      <n-space>
        <n-image v-if="news.picture_url" width=160 height=120 object-fit="cover"
          :src="news.picture_url" preview-disabled/>
        <n-ellipsis line-clamp=3 :tooltip="false">
          {{news.content}}
        </n-ellipsis>
      </n-space>
      <template #footer>
        <n-space>
          <n-text depth=3>
            {{news.media}}
          </n-text>
          <n-text type="info">
            {{news.pub_time.toLocaleDateString()}}
          </n-text>
        </n-space>
      </template>
    </n-thing>
  </n-a>
</template>
  
<script setup lang="ts">
import { NA, NEllipsis, NH2, NImage, NSpace, NText, NThing } from 'naive-ui'

export interface News {
  title: string,
  url: string,
  media: string,
  pub_time: Date,
  picture_url?: string,
  content: string,
}

defineProps<{
  news: News,
}>();
</script>