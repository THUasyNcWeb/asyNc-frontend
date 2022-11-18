<template>
  <EditInformation :key="state.avatar_random" :user="props.user"/>
</template>

<script setup lang="ts">

import { defineProps } from 'vue'
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
</script>


<style scoped>
</style>