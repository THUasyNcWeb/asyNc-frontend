<!--
 * @FileDescription: 悬浮新闻按钮
 * @Author: 王博文
 * @Date: 2022-11-06 23:26
 * @LastEditors: 王博文
 * @LastEditTime: 2022-11-07 00:00
-->

<template>
  <n-affix style="position: fixed; right: 48px; bottom: 48px;">
    <n-popover>
      <template #trigger>
        <n-button circle size="large">
          <template #icon>
            <n-icon>
              <ellipsis-icon />
            </n-icon>
          </template>
        </n-button>
      </template>
      Hello!
    </n-popover>
  </n-affix>
</template>

<script setup lang="ts">
import { NAffix, NButton, NIcon, NPopover } from 'naive-ui';

import { EllipsisVertical as EllipsisIcon } from '@vicons/ionicons5/';
</script>