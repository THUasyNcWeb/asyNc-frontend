<!--
 * @FileDescription: 搜索框
 * @Author: 王博文
 * @Date: 2022-10-19 23:28
 * @LastEditors: 王博文
 * @LastEditTime: 2022-10-20 01:02
-->

<template >
  <n-input v-model:value="text" placeholder="搜索" size="large" round clearable
    :style="{ 'text-align': 'left' }"
    @keyup.enter="submit">
    <!-- For some margin -->
    <template #prefix>
      <div/>
    </template>
    <template #suffix>
      <n-button @click="submit" large circle quaternary type="primary">
        <n-icon size="large" :component="Search"/>
      </n-button>
    </template>
  </n-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NButton, NIcon, NInput } from 'naive-ui'
import { Search } from '@vicons/ionicons5/';

export default defineComponent({
  components: {
    NButton,
    NIcon,
    NInput,
  },
  setup() {
    return {
      Search,
      text: ref(''),
      submit() {
        this.$emit('submit', this.text)
      }
    }
  },
})

</script>