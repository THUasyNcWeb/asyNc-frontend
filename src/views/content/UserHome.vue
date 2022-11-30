<!--
 * @FileDescription: 用户主页
 * @Author: 郑友捷
 * @Date: 2022-10-07 23:30
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-11-30 19:23
 -->

<template>
  <n-spin :show="state.empty" size="large" style="margin-top:20%">
    <div v-if="!state.empty" style="margin-top:-20%">
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
            content-style="padding: 24px 24px; height: calc(100vh - 74px)"
          >
            <router-view
              :key="state.random"
              @update="$emit('update')"
            />
            <!-- 中心部分按照当前路由进行显示 -->
          </n-layout-content>
        </n-layout>
      </n-layout>
    </div>
    <template #description>
      <br />
      <n-h2 style="text-align: center; color: deeppink"> 少女祈祷中QWQ </n-h2>
      <n-h2 style="text-align: center"> 有这个时间等待不如V我50 </n-h2>
    </template>
    <template #icon>
      <n-icon>
        <FastFoodOutline />
      </n-icon>
    </template>
  </n-spin>
</template>

<script setup lang="ts">
import {
  h,
  Component,
  reactive,
  defineEmits,
  inject,
  provide,
  ref,
  watch,
} from "vue";
import { onBeforeRouteUpdate, RouteLocationNormalized, RouterLink, useRouter } from "vue-router";
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
  NSpin,
  NH2,
} from "naive-ui";
import API from "@/store/axiosInstance";
import UserAvatar from "@/components/UserAvatar.vue";
import {
  PersonOutline as PersonIcon,
  LibraryOutline as HistoryIcon,
  BookmarkOutline as ReadlaterIcon,
  StarOutline as FavoriteIcon,
  LockClosedOutline as PasswordIcon,
  LogOutOutline as LogoutIcon,
  FastFoodOutline,
} from "@vicons/ionicons5";

import { decodeToken } from "@/main";

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

const message = useMessage();

let router = useRouter();

const userRef = ref<UserInfo>(inject("userRef"));
const updateUserLocal:Function = inject('updateUserLocal')

watch(
  () => router.currentRoute.value.path,
  (newValue) => {
    if (newValue.indexOf("/user") == 0) {
      if (window.localStorage.getItem("token")) {
        const flag = decodeToken();
        if (flag == "") {
          message.error("请先登录或者注册😢");
          updateUserLocal({ user_name: "", tags: [] } as UserInfo);
          router.push("/");
        }
        else {
          API({
            headers: { Authorization: window.localStorage.getItem("token") },
            url: "userinfo",
            method: "get",
            // 根据不同类别，把类别放在了对应的请求参数中
          })
            .then((res) => {
              var new_user = { user_name: "", tags: [] } as UserInfo;
              new_user = res.data.data;
              let use_tag: UserTag[] = [];
              for (var x = 0; x < new_user.tags.length; x++) {
                let now_tag = new_user.tags[x]["key"].trim();
                if (now_tag.length != 0) {
                  use_tag.push({ key: now_tag, value: new_user.tags[x].value });
                }
              }
              // 截取前50个tags
              new_user.tags = use_tag;
              // 去除空格
              if (new_user.tags.length > 50) {
                new_user.tags = new_user.tags.slice(0, 50);
              } 
              updateUserLocal(new_user)
            })
            .catch((error) => {
              console.log(error);
              updateUserLocal({ user_name: "", tags: [] } as UserInfo);
            });
        }
      } else {
        message.error("请先登录或者注册😢");
        updateUserLocal({ user_name: "", tags: [] } as UserInfo);
        router.push("/");
      }
    }
  },
  { immediate: true }
);

const state = reactive({
  random: Math.random(),
  now_value: "info",
  empty: false,
});


state.empty = userRef.value.user_name == "";

watch(userRef, () => {
  state.empty = userRef.value.user_name == "";
});


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
        innerHTML: "我的收藏",
        to: {
          path: "/user/favorites",
        },
      }),
    key: "favorites",
    path: "/user/favorites",
    icon: renderIcon(FavoriteIcon),
  },
  {
    label: () =>
      h(RouterLink, {
        innerHTML: "稍后再看",
        to: {
          path: "/user/readlater",
        },
      }),
    key: "readlater",
    path: "/user/readlater",
    icon: renderIcon(ReadlaterIcon),
  },
  {
    label: () =>
      h(RouterLink, {
        innerHTML: "浏览历史",
        to: {
          path: "/user/history",
        },
      }),
    key: "history",
    path: "/user/history",
    icon: renderIcon(HistoryIcon),
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
                .then(() => {
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

// Update selected menu item depending on route
function updateSelected(route: RouteLocationNormalized) {
  for (const item of menuOptions) {
    if (route.path === item.path) {
      // get the value of the user menu
      state.now_value = item.key;
      break;
    }
  }
}

updateSelected(router.currentRoute.value);

// Reload router view before route update
onBeforeRouteUpdate((route) => {
  updateSelected(route);
  // Delay router view refresh to next tick
  // to ensure we refresh with the new route
  setTimeout(() => state.random = Math.random());
});

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
