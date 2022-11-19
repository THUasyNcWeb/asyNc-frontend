<template>
  <div id="chart2" style="width:100%;height: 200px;">
  </div>
</template>

<script setup lang="ts">
import Js2WordCloud from "js2wordcloud";
import {defineProps, onMounted, watch} from 'vue'
const props = defineProps<{
  tags:object,
}>();

function init_chart(tags:Object) {
  console.log("初始化")
  console.log(tags)
  var wc = new Js2WordCloud(document.getElementById("chart2"));
  let list = [];
  if( typeof(tags) == 'object') {
    for(var key in tags) {
      list.push([key, tags[key]])  
    }
    let option = {
      fontSizeFactor: 0.2,                                    // 当词云值相差太大，可设置此值进字体行大小微调，默认0.1
      maxFontSize: 60,                                        // 最大fontSize，用来控制weightFactor，默认60
      minFontSize: 30,                                        // 最小fontSize，用来控制weightFactor，默认12
      list: list,
      noDataLoadingOption: {                                  // 无数据提示。
        backgroundColor: '#eee',
        text: '暂无数据',
        textStyle: {
          color: '#888',
          fontSize: 14
        }
      }
    };
    wc.setOption(option);
    window.onresize = function () {
      wc.setOption(option);
    };
  }
  else {
    let loadingOption = {
      backgroundColor: '#eee',
      text: '正在加载...',
      effect: 'spin'
    }
    wc.showLoading(loadingOption)
  }
}



onMounted(() => 
  {
    init_chart(props.tags)
  }
) 
watch(
  () => props.tags,
  (new_tag, ) => {
    /* ... */
    init_chart(new_tag)
  }
)

</script>
