<template>
  <div id="chart" class="wordcloud"></div>
</template>

<script setup lang="ts">
import { onMounted, inject, ref, onBeforeUnmount } from "vue";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
import "echarts-wordcloud/dist/echarts-wordcloud";
export interface UserInfo {
  id: string;
  user_name: string;
  signature: string;
  tags: object;
  mail: string;
  avatar: string;
}
const userRef = ref<UserInfo>(inject("userRef"));
const echarts = require("echarts");
function init_chart(tags: Object) {
  let list = [];
  const domMap = document.getElementById("chart");
  // 清除Echarts默认添加的属性
  domMap.removeAttribute("_echarts_instance_");
  let myChart = echarts.init(domMap);
  if (typeof tags == "object") {
    if (Object.keys(tags).length !== 0) {
      for (var key in tags) {
        list.push({
          name: key,
          value: tags[key],
        });
      }
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
            sizeRange: [14, 60],
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
            data: list,
          },
        ],
      });
    } else {
      myChart.showLoading({
        text: "你还没有留下足迹，快去探索吧",
        showSpinner: false,
        textColor: "black",
        maskColor: "rgba(255, 255, 255, 1)",
        fontSize: "26px",
        fontWeight: "bold",
      });
    }
  } else {
    myChart.showLoading({
      text: "加载中",
      showSpinner: false,
      textColor: "black",
      maskColor: "rgba(255, 255, 255, 1)",
      fontSize: "26px",
      fontWeight: "bold",
    });
  }
}

onMounted(() => {
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
