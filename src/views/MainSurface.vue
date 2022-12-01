<!--
 * @FileDescription: 新闻总界面布局vue
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
      <router-view
        @reload="reloadNavigationBar"
        @update="reloadNavigationBar"
      ></router-view>
      <!-- 更新导航栏的信息 -->
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
// 新闻的tags类型
export interface UserTag {
  key: string;
  // key代表用户标签的值
  value: number;
  // value代表其权重
}
// 用户的tags类型，带权重方便生成云图
export interface UserInfo {
  id: string;           // 用户id
  user_name: string;    // 用户名
  signature: string;    // 用户签名
  tags: UserTag[];      // 用户标签
  mail: string;         // 用户邮箱
  avatar: string;       // 用户头像
}
// 用户信息集合
function updateUserLocal(new_user: UserInfo) {
  // 更新用户信息到根组件
  userRef.value = new_user;
}

async function getUser() {
  // 获取用户信息
  if ((await judgeToken()) != "") {
    API({
      headers: { Authorization: window.localStorage.getItem("token") },
      url: "userinfo",
      method: "get",
      // 获取当前用户的信息
    })
      .then((res) => {
        userRef.value = res.data.data;
        let use_tag: UserTag[] = [];
        for (var x = 0; x < userRef.value.tags.length; x++) {
          // tags不允许为空
          let now_tag = userRef.value.tags[x]["key"].trim();
          if (now_tag.length != 0) {
            use_tag.push({ key: now_tag, value: userRef.value.tags[x].value });
          }
        }
        // 获取的tags已经按照权值大小从大往小排序
        // 截取前50个不为空的tags
        userRef.value.tags = use_tag;
        if (userRef.value.tags.length > 50) {
          userRef.value.tags = userRef.value.tags.slice(0, 50);
        }
      })
      .catch((error) => {
        console.log(error);
        updateUserLocal({ user_name: "", tags: [] } as UserInfo);
      });
  } else {
    // 请求失败
    // 清空用户状态
    updateUserLocal({ user_name: "", tags: [] } as UserInfo);
  }
}

// 初始化获取用户信息
// 方便构建导航栏与个性化
getUser();

// procive news ref
const userRef = ref<UserInfo>({ user_name: "", tags: [] } as UserInfo);
provide("userRef", userRef);
provide("updateUserLocal", updateUserLocal);

// Provide content ref for scrolling in search page
const contentRef = ref<LayoutInst | null>(null);
provide("contentRef", contentRef);

// Provide inclusion/exclusion tags for search page
const tags: Tag[] = reactive([]);
provide("inclusionExclusionTags", tags);
</script>
