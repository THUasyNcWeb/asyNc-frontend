<!--
 * @FileDescription: 选择更多新闻
 * @Author: 郑友捷
 * @Date: 2022-11-07 23:30
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-11-30 19:23
 -->
<template>
  <n-card class="card_bordered">
    <n-space vertical :size="40">
      <n-space vertical>
        <n-h2 prefix="bar">
          <n-text type="primary"> 热门导航 </n-text>
        </n-h2>
        <n-space :size="30">
          <n-button
            size="large"
            type="info"
            ghost
            @click="jump(category)"
            v-for="category in state.mainCategory"
            :key="category.label"
          >
            <n-space>
              <n-icon>
                <StorefrontOutline v-if="category.label == '首页'" />
                <PersonOutline v-if="category.label == '个性化'" />
                <BicycleOutline v-else-if="category.label == '体育'" />
                <FastFoodOutline v-else-if="category.label == '娱乐'" />
                <EarthOutline v-else-if="category.label == '政治'" />
                <BulbOutline v-else-if="category.label == '科技'" />
              </n-icon>
              {{ category.label }}
            </n-space>
          </n-button>
        </n-space>
      </n-space>
      <n-space vertical>
        <n-h2 type="info" prefix="bar">
          <n-text type="info"> 更多导航 </n-text>
        </n-h2>
        <n-space :size="30">
          <n-button
            size="large"
            type="success"
            ghost
            @click="jump(category)"
            v-for="category in state.moreCategory"
            :key="category.label"
          >
            <n-space>
              <n-icon>
                <PeopleCircleOutline v-if="category.label == '社会'" />
                <StatsChartOutline v-else-if="category.label == '金融'" />
                <CarSportOutline v-else-if="category.label == '汽车'" />
                <GameControllerOutline v-else-if="category.label == '游戏'" />
                <DiamondOutline v-else-if="category.label == '时尚'" />
                <HeartOutline v-else-if="category.label == '健康'" />
                <SchoolOutline v-else-if="category.label == '教育'" />
                <LibraryOutline v-else-if="category.label == '历史'" />
              </n-icon>
              {{ category.label }}
            </n-space>
          </n-button>
        </n-space>
      </n-space>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NSpace, NH2, NText, NButton, NIcon } from "naive-ui";
import { defineProps, reactive, defineEmits } from "vue";
import {
  StorefrontOutline,
  CarSportOutline,
  PersonOutline,
  GameControllerOutline,
  BulbOutline,
  PeopleCircleOutline,
  StatsChartOutline,
  BicycleOutline,
  DiamondOutline,
  HeartOutline,
  LibraryOutline,
  FastFoodOutline,
  SchoolOutline,
  EarthOutline,
} from "@vicons/ionicons5";
export interface Category {
  key: string;
  label: string;
}
const emits = defineEmits(["update"]);
const props = defineProps<{
  mainCategory: Category[];
}>();
const state = reactive({
  mainCategory: new Array(),
  moreCategory: new Array(),
});
for (var x of props.mainCategory) {
  state.mainCategory.push(x);
}

state.moreCategory.push(
  { key: "social", label: "社会" },
  { key: "finance", label: "金融" },
  { key: "auto", label: "汽车" },
  { key: "game", label: "游戏" },
  { key: "fashion", label: "时尚" },
  { key: "health", label: "健康" },
  { key: "edu", label: "教育" },
  { key: "history", label: "历史" }
);
function jump(category: Category) {
  emits("update", category.key, category.label);
}
</script>

<style scoped>
.card_bordered {
  display: flex;
  border-radius: 15px;
  margin: auto;
  /* margin-left: 50%; */
  margin-top: 2.5%;
  margin-bottom: 2.5%;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
