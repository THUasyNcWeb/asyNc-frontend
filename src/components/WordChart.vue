<template>
  <div v-if="!state.empty" id="chart" class="wordcloud"></div>
  <n-result
    v-else
    status="404"
    title="还没有留下什么足迹"
    description="快去探索一番吧"
  />
</template>

<script setup lang="ts">
import { onMounted, inject, ref, onBeforeUnmount, watch, reactive } from "vue";
import { NResult } from "naive-ui";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
import "echarts-wordcloud/dist/echarts-wordcloud";

export interface UserTag {
  key: string;
  value: number;
}

export interface UserInfo {
  id: string;
  user_name: string;
  signature: string;
  tags: UserTag[];
  mail: string;
  avatar: string;
}
const userRef = ref<UserInfo>(inject("userRef"));
const echarts = require("echarts");

const state = reactive({ empty: false });

watch(userRef, () => {
  state.empty = userRef.value.tags.length == 0;
  setTimeout(() => {
    init_chart(userRef.value.tags);
  }, 200);
});
function init_chart(tags: UserTag[]) {
  const domMap = document.getElementById("chart");
  // 清除Echarts默认添加的属性
  domMap.removeAttribute("_echarts_instance_");
  let myChart = echarts.init(domMap);
  if (tags.length != 0) {
    let now_tags = [];
    for (const x of tags) {
      if (x.key == "") {
        continue;
      }
      now_tags.push({
        name: x.key,
        value: x.value,
      });
    }
    console.log(now_tags);
    myChart.hideLoading();
    myChart.setOption({
      series: [
        {
          type: "wordCloud",
          //用来调整词之间的距离
          gridSize: 10,
          //用来调整字的大小范围
          // Text size range which the value in data will be mapped to.
          // Default to have minimum 12px and maximum 60px size.
          sizeRange: [18, 60],
          // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
          //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
          // rotationRange: [-45, 0, 45, 90],
          // rotationRange: [ 0,90],
          rotationRange: [0, 0],
          //随机生成字体颜色
          // maskImage: maskImage,
          textStyle: {
            fontFamily: "宋体",
            color: function () {
              return (
                "rgb(" +
                [
                  Math.round(Math.random() * 250),
                  Math.round(Math.random() * 250),
                  Math.round(Math.random() * 250),
                ].join(",") +
                ")"
              );
            },
          },
          //位置相关设置
          left: "center",
          top: "center",
          right: null,
          bottom: null,
          // width: "200%",
          // height: "200%",
          //数据
          data: now_tags,
        },
      ],
    });
  } else {
    state.empty = true;
  }
}

onMounted(() => {
  state.empty = Object.keys(userRef.value.tags).length == 0;
  setTimeout(() => {
    init_chart(userRef.value.tags);
  }, 200);
});

onBeforeUnmount(() => {});
</script>

<style>
.wordcloud {
  width: 100%;
  height: 300px;
}
</style>
