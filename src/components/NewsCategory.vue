<template>
  <n-space vertical>
    <n-result
      v-if="!props.news.length"
      status="404"
      title="404 资源不存在"
      :description="props.empty_content"
    >
    </n-result>
    <template v-else>
      <n-grid
        :item-responsive="true"
        :x-gap="16"
        :y-gap="16"
      >
        <n-grid-item span="0:24 640:14 1024:14">
          <n-carousel class="carousel_size" style="width:95%" autoplay dot-type="line" show-arrow>
            <template #arrow="{ prev, next }">
              <div class="custom-arrow">
                <button type="button" class="custom-arrow--left" @click="prev">
                  <n-icon>
                    <ArrowBack />
                  </n-icon>
                </button>
                <button type="button" class="custom-arrow--right" @click="next">
                  <n-icon>
                    <ArrowForward />
                  </n-icon>
                </button>
              </div>
            </template>
            <n-carousel-item
              v-for="(news, pic_index) in state.picture_news"
              :key="pic_index"
            >
              <div class="pic_item">
                <n-a
                  :href="news.url"
                  target="_blank"
                  @click="newsClick(news.id)"
                >
                  <n-image
                    :width="state.img_width"
                    object-fit="cover"
                    :src="news.picture_url"
                    preview-disabled
                    :fallback-src="default_logo"
                  />
                </n-a>
                <h2>
                  <n-ellipsis :tooltip="false" :line-clamp="1">
                    {{ news.title }}
                  </n-ellipsis>
                </h2>
              </div>
            </n-carousel-item>
          </n-carousel>
        </n-grid-item>
        <n-grid-item span="0:24 640:10 1024:10">
          <n-space vertical>
            <n-scrollbar style="max-height: 340px" trigger="none">
              <n-list bordered>
                <template #header>
                  <n-icon
                    :size="20"
                    color="#0e7a0d"
                    style="vertical-align: -20%; margin-right: 5px"
                  >
                    <Bonfire />
                  </n-icon>
                  <n-text style="font-size: larger"> Hot News </n-text>
                </template>
                <n-list-item v-for="(item, id) in state.side_news" :key="id">
                  <n-a
                    :href="item.url"
                    target="_blank"
                    @click="newsClick(item.id)"
                  >
                    <n-ellipsis :line-clamp="1" :tooltip="false">
                      <n-text type="primary">
                        {{ item.title }}
                      </n-text>
                    </n-ellipsis>
                  </n-a>
                </n-list-item>
              </n-list>
            </n-scrollbar>
          </n-space>
        </n-grid-item>
      </n-grid>

      <n-list hoverable clickable>
        <n-list-item v-for="(entry, id) in state.show_news" :key="id">
          <news-entry :news="entry" />
        </n-list-item>
      </n-list>
    </template>
  </n-space>
</template>

<script setup lang="ts">
import { defineProps, reactive, watch } from "vue";
import { ArrowBack, ArrowForward, Bonfire } from "@vicons/ionicons5";

import {
  NA,
  NIcon,
  NText,
  NSpace,
  NResult,
  NList,
  NListItem,
  NImage,
  NEllipsis,
  NCarousel,
  NCarouselItem,
  NGrid,
  NGridItem,
  NScrollbar,
} from "naive-ui";

import { newsClick } from "@/main";
import { News } from "./NewsEntry.vue";
import NewsEntry from "./NewsEntry.vue";

export interface All_News {
  id: number;
  title: string;
  url: string;
  media: string;
  pub_time: Date;
  picture_url?: string;
  is_favorite?: boolean;
  is_readlater?: boolean;
}

const props = defineProps<{
  news: All_News[];
  empty_content: string;
}>();

const state = reactive({
  img_width: window.innerWidth * 0.4,
  picture_news: new Array<All_News>(),
  // 用于走马灯
  show_news: new Array<News>(),
  // 用于正常新闻栏目展示
  side_news: new Array<News>(),
});

// change the offset dynamically
window.onresize = () => {
  state.img_width = window.innerWidth * 0.4;
};

const default_logo = require("@/assets/asyNc.png");

function choose_pictures() {
  // 选择用于展示的图片新闻
  // 不超过10张轮播图
  for (let element of props.news) {
    if (element.picture_url != "" && state.picture_news.length < 10) {
      state.picture_news.push(element);
    } else {
      state.show_news.push({
        ...element,
        content: "",
        title_keywords: [],
        keywords: [],
        is_favorites: element.is_favorite ?? false,
        is_readlater: element.is_readlater ?? false,
      });
    }
  }
  // 防止图片过少
  while (
    state.picture_news.length < 10 &&
    state.show_news.length > state.picture_news.length
  ) {
    state.picture_news.push(state.show_news[state.show_news.length - 1]);
    state.show_news.pop();
  }
  while (
    state.side_news.length < 10 &&
    state.show_news.length > state.side_news.length
  ) {
    state.side_news.push(state.show_news[state.show_news.length - 1]);
    state.show_news.pop();
  }
}

choose_pictures();

watch(
  () => props.news,
  () => {
    /* ... */
    choose_pictures();
  }
);
</script>

<style lang="scss" scoped>
.carousel_size {
  height: 340px;
}
</style>

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
  background-color: hwb(0 97% 0% / 0.942);
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

.pic_item {
  position: relative;
  display: flex;
  inset: 0;
  height: 100%;
  background-image: var(
    --mask-gradient,
    linear-gradient(to top, #020e33, rgba(2, 14, 51, 0) 120px)
  );
  box-shadow: 5px 5px 5px 2px #dcdcdc;
  /*下边阴影  */
}

.pic_item:hover {
  cursor: pointer;
}

.pic_item img {
  z-index: -1;
  object-fit: cover;
}

.pic_item h2 {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  color: white;
}
</style>
