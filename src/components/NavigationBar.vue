<!--
 * @FileDescription: 导航栏组件
 * @Author: 郑友捷
 * @Date: 2022-10-31 9:21
 * @LastEditors: 王博文
 * @LastEditTime: 2022-12-01 11:26
-->
<template>
  <n-space align="center" justify="space-between">
    <n-space>
      <n-popover style="width: 129px" trigger="hover" :delay="500" @update:show="handlePopoverShow">
        <template #trigger>
          <router-link to="/">
            <n-gradient-text type="success" size="24"> asyNc </n-gradient-text>
          </router-link>
        </template>
        <n-statistic label="新闻总量" tabular-nums>
          <n-space justify="end">
            <n-number-animation ref="numberAnimationRef" show-separator :duration="4000"
              :from="0" :to="state.news_count" />
          </n-space>
        </n-statistic>
      </n-popover>
      <search-box :text="state.word" :sort="state.sort" style="width: 40vw" />
    </n-space>

    <n-space justify="end">
      <n-popover
        v-if="userRef.user_name"
        :key="userRef.avatar"
        trigger="hover"
        placement="bottom"
        :show-arrow="true"
        style="border-radius: 5px"
      >
        <template #trigger>
          <n-image
            style="border-radius: 50%; vertical-align: middle; cursor: pointer"
            width="40"
            height="40"
            object-fit="cover"
            :src="userRef.avatar"
            preview-disabled
            :fallback-src="default_logo"
            @click="handleJump('/user/userInformation')"
          />
        </template>
        <template #header>
          <n-text
            :depth="2"
            style="
              vertical-align: -12%;
              margin-left: 6px;
              padding-top: 5px;
              padding-bottom: 5px;
              font-size: large;
            "
          >
            你好,
          </n-text>
          <n-text
            :strong="true"
            :underline="true"
            :depth="2"
            type="success"
            @click="handleJump('/user/userInformation')"
            style="
              vertical-align: -10%;
              margin-left: 6px;
              padding-top: 5px;
              padding-bottom: 5px;
              font-size: large;
            "
          >
            {{ userRef.user_name }}
          </n-text>
        </template>

        <n-space vertical>
          <n-button
            type="primary"
            size="medium"
            style="margin: 2px; width: 172px"
            @click="handleJump('/user/userInformation')"
          >
            <template #icon>
              <n-icon :size="20">
                <CalendarPerson20Regular />
              </n-icon>
            </template>
            个人中心
          </n-button>
        </n-space>

        <template #footer>
          <n-space>
            <n-button
              type="tertiary"
              size="medium"
              style="margin: 2px"
              @click="handleLogout"
            >
              <n-icon :size="20">
                <SignOut20Regular />
              </n-icon>
              封存记忆，退出世界
            </n-button>
          </n-space>
        </template>
      </n-popover>

      <n-popover
        v-else
        trigger="hover"
        placement="bottom"
        :show-arrow="false"
        style="width: 370px; border-radius: 5px"
      >
        <template #trigger>
          <router-link to="/login" style="text-decoration: none">
            <n-icon :size="25" color="#0e7a0d" style="margin-top: 8px">
              <CalendarPerson20Regular />
            </n-icon>
          </router-link>
        </template>
        <template #header>
          <n-space vertical>
            <n-text></n-text>
            <n-text
              strong
              style="margin-left: 6px; margin-top: 5px; margin-bottom: 5px"
            >
              登录后你可以：
            </n-text>
            <n-text></n-text>
          </n-space>
        </template>
        <n-space>
          <div style="margin: 8px; border: 0; padding: 0">
            <n-icon
              :size="20"
              color="#0e7a0d"
              style="vertical-align: -20%; margin-right: 5px"
            >
              <AnalyticsOutline />
            </n-icon>
            <n-text> 畅享千万数据模型 </n-text>
          </div>

          <div style="margin: 8px; border: 0; padding: 0">
            <n-icon
              :size="20"
              color="#0e7a0d"
              style="vertical-align: -20%; margin-right: 5px"
            >
              <TimeOutline />
            </n-icon>
            <n-text> 多端同步搜索记录 </n-text>
          </div>
        </n-space>
        <n-space>
          <div style="margin: 8px; border: 0; padding: 0">
            <n-icon
              :size="20"
              color="#0e7a0d"
              style="vertical-align: -20%; margin-right: 5px"
            >
              <TargetArrow20Regular />
            </n-icon>
            <n-text> 私人定制搜索服务 </n-text>
          </div>

          <div style="margin: 8px; border: 0; padding: 0">
            <n-icon
              :size="20"
              color="#0e7a0d"
              style="vertical-align: -20%; margin-right: 5px"
            >
              <SlideMultipleSearch20Regular />
            </n-icon>
            <n-text> 发现网站更多功能 </n-text>
          </div>
        </n-space>
        <template #footer>
          <n-space>
            <router-link to="/login" style="text-decoration: none">
              <n-button
                type="primary"
                size="large"
                style="
                  min-width: 315px;
                  border-radius: 15px;
                  margin-left: 4px;
                  margin-top: 5px;
                "
              >
                进入知识的世界
              </n-button>
            </router-link>
            <router-link to="/register" style="text-decoration: none">
              <n-button
                type="tertiary"
                size="medium"
                style="
                  min-width: 315px;
                  border-radius: 15px;
                  margin-left: 4px;
                  margin-bottom: 5px;
                "
              >
                第一次来？点我注册
              </n-button>
            </router-link>
          </n-space>
        </template>
      </n-popover>

      <n-popover
        trigger="hover"
        placement="bottom"
        :show-arrow="false"
        style="max-width: 370px; border-radius: 5px"
      >
        <template #trigger>
          <n-icon
            :size="25"
            color="#0e7a0d"
            style="margin-left: 25px; margin-top: 8px; cursor: pointer"
            @click="handleJump('/user/favorites')"
          >
            <StarLineHorizontal316Regular />
          </n-icon>
        </template>
        <n-space style="width: 30vw" v-if="userRef.user_name" vertical>
          <n-spin :show="state.favorites.loading">
            <news-panel :news="state.favorites.news"
              :more-path="`/user/favorites`" :history-mode="false"/>
          </n-spin>
        </n-space>
        <n-space v-else vertical>
          <router-link to="/login" style="text-decoration: none">
            <n-button
              type="primary"
              size="large"
              style="border-radius: 15px; margin: 5px"
            >
              登录以查看收藏的宝藏知识
            </n-button>
          </router-link>
        </n-space>
      </n-popover>

      <n-popover trigger="hover" placement="bottom" :show-arrow="false" style="border-radius: 5px;">
        <template #trigger>
          <n-icon
            :size="25"
            color="#0e7a0d"
            style="margin-left: 25px; margin-top: 8px; cursor: pointer"
            @click="handleJump('/user/readlater')"
          >
            <bookmark-icon />
          </n-icon>
        </template>
        <n-space style="width: 30vw" v-if="userRef.user_name" vertical>
          <n-spin :show="state.readlater.loading">
            <news-panel :news="state.readlater.news"
              :more-path="`/user/readlater`" :history-mode="false"/>
          </n-spin>
        </n-space>
        <n-space v-else vertical>
          <router-link to="/login" style="text-decoration: none">
            <n-button type="primary" size="large" style=" border-radius: 15px; margin: 5px;">
              登录以查看书签下的知识
            </n-button>
          </router-link>
        </n-space>
      </n-popover>

      <n-popover trigger="hover" placement="bottom" :show-arrow="false" style="border-radius: 5px;">
        <template #trigger>
          <n-icon
            :size="25"
            color="#0e7a0d"
            style="margin-left: 25px; margin-top: 8px; cursor: pointer"
            @click="handleJump('/user/history')"
          >
            <History20Regular />
          </n-icon>
        </template>
        <n-space style="width: 30vw" v-if="userRef.user_name" vertical>
          <n-spin :show="state.history.loading">
            <news-panel :news="state.history.news"
              :more-path="`/user/history`" :history-mode="true"/>
          </n-spin>
        </n-space>
        <n-space v-else vertical>
          <router-link to="/login" style="text-decoration: none">
            <n-button
              type="primary"
              size="large"
              style="border-radius: 15px; margin: 5px"
            >
              登录以查看记忆中的知识
            </n-button>
          </router-link>
        </n-space>
      </n-popover>

      <n-popover
        v-if="userRef.user_name"
        trigger="hover"
        placement="bottom"
        :show-arrow="false"
        style="max-width: 370px; border-radius: 5px"
      >
        <template #trigger>
          <n-icon
            :size="25"
            color="#0e7a0d"
            style="margin-left: 25px; margin-top: 8px; cursor: pointer"
            @click="handleLogout"
          >
            <SignOut20Regular />
          </n-icon>
        </template>
        <n-space vertical>
          <n-button
            type="tertiary"
            size="large"
            style="border-radius: 15px; margin: 5px"
            @click="handleLogout"
          >
            封存记忆，离开知识的世界
          </n-button>
        </n-space>
      </n-popover>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import {
  NButton,
  NGradientText,
  NIcon,
  NImage,
  NNumberAnimation,
  NPopover,
  NSpace,
  NSpin,
  NStatistic,
  NText,
  NumberAnimationInst,
  useDialog,
  useMessage,
} from 'naive-ui';
import {
  TimeOutline,
  AnalyticsOutline,
} from '@vicons/ionicons5';
import {
  CalendarPerson20Regular,
  TargetArrow20Regular,
  SlideMultipleSearch20Regular,
  SignOut20Regular,
  History20Regular,
  StarLineHorizontal316Regular,
  BookmarkMultiple20Regular as BookmarkIcon,
} from '@vicons/fluent';

import { inject, reactive, ref } from "vue";
import SearchBox from './SearchBox.vue'
import NewsPanel from './FavoriteNewsPanel.vue';
import router from '@/router';
import API from '@/store/axiosInstance';
import { decodeToken } from '@/main';

// import '@/mock/SearchPage.mock';

export interface UserInfo {
  id: string;
  user_name: string;
  signature: string;
  tags: object[];
  mail: string;
  avatar: string;
}

const userRef = ref<UserInfo>(inject("userRef"));

const numberAnimationRef = ref<NumberAnimationInst | null>(null);

const updateUserLocal: Function = inject("updateUserLocal");

const default_logo = require("@/assets/asyNc.png");

const exitDialog = useDialog();

const message = useMessage();

const state = reactive({
  news_count: 0,
  word: router.currentRoute.value.query.q as string ?? '',
  sort: router.currentRoute.value.query.sort as string ?? '',
  history: {
    loading: false,
    news: [],
  },
  readlater: {
    loading: false,
    news: [],
  },
  favorites: {
    loading: false,
    news: [],
  },
});

// Fetch news count
API({
  headers: {
    Authorization: window.localStorage.getItem('token'),
  },
  url: 'newscount',
  method: 'get',
}).then(response => {
  state.news_count = response.data.data;
});

// Fetch news if logged in
if (decodeToken()) {
  ['history', 'readlater', 'favorites'].forEach(tab => {
    API({
      headers: {
        Authorization: window.localStorage.getItem('token'),
      },
      url: tab,
      method: 'get',
      params: {
        page: 1,
      },
    }).then(response => {
      const news = response.data.data.news;
      state[tab].news = [];
      news.forEach(item => {
        state[tab].news.push({
          ...item,
          visit_time: item.visit_time ? new Date(item.visit_time) : undefined,
        })
      });
    })
  });
}

// Play animation
function handlePopoverShow(show: boolean) {
  if (show) {
    numberAnimationRef.value?.play();
  }
}

function handleJump(path: string) {
  // Not logged in
  if (!userRef.value.user_name && path.startsWith('/user')) {
    message.warning('请先登录或注册🙂️');
    return;
  }
  router.push(path);
}

function handleLogout() {
  exitDialog.warning({
    title: "确认要离开么",
    content: "今天还有很多新知识，真得不再探索了么？",
    positiveText: "确认",
    negativeText: "取消",
    onPositiveClick: () => {
      API({
        headers: { Authorization: window.localStorage.getItem("token") },
        // 携带token字段
        url: "logout",
        method: "post",
      })
        .then(() => {
          window.localStorage.removeItem("token");
          const new_user: UserInfo = { user_name: "", tags: {} } as UserInfo;
          updateUserLocal(new_user);
          router.push("/");
          message.success("再见，求知者，期待你的归来", { duration: 2000 });
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    },
    onNegativeClick: () => {
      message.success("欢迎回来", { duration: 2000 });
    },
    onClose: () => {
      message.success("欢迎回来", { duration: 2000 });
    },
  });
  message.warning("慎重考虑，求知者", { duration: 2000 });
}
</script>
