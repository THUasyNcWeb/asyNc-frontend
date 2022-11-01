<!--
 * @FileDescription: 搜索框
 * @Author: 王博文
 * @Date: 2022-10-19 23:28
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-01 13:07
-->

<template>
  <n-auto-complete v-model:value="text" placeholder="搜索" size="large" clearable
    :options="options" @keyup.enter="search" @select="select" @update:value="update">
    <template #suffix>
      <n-button @click="search" large circle quaternary type="primary">
        <n-icon size="large" :component="Search"/>
      </n-button>
    </template>
  </n-auto-complete>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref } from 'vue';
import { NAutoComplete, NButton, NIcon } from 'naive-ui';
import { Search } from '@vicons/ionicons5/';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import API from '@/store/axiosInstance';

import { AutoCompleteOptions } from 'naive-ui/es/auto-complete/src/interface';

const router = useRouter();

const props = defineProps({
  text: String,
});

const text = ref(props.text ?? '');

// Update keywords when route updates, e.g. routing back and forth
onBeforeRouteUpdate((to) => {
  text.value = to.query.q as string;
});

// Search suggestions
const options: AutoCompleteOptions = reactive([]);
let timestamp = 0;

// Fetch search suggestions
function update() {
  // Use timestamp to avoid jam
  const current_timestamp = ++timestamp;

  API({
    headers: {
      Authorization: window.localStorage.getItem('token'),
    },
    url: 'search/suggest',
    method: 'post',
    data: {
      query: text.value,
    },
  }).then(response => {
    // Expired
    if (current_timestamp < timestamp) {
      return;
    }

    // Clear current suggestions
    options.length = 0;

    const suggestions = response.data.data.suggestions as string[];
    suggestions.forEach(value => {
      options.push({
        label: value,
        value,
      });
    });
  });
}

// Handle select event, update query keyword and perform search
function select(keyword: string) {
  text.value = keyword;
  search();
}

function search() {
  // Change current route slightly
  // to force update the router view
  router.currentRoute.value.hash = '0';
  router.push(`/search?q=${text.value}`);
}
</script>