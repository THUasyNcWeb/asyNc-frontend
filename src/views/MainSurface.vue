<!--
 * @FileDescription: 新闻主要界面布局vue
 * @Author: 郑友捷
 * @Date: 2022-10-18 19:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-18 19:00  
 -->

<template>
    <n-layout position="absolute">
        <n-layout-header bordered embedded style="height: 74px; padding: 18px 96px;position:fixed;" >
            <Navigation/>
        </n-layout-header>
        <n-layout-content style="top: 74px;" position="absolute">
            <router-view></router-view>
        </n-layout-content>
    </n-layout>
</template>

<script setup lang="ts">
import Navigation from "../components/NavigationBar.vue"
import {  
    NLayout,
    NLayoutHeader, 
    NLayoutContent,
    } from 'naive-ui'
    // 按需引入naive-ui组件
    // 之后可能会把上述引入集中在一个固定的ts文件中
</script>
