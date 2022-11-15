<template>
    <n-space vertical>
        <n-empty v-if="!props.news.length" size="large" description="什么也没有找到" />
        <template v-else>
          <n-carousel style=" height:300px ;" autoplay dot-type="line" show-arrow>
            <template #arrow="{ prev, next }">
              <div class="custom-arrow">
                <button type="button" class="custom-arrow--left" @click="prev">
                  <n-icon><ArrowBack /></n-icon>
                </button>
                <button type="button" class="custom-arrow--right" @click="next">
                  <n-icon><ArrowForward /></n-icon>
                </button>
              </div>
            </template>
              <n-carousel-item v-for="(news, pic_index) in props.news.slice(0,10)" :key = pic_index>
                  <div class="pic_item">
                      <a :href="news.url" target="_blank">
                          <n-image class="small" :src="news.picture_url" preview-disabled :fallback-src="default_logo" />
                      </a>
                      <h2>{{news.title}}</h2>
                  </div>
              </n-carousel-item>
          </n-carousel>

          <n-list hoverable clickable>
            <n-list-item v-for="item,id in props.news" :key="id">
              <n-space justify="space-between" stlye="display:inline-block">
                  <n-space vertical justify="space-between" :style="{'max-width': item.picture_url ? '550px' : '900px','min-height':'140px' }">
                    <n-h2 stlye="width:200%" prefix="bar">
                      <n-a :href="item.url" style="text-decoration: none;">
                        <n-ellipsis :line-clamp="2" :tooltip=false>
                          <n-text type="primary">
                                {{item.title}}
                          </n-text>                      
                        </n-ellipsis>
                      </n-a>
                    </n-h2> 
                    <n-space :size=30>
                      <n-space :size=5>
                        <n-icon size="20">
                        <people-circle-outline />
                      </n-icon>
                      <n-text type="info" size="20">
                        {{item.media}}
                      </n-text>
                      </n-space>
                      <n-space :size=5>
                        <n-icon size="20" style="margin-left:5%">
                          <calendar-number-outline />
                        </n-icon>
                        <n-text size="20" > 
                          {{item.pub_time}}
                        </n-text>
                      </n-space>
                      <n-space :size=5>
                        <n-icon @click="favorites" size="20">
                        <star-outline />
                        </n-icon>       
                        <n-text @click="favorites" size="20"> 
                          收藏
                        </n-text> 
                      </n-space>     
                    </n-space>
                  </n-space>
                  <n-a :href="item.url" style="text-decoration: none;">
                      <n-image  v-if="item.picture_url" width=160 height=140 object-fit="cover"
                      :src="item.picture_url" preview-disabled
                      style="border-radius: 8px; box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, .16);"/>                  
                    </n-a>
              </n-space>
            </n-list-item>
          </n-list>
        </template>

    </n-space>
</template>

<script  setup lang="ts">
import { defineProps } from 'vue';
import {PeopleCircleOutline,CalendarNumberOutline,StarOutline,ArrowBack,ArrowForward} from "@vicons/ionicons5"

import { NA, NH2,NIcon, NText, NSpace, NEmpty,NList,NListItem,NImage,NEllipsis,NCarousel,NCarouselItem } from 'naive-ui';

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

function favorites(){
  alert("我先占个位置，代表收藏了")
}
const default_logo = require("@/assets/asyNc.png")
</script>

<style>
.custom-arrow {
  display: flex;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  color: rgb(8, 8, 8);
  background-color: rgba(189, 21, 21, 0.1);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-arrow button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
  transform: scale(0.95);
  transform-origin: center;
}


.small {
  width: 100%;
  height: 100%;
  position: relative;
}

.pic_item {
  position: relative;
  height: 100%;
  box-shadow:  inset
    0px -50px 30px  rgb(217, 222, 222);  
      /*下边阴影  */
}

.pic_item:hover{
  cursor: pointer;
}

.pic_item img {
  width: 100%;
  height: 100%;
  position: relative;
}

.pic_item h2 {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
}
</style>