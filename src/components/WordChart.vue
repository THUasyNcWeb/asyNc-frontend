<template>
  <div id="chart2" style="width:300px;height: 200px;">
  </div>
</template>

<script setup lang="ts">
import Js2WordCloud from "js2wordcloud";
import {defineProps, onMounted, watch} from 'vue'
const props = defineProps<{
  tags:{},
}>();

function init_chart(tags) {
  console.log("初始化")
  console.log(tags)
  var wc = new Js2WordCloud(document.getElementById("chart2"));
  let list = [];
  if( typeof(tags) == 'object' && Object.keys(tags).length !== 0) {
    for(var key in tags) {
      list.push([key, tags[key]])  
    }
    let option = {
      fontSizeFactor: 5,
      maxFontSize: 50,
      minFontSize: 20,
      color: "random-dark",
      backgroundColor: "rgba(255,255,255,0.701961)",
      list: list,
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
