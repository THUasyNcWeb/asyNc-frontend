<!--
 * @FileDescription: 用户主页
 * @Author: 郑友捷
 * @Date: 2022-10-07 23:30
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-21 22:48
 -->

<template>
  <div class="main_card">
    <n-layout style="width: 100%; height: 100%; border-radius: 10px">
      <n-layout has-sider>
        <n-layout-sider bordered :width="250">
          <n-space vertical style="margin-top: 10%; text-align: center">
            <UserAvatar
              style="margin: auto"
              :width="80"
              :height="80"
              :key="state.random"
            />
            <n-text>
              {{ userRef.user_name }}
            </n-text>
            <n-config-provider :theme-overrides="menuThemeOverrides">
              <n-menu
                style="text-align: center"
                :options="menuOptions"
                :value="state.now_value"
                :default-value="default_val"
                :on-update-value="update_menu"
              />
            </n-config-provider>
          </n-space>
        </n-layout-sider>
        <!-- 侧边导航栏，包括详细信息与修改密码 -->
        <n-layout-content
          ref="usersContentRef"
          content-style="padding: 24px; height: calc(85vh - 74px)"
          style="margin-top: 2%"
        >
          <router-view :key="state.random"></router-view>
          <!-- 中心部分按照当前路由进行显示 -->
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { h, Component, reactive, defineEmits, inject, provide, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import {
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NSpace,
  NMenu,
  NIcon,
  NConfigProvider,
  NText,
  useDialog,
  NA,
  LayoutInst,
  useMessage,
} from "naive-ui";
import API from "@/store/axiosInstance";
import UserAvatar from "@/components/UserAvatar.vue";
import {
  PersonOutline as PersonIcon,
  LibraryOutline as HistoryIcon,
  StarOutline as FavoriteIcon,
  LockClosedOutline as PasswordIcon,
  LogOutOutline as LogoutIcon,
} from "@vicons/ionicons5";

import {decodeToken} from '@/main'

export interface UserTag {
  key: string;
  value: number;
}

export interface UserInfo {
  id: string;
  user_name: string;
  signature: string;
  tags: UserTag[];
  mail: string;
  avatar: string;
}

const message = useMessage()

let router = useRouter();
// 防止本地访问时失去路由
if(decodeToken() == '') {
  message.error("请先登录或者注册😢")
  router.push('/')
}

const state = reactive({
  random: Math.random(),
  now_value: "info",
});

const userRef = ref<UserInfo>(inject("userRef"));


const updateUserLocal: Function = inject("updateUserLocal");

// Provide content ref for scrolling in favorites page
const usersContentRef = ref<LayoutInst | null>(null);
provide("usersContentRef", usersContentRef);

// 设置组件

let path = router.currentRoute.value.path;

const emits = defineEmits(["reload"]);
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const exitDialog = useDialog();

const menuOptions = [
  {
    label: () =>
      h(RouterLink, {
        innerHTML: "用户信息",
        to: {
          path: "/user/userInformation",
        },
      }),
    key: "info",
    path: "/user/userInformation",
    icon: renderIcon(PersonIcon),
  },
  {
    label: () =>
      h(RouterLink, {
        innerHTML: "修改密码",
        to: {
          path: "/user/modifyPassword",
        },
      }),
    key: "modify",
    path: "/user/modifyPassword",
    icon: renderIcon(PasswordIcon),
  },
  {
    label: () =>
      h(RouterLink, {
        innerHTML: "浏览历史",
        to: {
          path: "/user/modifyPassword",
        },
      }),
    key: "history",
    path: "/user/modifyPassword",
    icon: renderIcon(HistoryIcon),
  },
  {
    label: () =>
      h(RouterLink, {
        innerHTML: "我的收藏",
        to: {
          path: "/user/modifyPassword",
        },
      }),
    key: "favorites",
    path: "/user/modifyPassword",
    icon: renderIcon(FavoriteIcon),
  },
  {
    label: () =>
      h(NA, {
        innerHTML: "退出登录",
        onclick: () => {
          exitDialog.warning({
            title: "退出登录确认",
            content: "你确定退出登录吗QWQ？",
            positiveText: "确认",
            negativeText: "取消",
            onPositiveClick: () => {
              API({
                headers: {
                  Authorization: window.localStorage.getItem("token"),
                },
                // 携带token字段
                url: "logout",
                method: "post",
              })
                .then((res) => {
                  console.log(res);
                  window.localStorage.removeItem("token");
                  updateUserLocal({ user_name: "", tags: {} } as UserInfo);
                  router.push("/");
                  emits("reload");
                })
                .catch((error) => {
                  console.log(error);
                });
            },
            onNegativeClick: () => {},
          });
        },
      }),
    key: "logout",
    path: "/user/logout",
    icon: renderIcon(LogoutIcon),
  },
];
const menuThemeOverrides = {
  Menu: {
    itemHeight: "50px",
    borderRadius: "20px",
  },
};
// 设置侧边菜单选项
// 同时使用render函数将菜单按钮设置为可以改变路由
// 从而触发中心内容的改变
// 加入侧边导航栏菜单，每一个选项对应一个路由跳转

var default_val: string = "";

for (let x of menuOptions) {
  if (path.indexOf(x.path) == 0) {
    default_val = x.key;
    break;
  }
}
// 获取初始的选项，与路由对应

function update_menu(new_key: string) {
  // 若是退出按钮，则不更新状态
  state.random = Math.random();
  if (new_key != "logout") {
    state.now_value = new_key;
  }
}
</script>

<style scoped>
.main_card {
  width: 60%;
  margin: auto;
  margin-top: 3%;
  margin-bottom: 3%;
  border-radius: 10px;
  border: 2px solid black;
}
</style>
