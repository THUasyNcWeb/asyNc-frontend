<!--
 * @FileDescription: 新闻条目，用于悬浮面板
 * @Author: 王博文
 * @Date: 2022-11-14 19:07
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-14 22:07
-->

<template>
  <!-- <n-a :href="url" @click="newsClick(id)"> -->
    <n-grid x-gap="12" cols="3">
      <n-gi>
        <n-image v-if="image_url" :src="image_url"
          width="128" height="72" object-fit="cover" preview-disabled
          style="border-radius: 8px; box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, .16)"/>
      </n-gi>
      <n-gi :span="image_url ? 2 : 3" style="height: 144">
        <n-space vertical justify="space-evenly" style="height: 144">
          <n-ellipsis line-clamp="2" tooltip="false">
            <n-text strong>
              {{title}}
            </n-text>
          </n-ellipsis>
          <!-- {{''}} -->
          <n-text depth="3" style="font-size: 12px">
            {{media}}
          </n-text>
        </n-space>
        <!-- <n-ellipsis line-clamp="2" tooltip="false">
          {{title}}
        </n-ellipsis> -->
      </n-gi>
    </n-grid>
  <!-- </n-a> -->
</template>

<script setup lang="ts">
import { NGrid, NGi, NImage, NSpace, NText } from 'naive-ui';

import { newsClick } from '@/main';

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