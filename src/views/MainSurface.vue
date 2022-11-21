<!--
 * @FileDescription: 新闻主要界面布局vue
 * @Author: 郑友捷
 * @Date: 2022-10-18 19:00
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-03 13:49
 -->

<template>
  <n-layout position="absolute" :key="state.random_key">
    <n-layout-header bordered embedded style="height: 74px; position: fixed">
      <Navigation style="padding: 18px 96px" />
    </n-layout-header>
    <n-layout-content ref="contentRef" style="top: 74px" position="absolute">
      <router-view @reload="reload"></router-view>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { provide, reactive, ref } from "vue";
import Navigation from "../components/NavigationBar.vue";
import { judgeToken } from "@/main";
import API from "@/store/axiosInstance";
import { NLayout, NLayoutHeader, NLayoutContent, LayoutInst } from "naive-ui";
import { RouterView } from "vue-router";

export type TagType = "include" | "exclude" | null;

export interface Tag {
  type: TagType;
  value: string;
}

export interface UserInfo {
  id: string;
  user_name: string;
  signature: string;
  tags: string[];
  mail: string;
  avatar: string;
}

const state = reactive({
  random_key: Math.random(),
  user: { user_name: "" } as UserInfo,
});

function reload() {
  state.random_key = Math.random();
  // 重新加载导航栏
}

function updateUserLocal(new_user: UserInfo) {
  // 清空用户信息
  state.user = new_user;
}

async function getUser() {
  if ((await judgeToken()) != "") {
    API({
      headers: { Authorization: window.localStorage.getItem("token") },
      url: "userinfo",
      method: "get",
      // 根据不同类别，把类别放在了对应的请求参数中
    })
      .then((res) => {
        state.user = res.data.data;
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        updateUserLocal({ user_name: "" } as UserInfo);
      });
  } else {
    // 清空用户状态
    updateUserLocal({ user_name: "" } as UserInfo);
  }
}

getUser();

// procive news ref
const userRef = ref<UserInfo>(state.user);
provide("userRef", userRef);
provide("getUser", getUser);
provide("updateUserLocal", updateUserLocal);

// Provide content ref for scrolling in search page
const contentRef = ref<LayoutInst | null>(null);
provide("contentRef", contentRef);

// Provide inclusion/exclusion tags for search page
const tags: Tag[] = reactive([]);
provide("inclusionExclusionTags", tags);
</script>
