<template>
  <n-grid :item-responsive="true" :x-gap="16" :y-gap="16">
    <n-grid-item span="0:24 640:24 1024:10">
      <n-space :vertical="true" :size="16">
        <n-card :bordered="true" size="large" style="height:300px" class="card_border">
					<n-space :vertical="true" :size="16" style="text-align:center" >
						<UserAvatar style="margin-left:35%" :width="120" :height="120" :image_code="props.user.avatar" @changeavatar="update_avatar"></UserAvatar>
						<n-text style="font-size:30px">
              欢迎，{{props.user.user_name}}！
						</n-text>
					</n-space>
        </n-card>
      </n-space>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:14">
      <n-card title="最近浏览" :bordered="true" size="large" class="card_border">
        <WordChart :tags="props.user.tags == undefined ? {} : props.user.tags"></WordChart>
      </n-card>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:24">
      <EditInformation :user="props.user"/>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">

import { NGrid,NGridItem, NCard, NSpace,NText } from 'naive-ui';
import { defineProps,defineEmits } from 'vue'
import UserAvatar from '@/components/UserAvatar.vue'
import EditInformation from './EditInformation.vue';
import WordChart from './WordChart.vue';
export interface UserInfo {
  id: string,
  user_name: string,
  signature: string,
  tags: object,
  mail: string,
  avatar: string,
}
const props = defineProps<{
  user:UserInfo,
}>();
const emits = defineEmits(['change-info','change-avatar']);
// const img = require("@/assets/asyNc.png")

function update_avatar(img_code:string) {
  emits('change-avatar', img_code)
  // 更新主页面
}
</script>


<style scoped>
.card_border {
  border-radius: 20px;
  border-color: #000000;
  /* background-color: #F5F5F5; */
}
</style>