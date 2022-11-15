<!--
 * @FileDescription: 新闻条目，用于悬浮面板
 * @Author: 王博文
 * @Date: 2022-11-14 19:07
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-15 11:29
-->

<template>
  <n-grid x-gap="12" cols="3">
    <n-gi :span="image_url ? 2 : 3">
      <n-space vertical justify="space-between" size="small" style="min-height: 80px">
        <n-ellipsis :tooltip="false">
          <n-text strong style="line">
            {{title}}
          </n-text>
        </n-ellipsis>
        <n-ellipsis :tooltip="false" style="font-size: 12px">
          <n-space size="small" v-if="visit_time">
            <n-icon size="18">
              <time-icon />
            </n-icon>
            {{visit_time.getMonth() + '-'
              + visit_time.getDate() + ' '
              + visit_time.getHours() + ':'
              + visit_time.getMinutes()}}
          </n-space>
          <n-space size="small">
            <n-icon size="18">
              <media-icon />
            </n-icon>
            {{media}}
          </n-space>
        </n-ellipsis>
      </n-space>
    </n-gi>
    <n-gi>
      <n-image v-if="image_url" :src="image_url"
        width="120" height="76" object-fit="cover" preview-disabled
        style="border-radius: 8px; box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, .16)"/>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { NEllipsis, NGrid, NGi, NIcon, NImage, NSpace, NText } from 'naive-ui';

import {
  NewspaperOutline as MediaIcon,
  TimeOutline as TimeIcon,
} from '@vicons/ionicons5/';

export interface News {
  id: number,
  url: string,
  title: string,
  media: string,
  image_url?: string,
  visit_time?: Date,
};

defineProps<News>();
</script>