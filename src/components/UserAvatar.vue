<template>
    <div class="img_div" :style="{width: props.width + 'px',height: props.height + 'px'}">
        <div class="mask">
            <div style="text-align:center;margin-top: 30%;">
                <n-upload
                    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                    :headers="{
                    'naive-info': 'hello!'
                    }"
                    :data="{
                    'naive-data': 'cool! naive!'
                    }">
                    <n-h2 v-if="props.width == 120" style="color:aliceblue">
                        上传头像
                    </n-h2>
                    <n-h4 v-else style="color:aliceblue">
                        上传头像
                    </n-h4>
                </n-upload>
            </div>
        </div>
        <n-image :width=props.width :height=props.height object-fit="cover"
        :src="props.image_code"
        preview-disabled
        style="z-index: 5; border-radius:50%; box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, .16);"
        :fallback-src="default_logo"
        />
    </div>
</template>


<script setup lang="ts">
import { defineProps } from 'vue'
import {NImage,NUpload,NH2,NH4} from 'naive-ui'
const props = defineProps<{
  width:number,
  height:number,
  image_code:string,
}>();

const default_logo = require("@/assets/asyNc.png")


</script>

<style scoped>
.img_div {
display: block;
position: relative;
border-radius:50%; 
}
.mask {
position: absolute;
background: rgba(101, 101, 101, 0.6);
color: #ffffff;
opacity: 0;
top: 0;
right: 0;
width: 100%;
height: 100%;
border-radius: 150%;

}
.img_div:hover .mask {
opacity: 1;
}
</style>