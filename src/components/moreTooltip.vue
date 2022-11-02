<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-text> {{props.more_content}}</n-text>
    </template>
    点我查看更多类别的新闻
  </n-tooltip>
</template>

<script setup lang="ts">
import { NTooltip,NText } from 'naive-ui';
import {defineProps} from 'vue' 
const props = defineProps<{
    more_content: String,
}>();
</script>