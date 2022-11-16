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

function init_chart(tags: Object) {
  console.log("初始化")
  console.log(tags)
  var wc = new Js2WordCloud(document.getElementById("chart2"));
  let list = [];
  // if( props.tags.length != 0) {
    for(var key in tags) {
      list.push([key, tags[key]])  
    }
    let option = {
      // imageShape: require("@/assets/asyNc.png"),
      fontSizeFactor: 5,
      maxFontSize: 50,
      minFontSize: 20,
      color: "random-light",
      backgroundColor: "rgba(0,0,0,0.701961)",
      list: list,
    };
    wc.setOption(option);
    window.onresize = function () {
      wc.setOption(option);
    };
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
