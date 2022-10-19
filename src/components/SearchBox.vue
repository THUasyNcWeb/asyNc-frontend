<!--
 * @FileDescription: 搜索框
 * @Author: 王博文
 * @Date: 2022-10-19 23:28
 * @LastEditors: 王博文
 * @LastEditTime: 2022-10-20 01:37
-->

<template>
  <n-input v-model:value="text" placeholder="搜索" size="large" round clearable
    @keyup.enter="$emit('submit', text)">
    <!-- For some margin -->
    <template #prefix>
      <div/>
    </template>
    <template #suffix>
      <n-button @click="$emit('submit', text)" large circle quaternary type="primary">
        <n-icon size="large" :component="Search"/>
      </n-button>
    </template>
  </n-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NIcon, NInput } from 'naive-ui';
import { Search } from '@vicons/ionicons5/';

const props = defineProps({
  text: String,
});

const text = ref(props.text ?? '');
</script>