<!--
 * @FileDescription: 用户信息界面
 * @Author: 郑友捷
 * @Date: 2022-10-08 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 10:31
 -->
<template>
    <n-card class="card_bordered">
        <n-grid y-gap="20" :cols=1>
            <n-grid-item>
                <n-grid cols="3" item-responsive>
                    <n-grid-item style="text-align:center;">
                        <n-h3 style="padding-top:5%">
                            <n-text type="warning">
                                头像
                            </n-text>
                        </n-h3>
                    </n-grid-item>
                    <n-grid-item style="text-align:left"  span="1 300:2">
                        <UserAvatar :width="120" :height="120" :image_code="props.user.avatar"></UserAvatar>
                    </n-grid-item>
                </n-grid>
            </n-grid-item>
            <n-grid-item >
                <n-grid cols="3" item-responsive>
                    <n-grid-item style="text-align:center">
                        <n-h3>
                            <n-text type="info">
                                用户名
                            </n-text>
                        </n-h3>
                    </n-grid-item>
                    <n-grid-item style="text-align:left"  span="1 300:2">
                        <n-h3>
                            <n-text>
                                {{props.user.user_name}}
                            </n-text>
                        </n-h3>
                    </n-grid-item>
                </n-grid>
            </n-grid-item>
            <n-grid-item>
                <n-grid cols="3" item-responsive>
                    <n-grid-item style="text-align:center">
                        <n-h3> 
                            <n-text  type="error">
                                个性签名
                            </n-text>
                        </n-h3>
                    </n-grid-item>
                    <n-grid-item style="text-align:left"  span="1 300:2">
                        <n-h3> 
                        <n-text>
                            {{props.user.signature}}
                        </n-text>
                        </n-h3>
                    </n-grid-item>
                </n-grid>
            </n-grid-item>
            <n-grid-item>
                <n-grid cols="3" item-responsive>
                    <n-grid-item style="text-align:center">
                        <n-h3>
                            <n-text type="success">
                                近期浏览
                            </n-text>
                        </n-h3>
                    </n-grid-item>
                    <n-grid-item style="text-align:left"  span="1 300:2">
                        <n-space>    
                            <n-tag :color="{ color: color_tags[index % 3], textColor: '#000', borderColor: '#555' }" v-for="(tag,index) in props.user.tags" :key="index" style="margin-right:10px;" >{{tag}}</n-tag>
                        </n-space>
                    </n-grid-item>
                </n-grid>
            </n-grid-item>
        </n-grid>
    </n-card>
    
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import {NTag, NSpace,NH3,NText,NCard,NGrid,NGridItem} from 'naive-ui'
import UserAvatar from '@/components/UserAvatar.vue';
export interface UserInfo {
  id: string,
  user_name: string,
  signature: string,
  tags: string[],
  mails: string,
  avatar: string,
}
const props = defineProps<{
  user:UserInfo,
}>();

const color_tags = ['#00FFFF','#ADFF2F','#F0E68C']
// 获取用户信息 

</script>

<style scoped>
.card_bordered {
    display: flex; 
    border-radius:15px;
    margin: auto; 
    /* margin-left: 50%; */
    width:70%;
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow:    0px -0.5px 5px #808080,   /*上边阴影 */
    -0.5px 0px 5px #808080,   /*左边阴影 */
    0.5px 0px 5px #808080,    /*右边阴影 */
    0px 0.5px 5px #808080;    /*下边阴影  */
}
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