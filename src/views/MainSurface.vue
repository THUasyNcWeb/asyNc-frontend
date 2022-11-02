<!--
 * @FileDescription: 新闻主要界面布局vue
 * @Author: 郑友捷
 * @Date: 2022-10-18 19:00
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-02 19:30
 -->

<template>
    <n-layout position="absolute">
        <n-layout-header bordered embedded style="height: 74px; padding: 18px 96px;position:fixed;" >
            <Navigation/>
        </n-layout-header>
        <n-layout-content ref="contentRef" style="top: 74px;" position="absolute">
            <router-view></router-view>
        </n-layout-content>
    </n-layout>
</template>

<script setup lang="ts">
import { provide, reactive, ref } from 'vue';
import Navigation from "../components/NavigationBar.vue"
import {  
    NLayout,
    NLayoutHeader, 
    NLayoutContent,
    LayoutInst,
} from 'naive-ui'
import { RouterView } from 'vue-router';

export type TagType = 'include' | 'exclude' | null;

export interface Tag {
  type: TagType;
  value: string;
}

// Provide content ref for scrolling in search page
const contentRef = ref<LayoutInst | null>(null);
provide('contentRef', contentRef);

// Provide inclusion/exclusion tags for search page
const tags: Tag[] = reactive([]);
provide('inclusionExclusionTags', tags);
</script>
