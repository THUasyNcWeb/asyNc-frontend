<!--
 * @FileDescription: 新闻主要界面布局vue
 * @Author: 郑友捷
 * @Date: 2022-10-18 19:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-18 19:00  
 -->

<template>
    <n-layout >
        <n-layout-header bordered embedded style="height: 74px; padding: 18px 96px;">
            <Navigation/>
        </n-layout-header>
        <n-layout-content style="min-height:83.3vh;">
            <router-view></router-view>
        </n-layout-content>
        <n-layout-footer
            bordered
            style="bottom: 0;background-color:#87CEFA;color:white;text-align: center;padding: 6px;"
        >
            <n-gradient-text type="success" size=24>
                copyright by asyNc
            </n-gradient-text>
        </n-layout-footer>
    </n-layout>
</template>

<script setup lang="ts">
import Navigation from "../components/NavigationBar.vue"
import {  
    NLayout,
    NLayoutHeader, 
    NLayoutContent,
    NLayoutFooter,
    NGradientText,
    } from 'naive-ui'
    // 按需引入naive-ui组件
    // 之后可能会把上述引入集中在一个固定的ts文件中
</script>
