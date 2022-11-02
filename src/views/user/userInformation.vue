<!--
 * @FileDescription: 用户信息界面
 * @Author: 郑友捷
 * @Date: 2022-10-08 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-13 10:31
 -->
<template>
    <n-table>
        <tr>
            <th style="width:20%">
                用户名
            </th>
            <th style="width:80%">
                {{props.user.user_name}}
                <!-- 用户名为动态，等待后端请求 -->
            </th>
        </tr>
        <tr>
            <th style="width:20%">
                个性签名
            </th>
            <th style="width:80%">
                {{props.user.signature}}
                <!-- 个性签名为动态，等待后端请求 -->
            </th>
        </tr>
        <tr>
            <th style="width:20%">
                最近浏览的新闻标签
            </th>
            <th style="width:80%">
                <n-tag :color="{ color: color_tags[index % 3], textColor: '#000', borderColor: '#555' }" v-for="(tag,index) in props.user.tags" :key="index" style="margin-right:10px;" >{{tag}}</n-tag>
            </th>
            <!-- 浏览的新闻标签以tag组件进行展示，有着不同的颜色 -->
        </tr>
    </n-table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import {NTable,NTag} from 'naive-ui'

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

<style>

</style>