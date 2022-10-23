<!--
 * @FileDescription: 前端布局vue
 * @Author: 郑友捷
 * @Date: 2022-10-03 19:00
 * @LastEditors: 郑友捷
 * @LastEditTime: 2022-10-20 14:00  
 -->
<template>
  <body>
    <n-dialog-provider>
      <router-view />
    </n-dialog-provider>
  </body>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import { NDialogProvider } from 'naive-ui';
@Options({
  components: {
    HelloWorld,
    NDialogProvider
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
