<template>
  <n-space vertical :size=16 style="width:60%;margin-left: 10%;">
    <UserAvatar :width="120" :height="120" :image_code="props.user.avatar" @changeavatar="update_avatar"/>
    <div style="text-align:center">
      <n-text style="font-size:20px;">
        欢迎，{{props.user.user_name}}！
      </n-text>
    </div>
    <EditInformation :key="state.avatar_random" :user="props.user"/>
  </n-space>
</template>

<script setup lang="ts">

import { NSpace,NText } from 'naive-ui';
import { defineProps,defineEmits } from 'vue'
import UserAvatar from '@/components/UserAvatar.vue'
import EditInformation from './EditInformation.vue';

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

const state={avatar_random: Math.random()}
const emits = defineEmits(['change-avatar']);

function update_avatar(img_code:string) {
  emits('change-avatar', img_code)
  state.avatar_random = Math.random()
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