<!--
 * @FileDescription: 前端布局vue
 * @Author: 郑友捷
 * @Date: 2022-10-03 19:00
 * @LastEditors: 王博文
 * @LastEditTime: 2022-10-26 00:36
 -->
<template>
  <body>
    <n-dialog-provider>
      <n-message-provider>
        <router-view />
      </n-message-provider>
    </n-dialog-provider>
  </body>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import { NDialogProvider, NMessageProvider } from 'naive-ui';
@Options({
  components: {
    HelloWorld,
    NDialogProvider,
    NMessageProvider,
  },
})
export default class App extends Vue {}
</script>
