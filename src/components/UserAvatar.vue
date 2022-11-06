<template>
    <div class="img_div" :style="{width: props.width + 'px',height: props.height + 'px'}">
        <div class="mask">
            <div style="text-align:center;margin-top: 30%;">
                <n-upload
                    response-type="json"
                    action="http://127.0.0.1:8000/modifyavatar"
                    :headers="{
                    'Authorization': get_token()
                    }"
                    :data="{
                    'test': 'cool! naive!'
                    }" 
                    name="avatar"
                    :on-change="update"
                    :show-file-list=false
                    >
                    <n-a v-if="props.width == 120" style="color:aliceblue;font-size: 30px;">
                        上传头像
                    </n-a>
                    <n-a v-else style="color:aliceblue;font-size: 20px;">
                        上传头像
                    </n-a>
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
import { defineProps,defineEmits } from 'vue'
import {NImage,NUpload,NA} from 'naive-ui'
import API from "../store/axiosInstance"
const props = defineProps<{
  width:number,
  height:number,
  image_code:string,
}>();
const emits = defineEmits(['change-avatar']);
const default_logo = require("@/assets/asyNc.png")

function get_token(){
    return window.localStorage.getItem('token')
}

function update() {
    API({
      headers:{"Authorization": window.localStorage.getItem("token")},
      url:'userinfo',
      method:'get',
      // 根据不同类别，把类别放在了对应的请求参数中
  }).then((res)=>{
      var response = res.data.data
      console.log(response)
      emits("change-avatar", response.avatar)
  }).catch((error) => {
      console.log(error);
  });
}

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