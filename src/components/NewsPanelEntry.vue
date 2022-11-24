<!--
 * @FileDescription: 新闻条目，用于悬浮面板
 * @Author: 王博文
 * @Date: 2022-11-14 19:07
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-24 14:09
-->

<template>
  <n-space justify="space-between">
      <n-space vertical justify="space-between" size="small"
        style="width: calc(30vw - 192px); min-height: 80px">
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
            {{visit_time.toLocaleString([], {
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}}
          </n-space>
          <n-space size="small">
            <n-icon size="18">
              <media-icon />
            </n-icon>
            {{media}}
          </n-space>
        </n-ellipsis>
      </n-space>
      <n-image v-if="picture_url" :src="picture_url"
        width="120" height="76" object-fit="cover" preview-disabled
        style="border-radius: 8px; box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, .16)"/>
  </n-space>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import { NEllipsis, NIcon, NImage, NSpace, NText } from 'naive-ui';

import {
  NewspaperOutline as MediaIcon,
  TimeOutline as TimeIcon,
} from '@vicons/ionicons5/';

export interface News {
  id: number,
  url: string,
  title: string,
  media: string,
  picture_url?: string,
  visit_time?: Date,
}

defineProps<News>();
</script>