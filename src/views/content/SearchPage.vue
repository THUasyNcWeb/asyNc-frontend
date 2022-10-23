<!--
 * @FileDescription: 新闻搜索页面
 * @Author: 王博文
 * @Date: 2022-10-20 01:21
 * @LastEditors: 王博文
 * @LastEditTime: 2022-10-24 00:28
-->
<template>
  <n-layout position="absolute">
    <n-layout-header bordered embedded
      style="height: 74px; padding: 18px 96px; position: fixed">
      <n-space align="center" justify="space-between">
        <n-space>
          <n-gradient-text type="success" size=24>
            asyNc
          </n-gradient-text>
          <search-box :text="word" style="width: 40vw"/>
        </n-space>
        <n-space>
          <n-button quaternary type="success">
            登录
          </n-button>
          <n-button quaternary type="success">
            注册
          </n-button>
        </n-space>
      </n-space>
    </n-layout-header>
    <n-layout position="absolute" style="top: 74px;">
      <n-space vertical style="padding: 18px 96px">
        <n-list hoverable clickable>
          <n-list-item v-for="entry, id in news" :key="id">
            <news-entry :news="entry" />
          </n-list-item>
        </n-list>
        <n-pagination :page="page" :page-count="page_count" @update:page="jump"/>
      </n-space>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { NButton, NGradientText, NLayout, NLayoutHeader, NList, NListItem, NPagination, NSpace } from 'naive-ui'
import NewsEntry from '@/components/NewsEntry.vue'
import SearchBox from '@/components/SearchBox.vue'
import router from '@/router';

// Get query parameters
const query = router.currentRoute.value.query;
const word = query.q as string;
const page = parseInt(query.page as string) || 1;
// const user = 'abmfy';

// Jump to specified page
function jump(page: number) {
  window.location.href = `search?q=${word}&page=${page}`;
}

// Fetch news and page count
let news = [];
let page_count = 100;

if (word) {
  document.title = word + ' - asyNc';

  news.push({
    title: `搜到了好东西：第 ${page} 页`,
    media: '见得风就是雨',
    url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
    pub_time: new Date(),
    content: `你说的对，但是「${word}」是由用户自主输入的一款全新搜索词。搜索发生在一个被称作「Git」的版本控制系统，在这里被「甲方」选中的小组将被授予「需求」，引导 DDL 之力。你将扮演一位名为「乙方」的神秘角色，在自由的开发中邂逅性格各异、能力独特的组员们，和他们一起击败「大作业」——同时发掘「软件开发」的真相。`,
  })
}

news.push(
  {
    title: '测试新闻',
    media: '腾讯新闻',
    url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
    pub_time: new Date(),
    content: '你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！你好，世界！你好，世界。你好，世界？你好，世界！',
  },
  {
    title: '非常好新闻',
    media: '亦可赛艇新闻',
    url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
    pub_time: new Date(1926, 7, 17),
    content: '苟利国家生死以',
  },
  {
    title: '有图片的非常好新闻',
    media: '亦可赛艇新闻',
    url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
    pub_time: new Date(1926, 7, 17),
    content: '苟利国家生死以',
    picture_url: 'https://app.moegirl.org.cn/萌百娘表情包/萌百娘表情包2/钻地.png',
  },
  {
    title: '有图片的很长的非常好新闻',
    media: '有仙则名新闻',
    url: 'https://www.bilibili.com/video/BV1GJ411x7h7',
    pub_time: new Date(9876, 4, 43),
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    picture_url: 'https://www.desmos.com/assets/img/homepage-student.png',
  },
);
</script>