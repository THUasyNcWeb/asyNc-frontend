<template>
    <div class="img_div" :style="{width: props.width + 'px',height: props.height + 'px'}">
        <div class="mask" style="margin:auto">
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
                    @error="update_error"
                    @finish="update"
                    :show-file-list=false
                    @before-upload="beforeUpload"
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
        style=" z-index: 5; border-radius:50%; box-shadow: 4px 4px 8px 2px rgba(0, 0, 0, .16);"
        :fallback-src="default_logo"
        />
    </div>
</template>


<script setup lang="ts">
import { defineProps,defineEmits } from 'vue'
import {NImage,NUpload,NA, useMessage} from 'naive-ui'
import type { UploadFileInfo } from 'naive-ui'


import API from "../store/axiosInstance"
const props = defineProps<{
  width:number,
  height:number,
  image_code:string,
}>();
const emits = defineEmits(['changeavatar']);
const default_logo = require("@/assets/asyNc.png")
// Message box
const message = useMessage();


function get_token(){
    return window.localStorage.getItem('token')
}

function update() {
    message.success("上传成功🥳")
    API({
        headers:{"Authorization": window.localStorage.getItem("token")},
        url:'userinfo',
        method:'get',
        // 根据不同类别，把类别放在了对应的请求参数中
    }).then((res)=>{
        var response = res.data.data
        emits("changeavatar", response.avatar)
    }).catch((error) => {
        console.log(error);
    });
}
function beforeUpload (data: {
    file: UploadFileInfo
    fileList: UploadFileInfo[]
}) {
    var cate = ['image/png', 'image/jpg', 'image/jpeg']
    var flag = false
    for (var x of cate) {
        console.log(x)
        if(data.file.file.type === x) {
            flag = true
            break
        }
    }
    if (flag == false ){
        message.warning("上传格式有误，仅可以上传png/jpg/jpeg格式文件😢")
        return false
    }
    // 大小单位；kb
    if(data.file.file.size / 1024 / 1024 > 5) {
        message.warning("上传文件过大，最多不能超过5mb😢")
        return false
    }
    return true
}

function update_error() {
  message.error('上传图片时出现错误😢');
}


</script>

<style scoped>
.img_div {
display: block;
position: relative;
border-radius:50%; 
text-align: center;
margin: auto;
}
.mask {
position: absolute;
background: rgba(101, 101, 101, 0.6);
color: #ffffff;
opacity: 0;
top: 0;
width: 100%;
height: 100%;
border-radius: 150%;
}
.img_div:hover .mask {
opacity: 1;
}
</style>