<template>
    <n-space vertical style="width:60%">
        <n-empty v-if="!props.news.length" size="large" description="什么也没有找到" />
        <template v-else>
          <n-list hoverable clickable>
            <n-list-item v-for="item in props.news" :key="item.title">
              <!-- <news-entry :news="entry" /> -->
              <n-h2 prefix="bar">
                <n-a :href="item.url" style="text-decoration: none;">
                    <n-text type="primary">
                          {{item.title}}
                    </n-text>
                </n-a>
              </n-h2>
              <n-text type="info">
                {{item.media}}
              </n-text>
              {{item.pub_time}}   
            </n-list-item>
          </n-list>
        </template>
    </n-space>
</template>

<script  setup lang="ts">
import { defineProps } from 'vue';
import {  NH2,NText, NSpace, NEmpty,NList,NListItem,NA } from 'naive-ui';
export interface News {
  title: string,
  url: string,
  media: string,
  pub_time: Date,
  picture_url?: string,
}

const props = defineProps<{
  news: News[],
}>();


</script>