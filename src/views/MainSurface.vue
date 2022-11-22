<!--
 * @FileDescription: 新闻主要界面布局vue
 * @Author: 郑友捷
 * @Date: 2022-10-18 19:00
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-22 21:17
 -->

<template>
  <n-layout position="absolute">
    <n-layout-header bordered embedded style="height: 74px; position: fixed">
      <Navigation :key="reloader.timestamp" style="padding: 18px 96px" />
    </n-layout-header>
    <n-layout-content ref="contentRef" style="top: 74px" position="absolute">
      <router-view @reload="reloadNavigationBar" @update="reloadNavigationBar"></router-view>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { provide, reactive, ref } from "vue";
import Navigation from "../components/NavigationBar.vue";
import { judgeToken, reloadNavigationBar, reloader } from "@/main";
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

function updateUserLocal(new_user: UserInfo) {
  // 更新用户信息
  userRef.value = new_user;
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
        userRef.value = res.data.data;
        console.log(res);
        console.log('新建用户')
      })
      .catch((error) => {
        console.log(error);
        updateUserLocal({ user_name: "",tags:{} } as UserInfo);
      });
  } else {
    // 清空用户状态
    updateUserLocal({ user_name: "",tags:{} } as UserInfo);
  }
}

getUser();

// procive news ref
const userRef = ref<UserInfo>({ user_name: "",tags:{} } as UserInfo);
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
