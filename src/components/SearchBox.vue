<!--
 * @FileDescription: 搜索框
 * @Author: 王博文
 * @Date: 2022-10-19 23:28
 * @LastEditors: 王博文
 * @LastEditTime: 2022-10-24 00:25
-->

<template>
  <n-input v-model:value="text" placeholder="搜索" size="large" round clearable
    @keyup.enter="search">
    <!-- For some margin -->
    <template #prefix>
      <div/>
    </template>
    <template #suffix>
      <n-button @click="search" large circle quaternary type="primary">
        <n-icon size="large" :component="Search"/>
      </n-button>
    </template>
  </n-input>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { NButton, NIcon, NInput } from 'naive-ui';
import { Search } from '@vicons/ionicons5/';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  text: String,
});

const text = ref(props.text ?? '');

function search() {
  router.push(`search?q=${text.value}`);
}
</script>