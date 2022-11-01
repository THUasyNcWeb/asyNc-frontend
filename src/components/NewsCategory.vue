<template>
    <n-space vertical style="width:60%">
        <n-empty v-if="!props.news.length" size="large" description="什么也没有找到" />
        <template v-else>
          <n-list hoverable clickable>
            <n-list-item v-for="item,id in props.news" :key="id">
              <n-space justify="space-between" stlye="display:inline-block">
                  <!-- <tr stlye="padding-top: 5px;">
                    <td style="min-width:600px;text-align: left;"> -->
                      <n-space vertical :size=25 :style="{'max-width': item.picture_url ? '700px' : '900px' }">
                        <n-h2 stlye="width:200%" prefix="bar">
                          <n-a :href="item.url" style="text-decoration: none;">
                            <n-ellipsis :line-clamp="2" :tooltip=false>
                              <n-text type="primary">
                                    {{item.title}}
                              </n-text>                      
                            </n-ellipsis>
                          </n-a>
                        </n-h2> 
                        <n-space>
                          <n-icon size="20">
                            <people-circle-outline />
                          </n-icon>
                          <n-text type="info" size="20">
                            {{item.media}}
                          </n-text>
                          <n-icon size="20" style="margin-left:5%">
                            <calendar-number-outline />
                          </n-icon>
                          <n-text size="20"> 
                            {{item.pub_time}}
                          </n-text>
                        </n-space>
                      </n-space>
                        <n-image  v-if="item.picture_url" width=160 height=120 object-fit="cover"
                        :src="item.picture_url" preview-disabled
                        style="border-radius: 8px; box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, .16);"/>      
              </n-space>
              
            </n-list-item>
          </n-list>
        </template>
    </n-space>
</template>

<script  setup lang="ts">
import { defineProps } from 'vue';
import {PeopleCircleOutline,CalendarNumberOutline} from "@vicons/ionicons5"

import { NA, NH2,NIcon, NText, NSpace, NEmpty,NList,NListItem,NImage,NEllipsis } from 'naive-ui';

export interface All_News {
  title: string,
  url: string,
  media: string,
  pub_time: Date,
  picture_url?: string,
}

const props = defineProps<{
  news:All_News[],
}>();

</script>