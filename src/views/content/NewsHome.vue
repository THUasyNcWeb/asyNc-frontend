<!--
 * @FileDescription: 新闻搜索与展示主页
 * @Author: 郑友捷
 * @Date: 2022-10-03 11:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-11-28 09:21
 -->

<script setup lang="ts">
import { reactive, h, ref, inject, watch } from "vue";
// import "@/mock/Personalize.mock";
import API from "../../store/axiosInstance";
import NewsCategory from "@/components/NewsCategory.vue";
import SelectMore from "@/components/SelectMore.vue";
import { NTabs, NTabPane, NSpin, NIcon, NH2, NResult, NButton } from "naive-ui";
import { FastFoodOutline } from "@vicons/ionicons5";

export interface All_News {
  id: number;
  title: string;
  url: string;
  media: string;
  pub_time: Date;
  picture_url?: string;
}

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

const state = reactive({
  all_news: new Array<All_News>(),

  window_width: window.innerWidth * 0.34,
  all_category: new Array(),
  // 所有的分类
  now_category: "home",
  // 当前分类的key
  more_label: "更多",
  more_key: "more",
  loading: false,
  error: false,
  // 更多栏的显示标签与对应的键值
  empty_content: "自己探索的世界才更为真实",
});

const userRef = ref<UserInfo>(inject("userRef"));

// change the offset dynamically
window.onresize = () => {
  state.window_width = window.innerWidth * 0.34;
};

state.all_category.push(
  { key: "home", label: "首页" },
  { key: "person", label: "个性化" },
  { key: "ent", label: "娱乐" },
  { key: "sports", label: "体育" },
  { key: "politics", label: "政治" },
  { key: "tech", label: "科技" }
);

get_news("home");

watch(userRef, () => {
  // 监听用户状态变化，改变个性化推荐
  if (state.now_category == "person") {
    get_news(state.now_category);
  }
});

async function get_personalize() {
  let tag_num = 3;
  if (tag_num > userRef.value.tags.length) {
    tag_num = userRef.value.tags.length;
  }
  let query = "";
  for (var x = 0; x < tag_num; x++) {
    query = query + userRef.value.tags[x].key + ' ';
  }
  API({
    url: "personalize",
    method: "post",
    data: {
      query: query,
    },
  })
    .then((res) => {
      state.loading = false;
      for (const entry of res.data.data.news) {
        state.all_news.push({
          ...entry,
          pub_time: new Date(entry.pub_time),
          is_favorites: entry.is_favorite,
        });
      }
    })
    .catch(() => {
      state.loading = false;
      state.error = true;
    });
}

function get_news(category: string) {
  state.empty_content = "自己探索的世界才更为真实";
  if (category == "more") {
    return;
  }
  state.loading = true;
  state.error = false;
  state.all_news = new Array<All_News>();
  if (category == "person") {
    if (userRef.value.user_name != "") {
      state.empty_content = "你还没有在这里留下足迹，去尽情探索吧。";
      // 当登录状态有效，获取tags对应的新闻
      get_personalize();
    } else {
      // 不属于报错，需要提醒要登录
      state.empty_content = "登录以畅享独特的个人推荐";
      state.loading = false;
      state.error = false;
    }
  } else {
    API({
      headers: { Authorization: window.localStorage.getItem("token") },
      url: "allnews",
      params: {
        category: category,
      },
      method: "get",
      // 根据不同类别，把类别放在了对应的请求参数中
    })
      .then((res) => {
        state.loading = false;
        for (const entry of res.data.data) {
          // Construct Date object
          state.all_news.push({
            ...entry,
            pub_time: new Date(entry.pub_time),
            is_favorites: entry.is_favorite,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        state.loading = false;
        state.error = true;
      });
  }
}

function main_news(content: string) {
  return h("div", {
    onClick: () => {
      state.more_label = "更多";
      state.more_key = "more";
    },
    innerHTML: content,
  });
  // 点击其他栏目时，自动恢复回“更多”的字样
}

function more_news() {
  return h("div", {
    innerHTML: state.more_label,
    onclick: () => {
      if (state.more_label != "更多") {
        state.more_label = "更多";
      }
    },
  });
}

function colChange(category: string, label: string) {
  var whether_main: boolean = false;
  // 检查是否点击了主栏目还是扩展栏目
  for (var x of state.all_category) {
    if (category == x.key) {
      whether_main = true;
      break;
    }
  }
  if (whether_main == false) {
    // 若点击了扩展栏目，则修改更多栏目的显示为该扩展栏目的类别
    state.more_label = label;
    state.more_key = category;
  }
  // 更新当前的类别
  state.now_category = category;
  get_news(category);
}
</script>
<template>
  <body>
    <n-tabs
      :value="state.now_category"
      @update:value="
        state.now_category = $event;
        get_news(state.now_category);
      "
      type="line"
      animated
      pane-style="margin-left:15%;width:70%;min-height:500px;"
      size="large"
      default-value="home"
    >
      <template #prefix>
        <div :style="{width:state.window_width + 'px'}">
        </div>
      </template>
      <template #suffix>
        <div :style="{width:state.window_width + 'px'}">
        </div>
      </template>
      <n-tab-pane
        v-for="item in state.all_category"
        :key="item.key"
        :name="item.key"
        :tab="main_news(item.label)"
      >
        <n-spin
          v-if="!state.error"
          :show="state.loading"
          size="large"
          style="margin-top: 200px"
        >
          <NewsCategory
            v-if="state.loading == false"
            :news="state.all_news"
            :empty_content="state.empty_content"
            style="margin-top: -15%"
          />
          <template #description>
            <br />
            <n-h2 style="text-align: center; color: deeppink">
              少女祈祷中QWQ
            </n-h2>
            <n-h2 style="text-align: center"> 有这个时间等待不如V我50 </n-h2>
          </template>
          <template #icon>
            <n-icon>
              <FastFoodOutline />
            </n-icon>
          </template>
        </n-spin>
        <n-result
          v-else
          status="500"
          title="500 服务器链接错误"
          description="你家服务器怎么又炸了"
          style="margin-top: 3%"
        >
          <template #footer>
            <n-button type="primary" @click="get_news(state.now_category)"
              >头铁再来一次</n-button
            >
          </template>
        </n-result>
      </n-tab-pane>
      <n-tab-pane :name="state.more_key" :tab="more_news">
        <SelectMore
          v-if="state.more_label == '更多'"
          :mainCategory="state.all_category"
          @update="colChange"
        />
        <n-spin
          v-else
          :show="state.loading"
          size="large"
          style="margin-top: 20%"
        >
          <NewsCategory
            v-if="!state.loading && !state.error"
            :news="state.all_news"
            :empty_content="state.empty_content"
            style="margin-top: -20%"
          />
          <template #description>
            <br />
            <n-h2 style="text-align: center; color: deeppink">
              少女祈祷中QWQ
            </n-h2>
            <n-h2 style="text-align: center"> 有这个时间等待不如V我50 </n-h2>
          </template>
          <template #icon>
            <n-icon>
              <FastFoodOutline />
            </n-icon>
          </template>
        </n-spin>
      </n-tab-pane>
    </n-tabs>
  </body>
</template>

<style scoped></style>
